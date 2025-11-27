import React from "react";
import { cn } from "../../utils/cn";

const Select = React.forwardRef(
    ({ label, error, description, className = "", children, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}

                <select
                    ref={ref}
                    {...props}
                    className={cn(
                        "w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm",
                        "focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
                        "transition-all duration-200",
                        error &&
                        "border-red-500 focus:ring-red-500 focus:border-red-500",
                        className
                    )}
                >
                    {children}
                </select>

                {description && !error && (
                    <p className="text-xs text-gray-500 mt-1">{description}</p>
                )}
                {error && (
                    <p className="text-xs text-red-600 mt-1 font-medium">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

export default Select;
