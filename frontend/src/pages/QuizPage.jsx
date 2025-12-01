// src/pages/QuizPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/levels/${id}/quiz`);
        setQuiz(res.data.quiz || []);
        setAnswers(new Array((res.data.quiz || []).length).fill(null));
      } catch (err) {
        console.error(err);
        toast.error("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleSelect = (qIndex, optIndex) => {
    if (submitted) return;
    const next = [...answers];
    next[qIndex] = optIndex;
    setAnswers(next);
  };

  const handleSubmit = async () => {
    // simple validation
    if (answers.includes(null)) {
      toast.error("Please answer all questions before submitting");
      return;
    }
    try {
      const res = await api.post(`/levels/${id}/quiz/submit`, { answers });
      setResult(res.data);
      setSubmitted(true);

      if (res.data.passed) {
        toast.success(`🎉 You scored ${res.data.score} / ${res.data.total}`);
        setTimeout(() => {
          if (refreshUser) {
            refreshUser();
          }
        }, 500);
      } else {
        toast.error(
          `You scored ${res.data.score} / ${res.data.total} - Try again!`
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to submit quiz");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <p className="text-sm text-slate-500">Loading quiz...</p>
      </div>
    );
  }

  if (!quiz.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <p className="text-slate-700 font-semibold mb-2">
            No quiz available for this level
          </p>
          <button
            onClick={() => navigate(`/levels/${id}`)}
            className="text-indigo-600 hover:underline"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(`/levels/${id}`)}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-base">
            ←
          </span>
          <span>Back to topic</span>
        </button>

        {/* Quiz container */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          {/* subtle top accent */}
          <div className="h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400" />

          <div className="p-5 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
              Quiz — {quiz.length} questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Choose the best answer for each question. You can&apos;t change
              options after submitting.
            </p>

            <ol className="space-y-5">
              {quiz.map((q, qi) => (
                <li
                  key={q.id}
                  className="p-4 sm:p-5 border border-slate-100 rounded-xl bg-slate-50/70"
                >
                  {/* Question text */}
                  <div className="flex items-start gap-2 mb-3">
                    <span className="text-sm sm:text-base font-semibold text-slate-500">
                      {qi + 1}.
                    </span>
                    <div className="font-medium text-sm sm:text-base text-slate-900 leading-snug">
                      {q.question}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid gap-2">
                    {q.options.map((opt, oi) => {
                      const isSelected = answers[qi] === oi;
                      let optionClass =
                        "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition text-sm sm:text-base";

                      if (!submitted) {
                        optionClass += isSelected
                          ? " bg-indigo-50 border-indigo-200"
                          : " bg-white border-slate-100 hover:bg-slate-50";
                      } else {
                        const correctIndex = result.correctAnswers[qi];
                        if (oi === correctIndex)
                          optionClass +=
                            " bg-emerald-50 border-emerald-300 text-emerald-800";
                        else if (isSelected && oi !== correctIndex)
                          optionClass +=
                            " bg-rose-50 border-rose-300 text-rose-800";
                        else
                          optionClass +=
                            " bg-white border-slate-100 text-slate-700";
                      }

                      return (
                        <label key={oi} className={optionClass}>
                          <input
                            type="radio"
                            name={`q-${qi}`}
                            checked={isSelected}
                            onChange={() => handleSelect(qi, oi)}
                            disabled={submitted}
                            className="mr-1"
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ol>

            {/* actions */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
              {!submitted ? (
                <>
                  <button
                    onClick={handleSubmit}
                    className="w-full sm:w-auto rounded-lg bg-indigo-600 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow hover:bg-indigo-700 transition"
                  >
                    Submit
                  </button>

                  <button
                    onClick={() => navigate(`/levels/${id}`)}
                    className="w-full sm:w-auto text-sm text-slate-600 hover:text-slate-900 hover:underline sm:ml-auto text-center"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <div className="font-semibold">
                      Score: {result.score} / {result.total}
                    </div>

                    <div
                      className={`text-sm px-3 py-1 rounded-full ${
                        result.passed
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {result.passed ? "✓ Passed" : "✗ Failed"}
                    </div>

                    {result.passed && (
                      <div className="text-xs text-emerald-700 font-semibold">
                        +{result.pointsAwarded} points
                      </div>
                    )}

                    {result.bestPoints !== undefined && (
                      <div className="text-sm text-slate-700">
                        Best:{" "}
                        <span className="font-semibold">
                          {result.bestPoints} pts
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => navigate("/home")}
                    className={`w-full sm:w-auto sm:ml-auto text-sm font-semibold px-5 py-2.5 rounded-lg transition ${
                      result.passed
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "text-indigo-600 hover:text-indigo-700 hover:underline bg-white sm:bg-transparent"
                    }`}
                  >
                    {result.passed ? "🎉 View Next Level" : "← Try Again"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
