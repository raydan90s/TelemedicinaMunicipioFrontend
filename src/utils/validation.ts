import type { LoginData } from "@models/login";
import type { RegisterFormData } from "@models/register";
import type { RegisterFormErrors, LoginFormErrors } from "@models/errors";

export const isFieldEmpty = (value: string): boolean => {
    return !value || value.trim() === "";
};

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string, minLength: number = 6): boolean => {
    return password.length >= minLength;
};

export const validateCedula = (cedula: string): boolean => {
    const cedulaRegex = /^\d{10}$/;
    if (!cedulaRegex.test(cedula)) return false;

    const digits = cedula.split('').map(Number);
    const province = parseInt(cedula.substring(0, 2));
    
    if (province < 1 || province > 24) return false;

    const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let sum = 0;

    for (let i = 0; i < 9; i++) {
        let value = digits[i] * coefficients[i];
        if (value >= 10) value -= 9;
        sum += value;
    }

    const verifier = sum % 10 === 0 ? 0 : 10 - (sum % 10);
    return verifier === digits[9];
};

export const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^09\d{8}$/;
    return phoneRegex.test(phone);
};

export const validateStrongPassword = (password: string): {
    isValid: boolean;
    errors: string[];
} => {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push("Debe tener al menos 8 caracteres");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("Debe contener al menos una mayúscula");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("Debe contener al menos una minúscula");
    }
    if (!/[0-9]/.test(password)) {
        errors.push("Debe contener al menos un número");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Debe contener al menos un carácter especial");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateDateOfBirth = (date: string): boolean => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    return age >= 18 && age <= 120;
};

export const getEmailError = (email: string): string | undefined => {
    if (isFieldEmpty(email)) {
        return "El correo electrónico es requerido";
    }
    if (!validateEmail(email)) {
        return "Ingrese un correo electrónico válido";
    }
    return undefined;
};

export const getPasswordError = (password: string, minLength: number = 6): string | undefined => {
    if (isFieldEmpty(password)) {
        return "La contraseña es requerida";
    }
    if (!validatePassword(password, minLength)) {
        return `La contraseña debe tener al menos ${minLength} caracteres`;
    }
    return undefined;
};

export const getCedulaError = (cedula: string): string | undefined => {
    if (isFieldEmpty(cedula)) {
        return "La cédula es requerida";
    }
    if (!validateCedula(cedula)) {
        return "Ingrese una cédula válida";
    }
    return undefined;
};

export const getPhoneError = (phone: string, required: boolean = false): string | undefined => {
    if (isFieldEmpty(phone)) {
        return required ? "El número de celular es requerido" : undefined;
    }
    if (!validatePhoneNumber(phone)) {
        return "Ingrese un número de celular válido (ej: 0987654321)";
    }
    return undefined;
};

export const getRequiredFieldError = (value: string, fieldName: string): string | undefined => {
    if (isFieldEmpty(value)) {
        return `${fieldName} es requerido`;
    }
    return undefined;
};

export const getConfirmPasswordError = (password: string, confirmPassword: string): string | undefined => {
    if (isFieldEmpty(confirmPassword)) {
        return "Confirme su contraseña";
    }
    if (password !== confirmPassword) {
        return "Las contraseñas no coinciden";
    }
    return undefined;
};

export const validateLoginForm = (data: LoginData): LoginFormErrors => {
    const errors: LoginFormErrors = {};

    const emailError = getEmailError(data.identifier);
    const passwordError = getPasswordError(data.password, 6);

    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return errors;
};


export const validateRegisterForm = (data: RegisterFormData): RegisterFormErrors => {
    const errors: RegisterFormErrors = {};

    const cedulaError = getCedulaError(data.cedula);
    const emailError = getEmailError(data.email);
    const passwordError = getPasswordError(data.password, 8);
    const confirmPasswordError = getConfirmPasswordError(data.password, data.confirmPassword);
    const primerNombreError = getRequiredFieldError(data.primerNombre, "El primer nombre");
    const primerApellidoError = getRequiredFieldError(data.primerApellido, "El primer apellido");

    if (cedulaError) errors.cedula = cedulaError;
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
    if (primerNombreError) errors.primer_nombre = primerNombreError;
    if (primerApellidoError) errors.primer_apellido = primerApellidoError;

    if (data.numeroCelular) {
        const phoneError = getPhoneError(data.numeroCelular, false);
        if (phoneError) errors.numero_celular = phoneError;
    }

    return errors;
};