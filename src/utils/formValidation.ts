import type { Errors } from "@models/errors";
import type { RegisterFormData } from "@models/register";

export const validateStep1 = (formData: RegisterFormData): Errors => {
  const errors: Errors = {};

  if (!formData.cedula) {
    errors.cedula = "La cédula es requerida";
  } else if (!/^\d{10}$/.test(formData.cedula)) {
    errors.cedula = "La cédula debe tener 10 dígitos";
  }

  if (!formData.email) {
    errors.email = "El correo electrónico es requerido";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Ingrese un correo electrónico válido";
  }

  if (!formData.password) {
    errors.password = "La contraseña es requerida";
  } else if (formData.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Confirme su contraseña";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
};

export const validateStep2 = (formData: RegisterFormData): Errors => {
  const errors: Errors = {};

  if (!formData.primerNombre) {
    errors.primerNombre = "El primer nombre es requerido";
  }

  if (!formData.primerApellido) {
    errors.primerApellido = "El primer apellido es requerido";
  }

  if (!formData.generoId) {
    errors.generoId = "Seleccione un género";
  }

  if (!formData.numeroCelular) {
    errors.numeroCelular = "El número de celular es requerido";
  } else if (!/^\d{10}$/.test(formData.numeroCelular)) {
    errors.numeroCelular = "El número debe tener 10 dígitos";
  }

  return errors;
};