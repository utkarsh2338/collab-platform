import React from "react";
import { cn } from "../../utils/cn"; // add cn helper if not added already

const VARIANTS = {
    default:
        "bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow",
    subtle:
        "bg-white border border-gray-100 shadow-sm",
    bordered:
        "bg-white border-2 border-gray-200 shadow-none",
    hover:
        "bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer",
    ghost:
        "bg-transparent border border-transparent shadow-none",
};

const SIZES = {
    none: "p-0",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
};

const Card = ({
    children,
    className = "",
    as: Component = "div",
    variant = "default",
    size = "md",
    ...props
}) => {
    return (
        <Component
            className={cn(
                "rounded-xl transition-all duration-200 bg-white",
                VARIANTS[variant],
                SIZES[size],
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Card;
