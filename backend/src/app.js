// backend/src/app.js
const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// CORS (frontend at 5173)
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
    res.send("API is running...");
});

// Auth
app.use("/api/auth", authRoutes);

// 🔹 NESTED TASK ROUTES: /api/projects/:projectId/tasks/...
// must be BEFORE /api/projects
app.use("/api/projects/:projectId/tasks", taskRoutes);

// Projects
app.use("/api/projects", projectRoutes);

module.exports = app;
