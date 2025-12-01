import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // <-- loading flag
  const navigate = useNavigate();

  // on mount, try to fetch profile if token exists
  useEffect(() => {
    const init = async () => {
      setAuthLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await api.get("/profile");
          setUser(res.data.user);
        } catch (err) {
          console.error("profile fetch failed", err);
          localStorage.removeItem("token");
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    };

    init();
  }, []);

  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token } = res.data;
      localStorage.setItem("token", token);

      // immediately fetch full profile
      try {
        const profileRes = await api.get("/profile");
        setUser(profileRes.data.user);
      } catch (err) {
        console.error("Failed to fetch full profile after login", err);
        // still proceed with minimal info if needed
        setUser(res.data.user || null);
      }

      toast.success("Logged in");
      navigate("/home");
    } catch (err) {
      const message = err?.response?.data?.message || "Login failed";
      toast.error(message);
      throw err;
    }
  };

  const signup = async ({ name, email, password }) => {
    try {
      const res = await api.post("/auth/signup", { name, email, password });
      const { token } = res.data;
      localStorage.setItem("token", token);

      // immediately fetch full profile
      try {
        const profileRes = await api.get("/profile");
        setUser(profileRes.data.user);
      } catch (err) {
        console.error("Failed to fetch full profile after signup", err);
        setUser(res.data.user || null);
      }

      toast.success("Account created");
      navigate("/home");
    } catch (err) {
      const message = err?.response?.data?.message || "Signup failed";
      toast.error(message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("Logged out");
    navigate("/");
  };

  const refreshUser = async () => {
    try {
      const res = await api.get("/profile");
      setUser(res.data.user);
    } catch (err) {
      console.error("Failed to refresh user:", err);
    }
  };

  const value = {
    user,
    authLoading,
    login,
    signup,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
