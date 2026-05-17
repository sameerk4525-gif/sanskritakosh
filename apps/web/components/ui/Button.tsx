"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

export function Button({
    variant = "primary",
    size = "md",
    children,
    className = "",
    ...props
}: ButtonProps) {
    const baseClasses = "font-ui font-medium rounded-lg transition active:scale-95";

    const variantClasses = {
        primary: "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-hover",
        secondary: "bg-accent text-white hover:bg-accent-dark",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    };

    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-3",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
