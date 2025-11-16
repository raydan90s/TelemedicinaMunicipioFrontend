import { AlertCircle } from "lucide-react";

interface InputFieldProps {
    id: string;
    name: string;
    type: string;
    label: string;
    value: string;
    placeholder: string;
    required?: boolean;
    error?: string;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    autoComplete?: string;
}

export const InputField = ({
    id,
    name,
    type,
    label,
    value,
    placeholder,
    required,
    error,
    icon,
    rightIcon,
    onChange,
    onBlur,
    disabled = false,
    autoComplete,
}: InputFieldProps) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    className={`w-full ${icon ? "pl-10" : "pl-4"} ${rightIcon ? "pr-12" : "pr-4"} py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed ${error ? "border-red-500" : "border-gray-300"
                        }`}
                    placeholder={placeholder}
                />
                {rightIcon && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};