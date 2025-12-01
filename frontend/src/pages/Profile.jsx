// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import { toast } from "react-toastify";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [allLevels, setAllLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setLoading(true);
        const res = await api.get("/levels");
        setAllLevels(res.data.levels || res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load levels");
      } finally {
        setLoading(false);
      }
    };
    fetchLevels();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <p className="text-center text-slate-600">Loading profile...</p>
      </div>
    );
  }

  const completedLevels = Array.isArray(user?.completedLevels)
    ? user.completedLevels
    : [];
  const totalLevels = allLevels.length;
  const progressPercent =
    totalLevels > 0 ? (completedLevels.length / totalLevels) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate("/home")}
            className="mb-2 sm:mb-4 text-xs sm:text-sm text-slate-600 hover:text-slate-900"
          >
            ← Back to Levels
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-7 lg:p-8">
          {/* User Info */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 truncate">
                  {user.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 break-all">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              <div className="bg-indigo-50 rounded-lg p-3 sm:p-4 text-center">
                <p className="text-[11px] sm:text-xs text-slate-600 mb-1">
                  Total Points
                </p>
                <p className="text-xl sm:text-2xl font-bold text-indigo-600">
                  {user.totalPoints || 0}
                </p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3 sm:p-4 text-center">
                <p className="text-[11px] sm:text-xs text-slate-600 mb-1">
                  Completed
                </p>
                <p className="text-xl sm:text-2xl font-bold text-emerald-600">
                  {completedLevels.length}
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 sm:p-4 text-center">
                <p className="text-[11px] sm:text-xs text-slate-600 mb-1">
                  Remaining
                </p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">
                  {totalLevels - completedLevels.length}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                <p className="text-sm font-semibold text-slate-700">
                  Learning Progress
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  {completedLevels.length} / {totalLevels} levels
                </p>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 sm:h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                {Math.round(progressPercent)}% complete
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t my-6" />

          {/* Completed Levels Section */}
          <div className="mb-8">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
              Completed Levels
            </h2>

            {loading ? (
              <p className="text-sm text-slate-500">Loading levels...</p>
            ) : completedLevels.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-6">
                No levels completed yet. Start learning! 🚀
              </p>
            ) : (
              <div className="space-y-3">
                {allLevels
                  .filter((level) =>
                    completedLevels.includes(level.levelNumber)
                  )
                  .sort((a, b) => a.levelNumber - b.levelNumber)
                  .map((level) => {
                    const bestEntry = Array.isArray(user?.levelScores)
                      ? user.levelScores.find(
                          (e) => e.levelNumber === level.levelNumber
                        )
                      : null;
                    const bestScore = bestEntry?.bestScore || 0;
                    const bestPoints = bestScore * 10;
                    const total = level.quizQuestions?.length || 0;
                    const scorePercent =
                      total > 0 ? (bestScore / total) * 100 : 0;

                    return (
                      <div
                        key={level._id}
                        className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-3 sm:p-4 border border-slate-200"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-3 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                              Level {level.levelNumber}:{" "}
                              {level.title || "Untitled"}
                            </h3>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-3">
                              {level.intro}
                            </p>
                          </div>
                          {/* aligned points & score */}
                          <div className="flex flex-row sm:flex-col items-end sm:items-end justify-between sm:justify-start text-right min-w-[80px] gap-1">
                            <p className="text-sm font-bold text-emerald-600 leading-tight">
                              {bestPoints} pts
                            </p>
                            <p className="text-xs text-slate-500 leading-tight">
                              {bestScore} / {total}
                            </p>
                          </div>
                        </div>

                        {/* Mini progress bar for this level */}
                        <div className="mb-3">
                          <div className="w-full bg-slate-300 rounded-full h-1.5 sm:h-2 overflow-hidden">
                            <div
                              className="bg-emerald-500 h-full transition-all duration-300"
                              style={{ width: `${scorePercent}%` }}
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => navigate(`/levels/${level._id}`)}
                          className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
                        >
                          Retake Quiz →
                        </button>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t my-6" />

          {/* Logout Button */}
          <div className="flex">
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="mx-auto w-full sm:w-auto flex items-center justify-center gap-3 
               px-5 sm:px-6 py-3 rounded-2xl 
               bg-gradient-to-br from-red-500 to-rose-600 
               border border-red-400/60 
               shadow-lg shadow-red-500/30 
               text-white text-sm sm:text-base font-semibold 
               hover:scale-[1.03] hover:shadow-xl hover:shadow-red-500/40 
               active:scale-95 transition-all duration-200"
            >
              <i className="fa-solid fa-right-from-bracket text-white text-lg drop-shadow" />
              <span className="tracking-wide">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
