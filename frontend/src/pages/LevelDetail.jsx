import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function LevelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [level, setLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/levels/${id}`);
        setLevel(res.data.level || res.data);
      } catch (err) {
        console.error(err);
        toast.error(err?.response?.data?.message || "Failed to load level");
      } finally {
        setLoading(false);
      }
    };

    fetchLevel();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <p className="text-sm text-slate-500">Loading level...</p>
      </div>
    );
  }

  if (!level) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <p className="text-slate-700 font-semibold mb-2">Level not found</p>
          <button
            onClick={() => navigate("/home")}
            className="text-sm text-indigo-600 hover:underline"
          >
            Back to Levels
          </button>
        </div>
      </div>
    );
  }

  const {
    title,
    levelNumber,
    intro,
    description,
    status,
  } = level;

  const bestEntry = Array.isArray(user?.levelScores)
    ? user.levelScores.find((e) => e.levelNumber === levelNumber)
    : null;
  const bestPoints = bestEntry ? bestEntry.bestScore * 10 : null;

  const mainTitle = title || level?.name || `Level ${levelNumber || ""}`.trim();
  const shortIntro =
    intro || description || "A concise introduction to this topic.";

return (
  <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-slate-100">

    {/*  Proper top spacing + aligned back button */}
    <div className="w-full max-w-5xl mx-auto px-4 pt-6">
      <button
        onClick={() => navigate("/home")}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition"
      >
        <span className="text-lg">←</span>
        <span>Back to levels</span>
      </button>
    </div>

    {/*  Content section */}
    <div className="w-full px-4 py-6 md:py-10">
      <article className="w-full md:max-w-5xl md:mx-auto md:bg-white md:border md:rounded-2xl md:shadow-lg overflow-hidden">
        <div className="md:h-1 md:bg-gradient-to-r md:from-indigo-500 md:via-sky-500 md:to-emerald-400" />

        <div className="p-4 sm:p-6 md:p-8">
          {/* Top meta row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              {levelNumber && (
                <span className="inline-flex items-center rounded-full bg-indigo-600 text-white text-xs font-semibold px-3 py-1">
                  Level {levelNumber}
                </span>
              )}

              {status && (
                <span className="text-xs font-medium text-slate-500">
                  {String(status).charAt(0).toUpperCase() +
                    String(status).slice(1)}
                </span>
              )}
            </div>

            {bestPoints && (
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                <span className="text-yellow-400">★</span>
                <span className="font-semibold">{bestPoints} pts</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            {mainTitle}
          </h1>

          {/* Intro */}
          <p className="text-sm sm:text-base text-slate-600 mb-8">
            {shortIntro}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate(`/learn/${id}`)}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm sm:text-base font-semibold text-white shadow hover:bg-indigo-700 transition"
            >
              Learn More
            </button>

            <button
              onClick={() => navigate(`/levels/${id}/quiz`)}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm sm:text-base font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Take Quiz
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
);

}
