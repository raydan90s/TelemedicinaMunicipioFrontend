interface ButtonProps {
    type?: "button" | "submit" | "reset";
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    isLoading?: boolean;
    fullWidth?: boolean;
    variant?: "primary" | "secondary" | "outline";
    children: React.ReactNode;
    className?: string;
}

export const Button = ({
    type = "button",
    onClick,
    disabled = false,
    isLoading = false,
    fullWidth = false,
    variant = "primary",
    children,
    className = "",
}: ButtonProps) => {
    const baseStyles = "py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
    
    const variantStyles = {
        primary: "bg-secondary text-white hover:bg-secondary-hover",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    };

    const widthStyles = fullWidth ? "w-full" : "";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
        >
            {isLoading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Cargando...</span>
                </>
            ) : (
                children
            )}
        </button>
    );
};