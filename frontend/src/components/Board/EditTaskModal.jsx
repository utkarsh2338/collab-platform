import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../UI/Input";
import Button from "../UI/Button";

const EditTaskModal = ({
    isOpen,
    onClose,
    onUpdate,
    onDelete,
    task,
    members,
}) => {
    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        if (task) {
            setValue("title", task.title);
            setValue("description", task.description);
            setValue("priority", task.priority);
            setValue("status", task.status);
            setValue("assignee_id", task.assignee_id || "");
        }
    }, [task, setValue]);

    const onSubmit = async (data) => {
        await onUpdate({ ...task, ...data });
        onClose();
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            await onDelete(task.id);
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && task && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.22 }}
                        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6 z-50"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Edit Task
                            </h3>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            {/* Title */}
                            <div>
                                <label className="text-sm text-gray-700 font-medium block mb-1">
                                    Title
                                </label>
                                <Input
                                    {...register("title", { required: true })}
                                    placeholder="Task title"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-sm text-gray-700 font-medium block mb-1">
                                    Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    rows={3}
                                    placeholder="Add a short description..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500"
                                ></textarea>
                            </div>

                            {/* Priority + Assignee */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-700 font-medium block mb-1">
                                        Priority
                                    </label>
                                    <select
                                        {...register("priority")}
                                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm text-gray-700 font-medium block mb-1">
                                        Assignee
                                    </label>
                                    <select
                                        {...register("assignee_id")}
                                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="">Unassigned</option>
                                        {members?.map((member) => (
                                            <option
                                                key={member.id}
                                                value={member.id}
                                            >
                                                {member.username}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="text-sm text-gray-700 font-medium block mb-1">
                                    Status
                                </label>
                                <select
                                    {...register("status")}
                                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="todo">To Do</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between items-center pt-4">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="flex items-center gap-1 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                    >
                                        Cancel
                                    </button>
                                    <Button
                                        type="submit"
                                        className="px-5"
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EditTaskModal;
