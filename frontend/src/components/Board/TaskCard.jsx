import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Flag, User } from "lucide-react";

const priorityColors = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
};

const TaskCard = ({ task, index, onClick }) => {
    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <div
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-3 shadow-sm hover:shadow-md cursor-pointer transition"
                    onClick={onClick}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {/* Title */}
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                        {task.title}
                    </h4>

                    {/* Description */}
                    {task.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                            {task.description}
                        </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1">
                            <Flag size={14} className={priorityColors[task.priority]} />
                            <span className="text-[10px] uppercase text-gray-500 dark:text-gray-400">
                                {task.priority}
                            </span>
                        </div>

                        {task.assignee && (
                            <div className="h-6 w-6 rounded-full bg-indigo-200 flex items-center justify-center text-[10px] font-bold text-indigo-800">
                                {task.assignee.username.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
