// backend/src/routes/projectRoutes.js
const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const projectController = require("../controllers/projectController");
const auth = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validation");

// All project routes MUST require auth
router.use(auth);

// GET /api/projects  → list user’s projects
router.get("/", projectController.getProjects);

// POST /api/projects  → create project
router.post(
    "/",
    [check("title", "Project title is required").not().isEmpty()],
    validate,
    projectController.createProject
);

// GET /api/projects/:projectId → project details
router.get("/:projectId", projectController.getProjectById);

// PUT /api/projects/:projectId → update project
router.put("/:projectId", projectController.updateProject);

// DELETE /api/projects/:projectId → delete project
router.delete("/:projectId", projectController.deleteProject);

module.exports = router;
