import React from "react";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <div className="fixed inset-0 z-10 bg-gradient-to-b from-white via-slate-50 to-slate-100 overflow-hidden w-full">
      {/* Decorative blurred blobs */}
      <div className="pointer-events-none absolute -top-20 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-200 to-indigo-400 opacity-40 blur-3xl hero-blob" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-gradient-to-tr from-emerald-200 to-emerald-400 opacity-30 blur-3xl hero-blob" />

      <main className="w-full px-6 py-20 flex items-center justify-center">
        <div className="w-full text-center">
          <div className="inline-flex items-center gap-3 mb-6 justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              <span className="text-xs rounded-full bg-blue-600 text-white px-2 py-0.5">New</span>
              Learn AI step by step
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4 fade-up" style={{ animationDelay: '0.05s' }}>
            Understand AI concepts
            <span className="block mt-2 text-indigo-600">one level at a time.</span>
          </h1>

          <p className="max-w-4xl mx-auto text-sm sm:text-base md:text-lg text-slate-500 mb-8 fade-up" style={{ animationDelay: '0.12s' }}>
            Start from the basics and progress through structured levels. Each level has a concise explainer and a quick quiz so you <strong>understand</strong> — not just memorize.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center fade-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={handleGetStarted}
              className="w-full sm:w-auto inline-flex justify-center items-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 transition transform hover:-translate-y-0.5"
            >
              Get started
            </button>
          </div>

          {/* Small features / visual card */}
          <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch px-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md text-left max-w-xs mx-auto w-full">
              <h4 className="text-sm font-semibold text-slate-900">Short lessons</h4>
              <p className="text-xs text-slate-500 mt-1">Bite-sized modules that focus on the concept.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md text-left max-w-xs mx-auto w-full">
              <h4 className="text-sm font-semibold text-slate-900">Quick quizzes</h4>
              <p className="text-xs text-slate-500 mt-1">Test understanding — immediate feedback and hints.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md text-left max-w-xs mx-auto w-full">
              <h4 className="text-sm font-semibold text-slate-900">Progress tracking</h4>
              <p className="text-xs text-slate-500 mt-1">Unlock levels as you complete quizzes and build confidence.</p>
            </div>
          </div>

          {/* footer hint for mobile */}
          <p className="mt-8 text-xs text-slate-400">Tip: tap "Get started" to go to your dashboard and begin Level 1.</p>
        </div>
      </main>

      {/* Inline styles for small animations (kept local so no extra deps) */}
      <style>{`
        @keyframes float {0%{transform:translateY(0)}50%{transform:translateY(-8px)}100%{transform:translateY(0)}}
        .hero-blob{ animation: float 8s ease-in-out infinite; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { opacity: 0; transform: translateY(12px); animation: fadeUp 0.7s ease forwards; }
      `}</style>
    </div>
  );
}
