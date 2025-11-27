import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../UI/Input";
import Button from "../UI/Button";

const CreateTaskModal = ({
    isOpen,
    onClose,
    onCreate,
    initialStatus,
    members,
}) => {
    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        if (isOpen) {
            setValue("status", initialStatus);
        }
    }, [isOpen, initialStatus, setValue]);

    const onSubmit = async (data) => {
        await onCreate(data);
        reset();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
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
                                Create Task
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
                                <label className="text-sm font-medium text-gray-700 block mb-1">
                                    Title
                                </label>
                                <Input
                                    {...register("title", { required: true })}
                                    placeholder="Task title"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">
                                    Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    placeholder="Optional description..."
                                    rows="3"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500"
                                ></textarea>
                            </div>

                            {/* Priority + Assignee */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">
                                        Priority
                                    </label>
                                    <select
                                        {...register("priority")}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">
                                        Assignee
                                    </label>
                                    <select
                                        {...register("assignee_id")}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
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

                            {/* Hidden status */}
                            <input type="hidden" {...register("status")} />

                            {/* Footer Buttons */}
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                >
                                    Cancel
                                </button>

                                <Button type="submit" className="px-5">
                                    Create Task
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CreateTaskModal;
