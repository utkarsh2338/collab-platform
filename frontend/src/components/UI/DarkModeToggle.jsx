import React from "react";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");

        const isDark = document.documentElement.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    return (
        <button
            onClick={toggleTheme}
            className="absolute top-4 right-4 p-2 rounded-full 
                       bg-gray-100 dark:bg-slate-800 
                       text-gray-700 dark:text-gray-200 
                       shadow-sm hover:shadow-md transition"
        >
            {document.documentElement.classList.contains("dark") ? (
                <Sun size={20} />
            ) : (
                <Moon size={20} />
            )}
        </button>
    );
};

export default DarkModeToggle;
