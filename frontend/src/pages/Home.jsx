// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchLevels = async () => {
    try {
      setLoading(true);
      const res = await api.get("/levels");
      setLevels(res.data.levels || res.data);
    } catch (err) {
      console.error(err);
      const message = err?.response?.data?.message || "Failed to load topics";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  const handleCardClick = (level) => {
    const id = level._id || level.id;
    if (!id) return;
    navigate(`/levels/${id}`);
  };

  const completedLevels = Array.isArray(user?.completedLevels)
    ? user.completedLevels
    : [];

  const isNewUser = completedLevels.length === 0;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
            Your AI Learning Levels
          </h2>

          {isNewUser ? (
            <p className="text-slate-500 text-sm">
              Welcome! 🎉 Level 1 is unlocked for you. Complete it to start
              unlocking higher levels.
            </p>
          ) : (
            <p className="text-slate-500 text-sm">
              Level 1 is always unlocked. Each time you finish a level&apos;s
              quiz, the next level unlocks. Keep going! 🚀
            </p>
          )}
        </div>

        {loading ? (
          <p className="text-center text-slate-500">Loading topics...</p>
        ) : levels.length === 0 ? (
          <p className="text-center text-slate-500">
            No topics found. Check your backend <code>/levels</code>.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {levels.map((level, idx) => {
              const id = level._id || level.id || idx;
              const levelNumber = level.levelNumber || level.level || idx + 1;
              const title = level.title || level.name || `Level ${levelNumber}`;

              const isCompleted = completedLevels.includes(levelNumber);
              const prevCompleted =
                levelNumber === 1
                  ? true
                  : completedLevels.includes(levelNumber - 1);

              const isUnlocked =
                levelNumber === 1 || prevCompleted || isCompleted;
              const isLocked = !isUnlocked;

              const onCardClick = () => {
                if (isLocked) {
                  toast.info(
                    "This level is locked. Complete the previous level to unlock it."
                  );
                  return;
                }
                handleCardClick(level);
              };

              return (
                <div
                  key={id}
                  role="button"
                  tabIndex={0}
                  onClick={onCardClick}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onCardClick();
                    }
                  }}
                  className={`relative rounded-2xl border bg-white shadow hover:shadow-md transition overflow-hidden ${
                    isLocked ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <div className="p-6 text-center flex flex-col items-center">
                    {/* Level badge */}
                    <span className="mb-3 inline-flex items-center rounded-full bg-indigo-600 text-white text-xs font-semibold px-4 py-1">
                      Level {levelNumber}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {title}
                    </h3>

                    {/* ✅ UPDATED STATUS STYLE ONLY */}
                    <div
                      className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${
                        isLocked
                          ? "bg-slate-100 text-slate-500 border-slate-200"
                          : isCompleted
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-indigo-50 text-indigo-700 border-indigo-200"
                      }`}
                    >
                      {isLocked
                        ? "Locked"
                        : isCompleted
                        ? "Completed"
                        : "Unlocked"}
                    </div>
                  </div>

                  {/* Best points badge */}
                  {isCompleted &&
                    (() => {
                      const bestEntry = Array.isArray(user?.levelScores)
                        ? user.levelScores.find(
                            (e) => e.levelNumber === levelNumber
                          )
                        : null;
                      const bestPoints = bestEntry ? bestEntry.bestScore : null;
                      return bestPoints ? (
                        <div className="absolute bottom-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 shadow flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{bestPoints}</span>
                        </div>
                      ) : null;
                    })()}

                  {/* Lock overlay */}
                  {isLocked && (
                    <div className="absolute inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white border flex items-center justify-center shadow">
<i class="fa-solid fa-lock text-3xl text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-700 drop-shadow-[0_4px_10px_rgba(200,150,0,0.45)]"></i>
 </div>
                        <p className="text-sm font-semibold text-slate-700">
                          Locked
                        </p>
                        <p className="text-xs text-slate-500">
                          Complete previous level to unlock
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Completed strip */}
                  {isCompleted && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
