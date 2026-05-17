"use client";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "accent" | "success" | "error";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
    const variantClasses = {
        default: "bg-accent-light text-primary",
        accent: "bg-accent text-white",
        success: "bg-green-100 text-green-800",
        error: "bg-red-100 text-error",
    };

    return (
        <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-ui font-semibold ${variantClasses[variant]}`}
        >
            {children}
        </span>
    );
}
