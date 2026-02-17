"use client";

import React from "react";
import clsx from "clsx";

export default function Button({
    children,
    variant = "default",
    size = "md",
    className,
    ...props
}) {
    const base =
        "inline-flex items-center justify-center rounded-base font-medium transition-all duration-200 focus:outline-none";

    const variants = {
        default:
            "bg-primary text-primary-foreground hover:opacity-90",
        outline:
            "border border-border bg-card hover:bg-primary hover:text-primary-foreground",
        ghost:
            "bg-transparent hover:bg-card",
    };

    const sizes = {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
    };

    return (
        <button
            className={clsx(base, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
}
