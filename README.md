# Vidzai — AI Learning Platform

Live demo: https://vidzai-assignment-two.vercel.app/

Demo account
- Email: `tester@gmail.com`
- Password: `123`

Overview
--------
Vidzai is a small learning platform that provides short topic "levels" about AI and quizzes for each level. Users progress by completing quizzes — when a user passes a level's quiz the next level unlocks. The project includes a backend (Node.js + Express + MongoDB) and a frontend (React + Vite + Tailwind).

Key features
------------
- Multi-level learning content with a quiz for each level
- Unlock next level automatically on passing the quiz (60% pass threshold)
- Per-user best score stored per level and total points tracking
- Progress UI on the frontend (home cards, profile with progress and per-level best points)
- Authentication (signup/login) with JWT tokens
- Admin / dev seed script to populate levels (`seedLevels.js`)

Tech stack
----------
- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: React, Vite, Tailwind CSS
- Authentication: JWT

Repository layout
-----------------
```
backend/          # Express API, models, routes, seed script
frontend/         # React application (Vite + Tailwind)
```

Quick start (development)
-------------------------
Prerequisites:
- Node.js (recommended 20.x or newer)
- MongoDB running locally (default expects mongodb://localhost:27017/ai-learning) or provide a remote URI in the .env

1) Clone the repository

```powershell
git clone <repository-url>
cd Vidzai_Assignment
```

2) Backend setup

```powershell
cd backend
npm install
```

Create a `.env` file in `backend/` (example values):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-learning
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:5173
```

Seed example levels (optional but recommended):

```powershell
node seedLevels.js
```

Start the backend:

```powershell
npm start
```

The API will be available at `http://localhost:5000/api` by default.

3) Frontend setup

```powershell
cd ../frontend
npm install
```

Frontend env (optional): create `.env` or set `VITE_API_URL` to point to your backend API if different from `http://localhost:5000`.

Start the frontend dev server:

```powershell
npm run dev
```

Open the app in the browser (Vite will print the local URL, typically `http://localhost:5173` or another free port).

How it works — level/quiz flow
-----------------------------
- Levels are stored in the `Level` model and include fields like `title`, `levelNumber`, `intro`, `content`, `longDescription`, `examples` and `quizQuestions`.
- The frontend's Home page retrieves all levels and decides whether a level is "unlocked" by checking the user's `completedLevels` array:
  - Level 1 is always unlocked
  - Level N is unlocked if level N-1 is present in `user.completedLevels` or the user has already completed N.
- When a user submits a quiz (`POST /api/levels/:id/quiz/submit`):
  - The backend grades the quiz (correct answers compared server-side)
  - A 60% threshold determines pass/fail
  - If the user passes:
    - The backend updates `user.completedLevels` (adds this levelNumber)
    - The backend tracks per-level best score in `user.levelScores` and awards only the delta points (points per correct answer = 10)
    - It marks the level status as `completed` and unlocks the next level by setting its `status` to `unlocked`
  - The API response contains the attempt `score`, `passed` boolean, and the user's `bestScore` / `bestPoints` for that level
- The frontend calls a `refreshUser()` helper after a successful quiz to fetch the updated `/api/profile` so the UI reflects unlocked levels and updated points immediately.

API endpoints (high level)
--------------------------
- `POST /api/auth/signup` — create user
- `POST /api/auth/login` — login (returns JWT token + user)
- `GET /api/profile` — authenticated, returns full user object
- `GET /api/levels` — list of all levels
- `GET /api/levels/:id` — details for a level
- `GET /api/levels/:id/quiz` — quiz for the level (without correct answers)
- `POST /api/levels/:id/quiz/submit` — submit quiz (authenticated)

Demo credentials & live site
----------------------------
- Live demo: https://vidzai-assignment-two.vercel.app/
- Demo user: `tester@gmail.com` / `123`

Notes for maintainers / developers
---------------------------------
- The backend `seedLevels.js` will drop existing levels and insert example levels — use carefully in production.
- `pointsPerQuestion` is currently implemented as `10` in `backend/routes/levelRoutes.js` — change there if you want a different scoring rule.
- The auth middleware expects JWT tokens in `Authorization: Bearer <token>` header.
- The profile endpoint (`/api/profile`) returns the full `User` document including `levelScores` which the frontend uses to show per-level best points.

Contributing
------------
Contributions are welcome. Please open an issue or a pull request with a clear description of changes.
