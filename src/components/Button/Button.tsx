import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    variant?: "contained" | "outlined";
    color?: "primary" | "secondary";
}

function Button({
    className = "",
    variant = "contained",
    color = "primary",
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={[
                "w-fit rounded-[0.25em] px-3.5 py-2",
                variant === "contained" && "bg-blue-700",
                variant === "contained" && "hover:bg-blue-800",
                variant === "contained" && "text-white",
                "transition-colors",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className ?? "",
            ].join(" ")}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
