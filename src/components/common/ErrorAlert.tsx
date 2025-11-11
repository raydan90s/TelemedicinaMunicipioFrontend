import { AlertCircle } from "lucide-react";

interface ErrorAlertProps {
    message: string;
}

export const ErrorAlert = ({ message }: ErrorAlertProps) => {
    if (!message) return null;

    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <span className="text-red-700 text-sm">{message}</span>
        </div>
    );
};