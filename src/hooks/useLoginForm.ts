import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLoginForm, getEmailError, getPasswordError, type LoginFormErrors } from "@utils/validation";
import { authService } from "@services/auth.service";
//AQUI DEBE SER CONTEXT EN LUGAR DE SERVICE

interface FormData {
    email: string;
    password: string;
}

export const useLoginForm = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            if (name === "email") {
                setErrors(prev => ({ ...prev, email: getEmailError(value) }));
            } else if (name === "password") {
                setErrors(prev => ({ ...prev, password: getPasswordError(value, 6) }));
            }
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));

        if (name === "email") {
            setErrors(prev => ({ ...prev, email: getEmailError(formData.email) }));
        } else if (name === "password") {
            setErrors(prev => ({ ...prev, password: getPasswordError(formData.password, 6) }));
        }
    };

    const validateForm = (): boolean => {
        setTouched({ email: true, password: true });
        const validationErrors = validateLoginForm(formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            const data = await authService.login({
                identifier: formData.email,
                password: formData.password,
            });

            authService.saveSession(data);

            const roles = Object.keys(data.roles);
            if (roles.includes("Médico")) navigate("/dashboard-medico");
            else if (roles.includes("Paciente")) navigate("/dashboard-paciente");
            else navigate("/dashboard");
        } catch (error) {
            console.error("Error en login:", error);
            setErrors({
                submit: error instanceof Error
                    ? error.message
                    : "Error al iniciar sesión. Intente nuevamente.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    return {
        formData,
        errors,
        showPassword,
        isLoading,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        togglePasswordVisibility,
    };
};
