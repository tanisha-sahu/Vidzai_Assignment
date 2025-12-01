// src/components/LevelCard.jsx
import React from "react";

export default function LevelCard({ levelNumber, title, description, status }) {
  const isLocked = status === "locked";

  const getStatusConfig = (state) => {
    switch (state) {
      case "completed":
        return {
          label: "Completed",
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-100",
          icon: (
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="9" className="fill-emerald-100" />
              <path
                d="M6 10.5L8.5 13L14 7.5"
                stroke="#047857"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        };
      case "unlocked":
        return {
          label: "Unlocked",
          bg: "bg-indigo-50",
          text: "text-indigo-700",
          border: "border-indigo-100",
          icon: (
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2.5L11.2 6H15L11.9 8.15L13.1 11.5L10 9.4L6.9 11.5L8.1 8.15L5 6H8.8L10 2.5Z"
                className="fill-indigo-500"
              />
            </svg>
          ),
        };
      case "locked":
      default:
        return {
          label: "Locked",
          bg: "bg-slate-100",
          text: "text-slate-600",
          border: "border-slate-200",
          icon: (
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="4"
                y="8"
                width="12"
                height="9"
                rx="2"
                className="fill-slate-200"
              />
              <path
                d="M7 8V7.2C7 5.43 8.43 4 10.2 4C11.97 4 13.4 5.43 13.4 7.2V8"
                stroke="#64748B"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle cx="10" cy="11" r="1.2" fill="#64748B" />
            </svg>
          ),
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div
      className={`relative border rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col gap-2 transition 
        ${
          isLocked
            ? "bg-slate-50 opacity-95 cursor-not-allowed"
            : "bg-white hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
        }`}
    >
      {/* Top row: Level + status pill */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-900 text-white text-[11px] font-semibold px-3 py-1 tracking-wide">
            Level {levelNumber}
          </span>
        </div>

        {/* Status pill with icon */}
        <div
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
        >
          {statusConfig.icon}
          <span className="text-[11px] font-semibold uppercase tracking-wide">
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-1 text-base sm:text-lg font-semibold text-slate-900">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1">
          {description}
        </p>
      )}

      {/* Subtle locked hint at bottom if locked */}
      {isLocked && (
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="4"
              y="8"
              width="12"
              height="9"
              rx="2"
              className="fill-slate-200"
            />
            <path
              d="M7 8V7.2C7 5.43 8.43 4 10.2 4C11.97 4 13.4 5.43 13.4 7.2V8"
              stroke="#94A3B8"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <span>Complete previous level to unlock</span>
        </div>
      )}
    </div>
  );
}
