// backend/src/controllers/projectController.js
const { Project, User } = require("../models");

// ----------------------------------------
// GET all projects for logged-in user
// ----------------------------------------
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: { owner_id: req.user.id },
            order: [["created_at", "DESC"]],
        });

        res.json(projects);
    } catch (err) {
        console.error("getProjects error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ----------------------------------------
// CREATE project
// ----------------------------------------
exports.createProject = async (req, res) => {
    try {
        const { title, description } = req.body;

        const project = await Project.create({
            title,
            description,
            owner_id: req.user.id,
        });

        res.json(project);
    } catch (err) {
        console.error("createProject error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ----------------------------------------
// GET project details
// ----------------------------------------
exports.getProjectById = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findByPk(projectId, {
            include: [
                {
                    model: User,
                    as: "members",
                    attributes: ["id", "username", "avatar_url"],
                },
            ],
        });

        if (!project) return res.status(404).json({ message: "Project not found" });

        res.json(project);
    } catch (err) {
        console.error("getProjectById error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ----------------------------------------
// UPDATE project
// ----------------------------------------
exports.updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description } = req.body;

        const project = await Project.findByPk(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        project.title = title || project.title;
        project.description = description || project.description;

        await project.save();

        res.json(project);
    } catch (err) {
        console.error("updateProject error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ----------------------------------------
// DELETE project
// ----------------------------------------
exports.deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findByPk(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        await project.destroy();

        res.json({ message: "Project deleted" });
    } catch (err) {
        console.error("deleteProject error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
