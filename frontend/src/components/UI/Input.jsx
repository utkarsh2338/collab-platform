import React from "react";
import { cn } from "../../utils/cn";

const Input = React.forwardRef(
    (
        {
            label,
            description,
            error,
            icon: Icon,
            rightIcon: RightIcon,
            variant = "default",
            size = "md",
            className = "",
            ...props
        },
        ref
    ) => {
        const variants = {
            default:
                "bg-white border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
            subtle:
                "bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-400",
            underline:
                "bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-1 focus:ring-indigo-500",
        };

        const sizes = {
            sm: "px-3 py-2 text-sm",
            md: "px-4 py-2.5 text-sm",
            lg: "px-5 py-3 text-base",
        };

        return (
            <div className="w-full">
                {/* Label */}
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}

                <div className="relative w-full">
                    {/* Left Icon */}
                    {Icon && (
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                            <Icon size={18} />
                        </div>
                    )}

                    {/* Input element */}
                    <input
                        ref={ref}
                        {...props}
                        className={cn(
                            "w-full rounded-lg outline-none transition-all duration-200",
                            "text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900",
                            variants[variant],
                            sizes[size],
                            Icon && "pl-10",
                            RightIcon && "pr-10",
                            error &&
                            "border-red-500 focus:ring-red-500 focus:border-red-500",
                            props.disabled &&
                            "opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800",
                            className
                        )}
                    />

                    {/* Right Icon */}
                    {RightIcon && (
                        <button
                            type="button"
                            tabIndex={-1}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-500"
                        >
                            <RightIcon size={18} />
                        </button>
                    )}
                </div>

                {/* Description */}
                {description && !error && (
                    <p className="text-xs text-gray-500 mt-1">{description}</p>
                )}

                {/* Error Message */}
                {error && (
                    <p className="text-xs text-red-600 mt-1 font-medium">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

export default Input;
