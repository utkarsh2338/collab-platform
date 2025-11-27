// src/pages/ProjectBoard.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";
import { useProject } from "../context/ProjectContext";
import { useSocket } from "../context/SocketContext";
import api from "../api/axios";

import Column from "../components/Board/Column";
import CreateTaskModal from "../components/Board/CreateTaskModal";
import EditTaskModal from "../components/Board/EditTaskModal";
import ActivityTimeline from "../components/Activity/ActivityTimeline";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import AppLayout from "../components/Layout/AppLayout";

import { Plus, Filter, Settings } from "lucide-react";
import { toast } from "react-toastify";

const ProjectBoard = () => {
    const { projectId } = useParams();
    const socket = useSocket();
    const { fetchProjects } = useProject();

    const [currentProject, setCurrentProject] = useState(null);
    const [tasks, setTasks] = useState({
        todo: [],
        in_progress: [],
        done: [],
    });

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [createStatus, setCreateStatus] = useState("todo");
    const [selectedTask, setSelectedTask] = useState(null);

    // helper: insert/update task into correct column
    const upsertTask = (prev, task) => {
        const cols = ["todo", "in_progress", "done"];
        const next = { ...prev };

        cols.forEach((c) => {
            next[c] = next[c].filter((t) => t.id !== task.id);
        });

        if (!next[task.status]) next[task.status] = [];
        next[task.status] = [...next[task.status], task];

        return next;
    };

    // 1️⃣ Load initial project + tasks (once per projectId)
    useEffect(() => {
        const loadData = async () => {
            try {
                const projectRes = await api.get(`/projects/${projectId}`);
                setCurrentProject(projectRes.data);

                const tasksRes = await api.get(`/projects/${projectId}/tasks`);
                const grouped = { todo: [], in_progress: [], done: [] };

                tasksRes.data.forEach((task) => {
                    if (grouped[task.status]) grouped[task.status].push(task);
                });

                setTasks(grouped);
            } catch (err) {
                console.error("Load error:", err);
                toast.error("Failed to load project data");
            }
        };

        loadData();
        // we don't depend on fetchProjects identity – just call it
        fetchProjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectId]);

    // 2️⃣ Socket: join room + real-time updates
    useEffect(() => {
        if (!socket || !projectId) return;

        socket.emit("joinProject", projectId);

        const handleCreated = (task) => setTasks((prev) => upsertTask(prev, task));
        const handleUpdated = (task) => setTasks((prev) => upsertTask(prev, task));
        const handleDeleted = ({ id }) =>
            setTasks((prev) => {
                const cols = ["todo", "in_progress", "done"];
                const next = { ...prev };
                cols.forEach((c) => {
                    next[c] = next[c].filter((t) => t.id !== id);
                });
                return next;
            });

        socket.on("task:created", handleCreated);
        socket.on("task:updated", handleUpdated);
        socket.on("task:deleted", handleDeleted);

        return () => {
            socket.off("task:created", handleCreated);
            socket.off("task:updated", handleUpdated);
            socket.off("task:deleted", handleDeleted);
        };
    }, [socket, projectId]);

    // 3️⃣ Drag & Drop handler
    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = source.droppableId;
        const end = destination.droppableId;

        setTasks((prev) => {
            const next = { ...prev };
            const [moved] = next[start].splice(source.index, 1);
            moved.status = end;
            next[end].splice(destination.index, 0, moved);
            return next;
        });

        try {
            await api.put(`/projects/${projectId}/tasks/${draggableId}`, {
                status: end,
            });
            // realtime update comes via socket
        } catch (err) {
            console.error("Drag update failed:", err);
            toast.error("Failed to update task");
        }
    };

    // Modals
    const openCreateModal = (status) => {
        setCreateStatus(status);
        setIsCreateModalOpen(true);
    };

    const openEditModal = (task) => {
        setSelectedTask(task);
        setIsEditModalOpen(true);
    };

    const handleCreateTask = async (data) => {
        try {
            await api.post(`/projects/${projectId}/tasks`, data);
            setIsCreateModalOpen(false);
            toast.success("Task created");
        } catch (err) {
            console.error(err);
            toast.error("Failed to create task");
        }
    };

    const handleUpdateTask = async (taskId, data) => {
        try {
            await api.put(`/projects/${projectId}/tasks/${taskId}`, data);
            setIsEditModalOpen(false);
            toast.success("Task updated");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update task");
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await api.delete(`/projects/${projectId}/tasks/${taskId}`);
            setIsEditModalOpen(false);
            toast.success("Task deleted");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete task");
        }
    };

    if (!currentProject) {
        return (
            <AppLayout title="Loading...">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin h-8 w-8 border-2 border-indigo-500 rounded-full border-t-transparent" />
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout
            title={currentProject.title}
            actions={
                <>
                    <div className="flex items-center -space-x-2 mr-4">
                        {currentProject.members?.map((m) => (
                            <div
                                key={m.id}
                                className="h-8 w-8 bg-indigo-100 border-2 border-white rounded-full flex items-center justify-center text-xs font-bold text-indigo-700"
                            >
                                {m.username.charAt(0).toUpperCase()}
                            </div>
                        ))}

                        <Button
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={() => openCreateModal("todo")}
                        >
                            <Plus size={14} />
                        </Button>
                    </div>

                    <div className="h-6 w-px bg-gray-300 mx-2" />

                    <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-md">
                        <Filter size={18} />
                    </button>

                    <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-md">
                        <Settings size={18} />
                    </button>
                </>
            }
        >
            <div className="flex gap-6 h-[calc(100vh-140px)]">
                {/* Board */}
                <div className="flex-1 overflow-x-auto">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Card className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-sm flex flex-col">
                            <div className="mb-4">
                                <p className="text-xs font-semibold text-gray-400 uppercase">
                                    Board
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Organize tasks by status
                                </p>
                            </div>

                            <div className="flex gap-6 h-full min-w-max">
                                <Column
                                    title="To Do"
                                    status="todo"
                                    tasks={tasks.todo}
                                    onAddTask={openCreateModal}
                                    onTaskClick={openEditModal}
                                />
                                <Column
                                    title="In Progress"
                                    status="in_progress"
                                    tasks={tasks.in_progress}
                                    onAddTask={openCreateModal}
                                    onTaskClick={openEditModal}
                                />
                                <Column
                                    title="Done"
                                    status="done"
                                    tasks={tasks.done}
                                    onAddTask={openCreateModal}
                                    onTaskClick={openEditModal}
                                />
                            </div>
                        </Card>
                    </DragDropContext>
                </div>

                {/* Activity Timeline */}
                <div className="w-80 hidden xl:flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <ActivityTimeline projectId={projectId} />
                </div>
            </div>

            {/* Modals */}
            <CreateTaskModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateTask}
                initialStatus={createStatus}
                members={currentProject.members || []}
            />

            <EditTaskModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onUpdate={(data) => handleUpdateTask(selectedTask.id, data)}
                onDelete={handleDeleteTask}
                task={selectedTask}
                members={currentProject.members || []}
            />
        </AppLayout>
    );
};

export default ProjectBoard;
