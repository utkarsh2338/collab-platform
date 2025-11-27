import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";

const Column = ({ title, status, tasks, onAddTask, onTaskClick }) => {
    return (
        <div className="w-80 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
                    {title}
                </h3>

                <button
                    onClick={() => onAddTask(status)}
                    className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                    <Plus size={18} />
                </button>
            </div>

            {/* Droppable Area */}
            <Droppable droppableId={status}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3"
                    >
                        {tasks.map((task, index) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                index={index}
                                onClick={() => onTaskClick(task)}
                            />
                        ))}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
