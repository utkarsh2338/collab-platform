// backend/src/controllers/taskController.js
const { Task, User, Activity } = require("../models");
const { getIo } = require("../services/socketService");

// helper to safely emit
function emitToProject(projectId, event, payload) {
    try {
        const io = getIo();
        if (!io || !projectId) return;
        io.to(`project:${projectId}`).emit(event, payload);
    } catch (e) {
        console.log("Socket emit error:", e.message);
    }
}

// ----------------------------------------
// GET all tasks for a project
// ----------------------------------------
exports.getTasks = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!projectId) {
            return res.status(400).json({ message: "projectId is required" });
        }

        const tasks = await Task.findAll({
            where: { project_id: projectId },
            include: [
                { model: User, as: "assignee", attributes: ["id", "username", "avatar_url"] },
                { model: User, as: "creator", attributes: ["id", "username"] },
            ],
            order: [["created_at", "ASC"]],
        });

        res.json(tasks);
    } catch (err) {
        console.error("getTasks error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ----------------------------------------
// CREATE task in a project
// ----------------------------------------
exports.createTask = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description, priority, status, assignee_id } = req.body;

        if (!projectId) {
            return res.status(400).json({ message: "projectId is required" });
        }

        const task = await Task.create({
            project_id: projectId,
            title,
            description,
            priority: priority || "medium",
            status: status || "todo",
            assignee_id: assignee_id || null,
            created_by: req.user.id,
        });

        const fullTask = await Task.findByPk(task.id, {
            include: [{ model: User, as: "assignee", attributes: ["id", "username", "avatar_url"] }],
        });

        // log activity (optional)
        if (Activity) {
            await Activity.create({
                project_id: projectId,
                user_id: req.user.id,
                action_type: "task_created",
                entity_type: "task",
                entity_id: task.id,
                description: `created task "${task.title}"`,
            });
        }

        emitToProject(projectId, "task:created", fullTask);

        res.json(fullTask);
    } catch (err) {
        console.error("createTask error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ----------------------------------------
// GET single task
// ----------------------------------------
exports.getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findByPk(taskId, {
            include: [
                { model: User, as: "assignee", attributes: ["id", "username", "avatar_url"] },
                { model: User, as: "creator", attributes: ["id", "username"] },
            ],
        });

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.json(task);
    } catch (err) {
        console.error("getTaskById error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ----------------------------------------
// UPDATE task
// ----------------------------------------
exports.updateTask = async (req, res) => {
    try {
        const { projectId, taskId } = req.params;

        let task = await Task.findOne({
            where: { id: taskId, project_id: projectId },
        });

        if (!task) return res.status(404).json({ message: "Task not found" });

        const oldStatus = task.status;

        const { title, description, priority, status, assignee_id } = req.body;

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (priority !== undefined) task.priority = priority;
        if (status !== undefined) task.status = status;
        if (assignee_id !== undefined) task.assignee_id = assignee_id || null;

        await task.save();

        const fullTask = await Task.findByPk(task.id, {
            include: [{ model: User, as: "assignee", attributes: ["id", "username", "avatar_url"] }],
        });

        if (Activity) {
            await Activity.create({
                project_id: projectId,
                user_id: req.user.id,
                action_type: oldStatus !== task.status ? "task_moved" : "task_updated",
                entity_type: "task",
                entity_id: task.id,
                description:
                    oldStatus !== task.status
                        ? `moved task "${task.title}" from ${oldStatus} to ${task.status}`
                        : `updated task "${task.title}"`,
            });
        }

        emitToProject(projectId, "task:updated", fullTask);

        res.json(fullTask);
    } catch (err) {
        console.error("updateTask error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ----------------------------------------
// DELETE task
// ----------------------------------------
exports.deleteTask = async (req, res) => {
    try {
        const { projectId, taskId } = req.params;

        const task = await Task.findOne({
            where: { id: taskId, project_id: projectId },
        });

        if (!task) return res.status(404).json({ message: "Task not found" });

        const title = task.title;
        await task.destroy();

        if (Activity) {
            await Activity.create({
                project_id: projectId,
                user_id: req.user.id,
                action_type: "task_deleted",
                entity_type: "task",
                entity_id: null,
                description: `deleted task "${title}"`,
            });
        }

        emitToProject(projectId, "task:deleted", { id: taskId });

        res.json({ message: "Task removed" });
    } catch (err) {
        console.error("deleteTask error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
