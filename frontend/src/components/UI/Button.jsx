import React from "react";
import { cn } from "../../utils/cn"; // (helper — I'll include it below if you don't have it)

const VARIANTS = {
    primary:
        "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 focus:ring-indigo-500",
    secondary:
        "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700",
    danger:
        "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500",
    ghost:
        "bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800",
    outline:
        "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800",
};

const SIZES = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-5 py-2.5 text-base rounded-xl",
};

const Button = ({
    children,
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={cn(
                "inline-flex items-center justify-center font-medium select-none",
                "transition-all duration-200 focus:outline-none focus:ring-2",
                VARIANTS[variant],
                SIZES[size],
                disabled &&
                "opacity-60 cursor-not-allowed hover:none active:none",
                className
            )}
        >
            {children}
        </button>
    );
};

export default Button;
