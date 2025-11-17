import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLoginForm, getEmailError, getPasswordError } from "@utils/validation";
import type { LoginFormErrors } from "@models/errors";
import useAuth from "./useAuth";

export const useLoginForm = () => {
    const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const { login } = useAuth();

    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const fieldName = name === 'email' ? 'identifier' : name;
        setFormData(prev => ({ ...prev, [fieldName]: value }));

        if (touched[fieldName]) {
            if (fieldName === "identifier") {
                setErrors(prev => ({ ...prev, email: getEmailError(value) }));
            } else if (fieldName === "password") {
                setErrors(prev => ({ ...prev, password: getPasswordError(value, 6) }));
            }
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        const fieldName = name === 'email' ? 'identifier' : name;
        setTouched(prev => ({ ...prev, [fieldName]: true }));

        if (fieldName === "identifier") {
            setErrors(prev => ({ ...prev, email: getEmailError(formData.identifier) }));
        } else if (fieldName === "password") {
            setErrors(prev => ({ ...prev, password: getPasswordError(formData.password, 6) }));
        }
    };

    const validateForm = (): boolean => {
        setTouched({ identifier: true, password: true });
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
            const userData = await login(formData.identifier, formData.password);
            
            if (!userData.verificado) {
                setErrors({
                    submit: "Su cuenta no ha sido verificada. Por favor, revise su correo electrónico para verificar su cuenta.",
                });
                setIsLoading(false);
                return;
            }

            setIsRedirecting(true);

            const userRoles = JSON.parse(localStorage.getItem('roles') || '{}');
            const roles = Object.keys(userRoles);

            setTimeout(() => {
                if (roles.includes("Médico")) {
                    navigate("/dashboard");
                } else if (roles.includes("Paciente")) {
                    navigate("/dashboard-paciente");
                } else {
                    navigate("/dashboard");
                }
            }, 1000);
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
        isRedirecting, 
    };
};