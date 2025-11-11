import type { FormData } from "@models/formData";
import type { Errors } from "@models/errors";

export const validateStep1 = (formData: FormData): Errors => {
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

export const validateStep2 = (formData: FormData): Errors => {
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

  if (!formData.fechaNacimiento) {
    errors.fechaNacimiento = "La fecha de nacimiento es requerida";
  }

  if (!formData.numeroCelular) {
    errors.numeroCelular = "El número de celular es requerido";
  } else if (!/^\d{10}$/.test(formData.numeroCelular)) {
    errors.numeroCelular = "El número debe tener 10 dígitos";
  }

  return errors;
};

export const validateStep3 = (formData: FormData): Errors => {
  const errors: Errors = {};

  if (!formData.lugarResidencia) {
    errors.lugarResidencia = "El lugar de residencia es requerido";
  }

  if (!formData.grupoSanguineoId) {
    errors.grupoSanguineoId = "Seleccione su grupo sanguíneo";
  }

  if (!formData.estiloVidaId) {
    errors.estiloVidaId = "Seleccione su estilo de vida";
  }

  return errors;
};