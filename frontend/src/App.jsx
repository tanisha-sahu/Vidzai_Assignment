// src/App.jsx
import React from "react";
import { Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import LevelDetail from "./pages/LevelDetail";
import Learn from "./pages/Learn";
import Quiz from "./pages/Quiz";
import QuizPage from "./pages/QuizPage";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import { toast } from "react-toastify";
import api from "./api";

function PrivateRoute({ children }) {
  const { user, authLoading } = useAuth();

  if (authLoading) return null; 

  return user ? children : <Navigate to="/login" replace />;
}

function ProtectedLevelRoute({ children }) {
  const { user, authLoading } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [levelNumber, setLevelNumber] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAccess = async () => {
      if (authLoading) return;

      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const res = await api.get(`/levels/${id}`);
        const level = res.data.level || res.data;
        const ln = level.levelNumber;
        setLevelNumber(ln);

        const completed = Array.isArray(user.completedLevels)
          ? user.completedLevels
          : [];

        const prevCompleted = ln === 1 ? true : completed.includes(ln - 1);
        const isCompleted = completed.includes(ln);
        const isUnlocked = ln === 1 || prevCompleted || isCompleted;

        if (!isUnlocked) {
          toast.info(
            "This level is locked. Complete the previous level to unlock it."
          );
          navigate("/home", { replace: true });
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load level");
        navigate("/home", { replace: true });
      }
    };

    checkAccess();
  }, [user, id, navigate, authLoading]);

  if (authLoading || loading) return null;

  return children;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* HOME: now protected, user must be logged in */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          {/* Level detail: requires specific unlocked level */}
          <Route
            path="/levels/:id"
            element={
              <ProtectedLevelRoute>
                <LevelDetail />
              </ProtectedLevelRoute>
            }
          />

          {/* Learn page is protected (must be logged in) */}
          <Route
            path="/learn/:id"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />

          {/* Quiz for a level – also using the level-protected wrapper */}
          <Route
            path="/levels/:id/quiz"
            element={
              <ProtectedLevelRoute>
                <QuizPage />
              </ProtectedLevelRoute>
            }
          />

          {/* Quiz take page: protected */}
          <Route
            path="/quiz/:id"
            element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
