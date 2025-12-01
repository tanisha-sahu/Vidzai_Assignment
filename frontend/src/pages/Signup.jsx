// src/pages/Signup.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup({ name, email, password });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-slate-500">
           Start learning AI — track progress, take quizzes and earn points.
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-slate-100"
          aria-label="Sign up form"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Full name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                type="text"
                required
                placeholder="Your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                type="email"
                required
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 pr-10 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create a password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-slate-600 hover:bg-slate-100 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                className="w-full rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg active:scale-95 transition disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </div>

            {/* Only login line, no terms/privacy, no 0 chars etc. */}
            <div className="text-center text-sm text-slate-600 pt-2">
              <span>Already have an account? </span>
              <button
                type="button"
                onClick={() => (window.location.href = "/login")}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
