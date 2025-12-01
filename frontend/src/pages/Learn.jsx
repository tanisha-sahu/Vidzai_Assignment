import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

export default function Learn() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [level, setLevel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/levels/${id}`);
        setLevel(res.data.level || res.data);
      } catch (err) {
        console.error(err);
        toast.error(err?.response?.data?.message || "Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchLevel();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <p className="text-sm text-slate-500">Loading content...</p>
      </div>
    );

  if (!level)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <p className="text-sm font-semibold">Content not found</p>
          <button onClick={() => navigate("/home")} className="text-indigo-600 hover:underline mt-2">
            Back
          </button>
        </div>
      </div>
    );

  const { title, levelNumber, intro, longDescription, content, examples } = level;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition"
          >
            <span className="text-lg">←</span>
            <span>Back to levels</span>
          </button>
        </div>

        {/* Main card */}
        <article className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {levelNumber && (
                <span className="inline-flex items-center rounded-full bg-indigo-600 text-white text-xs font-semibold px-3 py-1">
                  Level {levelNumber}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            {title}
          </h1>

          {/* Intro */}
          {intro && (
            <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed">
              {intro}
            </p>
          )}

          {/* Content (full) */}
          {content && (
            <section className="mb-6">
              <h2 className="text-sm font-semibold text-slate-800 mb-3">Content</h2>
              <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed">
                {/* Render content paragraphs line breaks if present */}
                {content.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          )}

          {/* Long description (more in-depth) */}
          {longDescription && (
            <section className="mb-6">
              <h2 className="text-sm font-semibold text-slate-800 mb-3">More about this topic</h2>
              <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed">
                {longDescription.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          )}

          {/* Examples */}
          {examples && examples.length > 0 && (
            <section className="mt-4">
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">
                Examples & Use Cases
              </h3>
              <ul className="list-disc list-inside text-sm sm:text-base text-slate-700 space-y-1">
                {examples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Actions: Start Quiz */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => navigate(`/levels/${id}/quiz`)}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm md:text-base font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
            >
              Start Quiz
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
