import { Lock, Eye, EyeOff } from "lucide-react";
import { InputField } from "@components/common/InputField";

interface PasswordInputProps {
    id: string;
    name: string;
    label: string;
    value: string;
    placeholder: string;
    error?: string;
    required?: boolean;
    showPassword: boolean;
    onToggleVisibility: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput = ({
    id,
    name,
    label,
    value,
    placeholder,
    error,
    required,
    showPassword,
    onToggleVisibility,
    onChange,
}: PasswordInputProps) => {
    return (
        <InputField
            id={id}
            name={name}
            type={showPassword ? "text" : "password"}
            label={label}
            value={value}
            placeholder={placeholder}
            error={error}
            required={required}
            onChange={onChange}
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            rightIcon={
                <button
                    type="button"
                    onClick={onToggleVisibility}
                    className="cursor-pointer text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
            }
        />
    );
};