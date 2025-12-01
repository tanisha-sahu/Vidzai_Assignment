// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-indigo-600 font-semibold"
      : "text-slate-700";

  return (
    <nav className="bg-white/80 backdrop-blur border-b sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* ✅ Logo */}
        <Link
          to="/"
          className="font-extrabold text-xl tracking-wide bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent"
        >
          AI Learn
        </Link>

        {/* ✅ Right Side */}
        <div className="flex items-center gap-5">
          {user ? (
            <>
              {/* Home */}
              <Link
                to="/home"
                className={`text-sm transition hover:text-indigo-600 ${isActive(
                  "/home"
                )}`}
              >
                Home
              </Link>

              {/* ✅ Dummy Profile Icon (NO background, NO letter) */}
              {/* ✅ Premium Dummy Profile Icon */}
              <Link
                to="/profile"
                title="Profile"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M12 14c4.418 0 8 2.686 8 6H4c0-3.314 3.582-6 8-6z" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            </>
          ) : (
            <>
              {/* ✅ Login */}
              <Link
                to="/login"
                className={`text-sm font-medium transition hover:text-indigo-600 ${isActive(
                  "/login"
                )}`}
              >
                Login
              </Link>

              {/* ✅ Stylish Sign Up Button */}
              <Link
                to="/signup"
                className="text-sm font-semibold px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow hover:shadow-lg active:scale-95 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
