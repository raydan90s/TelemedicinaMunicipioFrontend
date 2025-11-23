import { AlertCircle } from "lucide-react";

interface CheckboxFieldProps {
    id: string;
    name: string;
    label: string;
    checked: boolean;
    onChange: () => void;
    error?: string;
}

export const CheckboxField = ({
    id,
    name,
    label,
    checked,
    onChange,
    error,
}: CheckboxFieldProps) => {
    return (
        <div>
            <label htmlFor={id} className="flex items-center">
                <input
                    type="checkbox"
                    id={id}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${
                        error ? "border-red-500" : ""
                    }`}
                />
                <span className="ml-2 text-gray-700">{label}</span>
            </label>
            {error && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};