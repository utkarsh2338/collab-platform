import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import AppLayout from "../components/Layout/AppLayout";
import { Folder, Clock, MoreVertical, Plus } from "lucide-react";
import Button from "../components/UI/Button";

const Projects = () => {
    const { projects, fetchProjects, loading } = useProject();

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <AppLayout
            title="Projects"
            actions={
                <Button className="flex items-center gap-2">
                    <Plus size={16} />
                    New Project
                </Button>
            }
        >
            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            to={`/project/${project.id}`}
                            className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
                        >
                            <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/50">
                                            <Folder className="text-indigo-600 dark:text-indigo-300" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                                {project.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {project.members?.length || 0} members
                                            </p>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>

                                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 min-h-[40px]">
                                    {project.description || "No description added yet."}
                                </p>

                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center">
                                        <Clock size={14} className="mr-1" />
                                        Updated recently
                                    </div>
                                    <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-[11px] font-medium">
                                        {project.status || "Active"}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Add-new card */}
                    
                </div>
            )}
        </AppLayout>
    );
};

export default Projects;
