import React, { useEffect, useState } from "react";
import { useProject } from "../context/ProjectContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
    Plus,
    Folder,
    Clock,
    CheckCircle,
    MoreVertical,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import AppLayout from "../components/Layout/AppLayout";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

/* ============================================================
   CREATE PROJECT MODAL
   ============================================================ */
const CreateProjectModal = ({ isOpen, onClose, onCreate }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        await onCreate(data.title, data.description);
        reset();
        onClose();
        toast.success("Project created!");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white dark:bg-slate-900 
                           rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 
                           p-6"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Create New Project
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <Plus size={22} className="rotate-45" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
                            Project Title
                        </label>
                        <Input {...register("title", { required: true })} placeholder="e.g. Website Redesign" />
                    </div>

                    <div>
                        <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
                            Description
                        </label>
                        <textarea
                            {...register("description")}
                            rows="3"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 
                                       rounded-lg text-sm bg-white dark:bg-slate-800 
                                       text-gray-900 dark:text-gray-100
                                       focus:ring-2 focus:ring-indigo-500"
                            placeholder="Briefly describe your project..."
                        ></textarea>
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                                       dark:hover:bg-slate-700 rounded-lg"
                        >
                            Cancel
                        </button>
                        <Button type="submit" className="px-4">Create Project</Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

/* ============================================================
   STAT CARD (Dark Mode Supported)
   ============================================================ */
const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="
        bg-white dark:bg-slate-900 
        shadow-sm hover:shadow-md border 
        border-gray-200 dark:border-slate-700
        rounded-2xl p-6 flex items-center gap-4 transition-all
    ">
        <div className={`p-3 rounded-xl ${color}`}>
            <Icon size={24} className="text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
        </div>
    </div>
);

/* ============================================================
   DASHBOARD PAGE
   ============================================================ */
const Dashboard = () => {
    const { projects, fetchProjects, createProject, loading } = useProject();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const stats = [
        {
            icon: Folder,
            label: "Total Projects",
            value: projects.length,
            color: "bg-indigo-500",
        },
        {
            icon: Clock,
            label: "Active Tasks",
            value: "12",
            color: "bg-orange-500",
        },
        {
            icon: CheckCircle,
            label: "Completed",
            value: "24",
            color: "bg-green-500",
        },
    ];

    return (
        <AppLayout
            title="Dashboard"
            actions={
                <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
                    <Plus size={18} /> New Project
                </Button>
            }
        >
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Recent Projects */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Recent Projects
            </h2>

            {/* Project List */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin h-8 w-8 border-2 border-indigo-600 dark:border-indigo-400 rounded-full border-t-transparent"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            whileHover={{ y: -4 }}
                            className="
                                bg-white dark:bg-slate-900 
                                rounded-xl border border-gray-200 dark:border-slate-700 
                                shadow-sm hover:shadow-md transition-all overflow-hidden group
                            "
                        >
                            <Link to={`/project/${project.id}`}>
                                {/* Accent Bar */}
                                <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />

                                <div className="p-6">
                                    <div className="flex justify-between mb-4">
                                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg 
                                                        group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60 transition">
                                            <Folder size={20} className="text-indigo-600 dark:text-indigo-300" />
                                        </div>

                                        <button className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 p-1 rounded-full">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                                        {project.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-5 line-clamp-2">
                                        {project.description}
                                    </p>

                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-slate-700">
                                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                            <Clock size={14} className="mr-1" />
                                            Updated 2h ago
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="w-7 h-7 rounded-full
                                                                   bg-gray-200 dark:bg-slate-700
                                                                   border-2 border-white dark:border-slate-900
                                                                   flex items-center justify-center 
                                                                   text-[10px] font-semibold 
                                                                   text-gray-600 dark:text-gray-300"
                                                    >
                                                        U{i}
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                +{project.members?.length || 0}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {/* Create New Project Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsModalOpen(true)}
                        className="
                            cursor-pointer flex flex-col items-center justify-center 
                            border-2 border-dashed border-gray-300 dark:border-slate-700
                            rounded-xl p-8 hover:border-indigo-500 hover:bg-indigo-50/30
                            dark:hover:bg-slate-800 transition-all
                        "
                    >
                        <div className="p-3 rounded-full bg-gray-100 dark:bg-slate-700 mb-3">
                            <Plus size={24} className="text-gray-400 dark:text-gray-200" />
                        </div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Create New Project
                        </p>
                    </motion.div>
                </div>
            )}

            <CreateProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={createProject}
            />
        </AppLayout>
    );
};

export default Dashboard;
