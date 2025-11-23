import type { Errors } from "@models/errors";
import type { RegisterFormData } from "@models/register";

interface ProfileCompletionFormData {
  fecha_nacimiento: string;
  pais_id: string;
  lugar_residencia: string;
  grupo_sanguineo_id: string;
  estilo_vida_id: string;
}

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

export const validateProfileStep2 = (formData: ProfileCompletionFormData): Errors => {
  const errors: Errors = {};

  if (!formData.fecha_nacimiento) {
    errors.fecha_nacimiento = "La fecha de nacimiento es requerida";
  } else {
    const birthDate = new Date(formData.fecha_nacimiento);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 0 || age > 150) {
      errors.fecha_nacimiento = "Ingrese una fecha de nacimiento válida";
    }
  }

  if (!formData.pais_id) {
    errors.pais_id = "Seleccione un país";
  }

  if (!formData.lugar_residencia) {
    errors.lugar_residencia = "El lugar de residencia es requerido";
  } else if (formData.lugar_residencia.trim().length < 3) {
    errors.lugar_residencia = "El lugar de residencia debe tener al menos 3 caracteres";
  }

  if (!formData.grupo_sanguineo_id) {
    errors.grupo_sanguineo_id = "Seleccione un grupo sanguíneo";
  }

  if (!formData.estilo_vida_id) {
    errors.estilo_vida_id = "Seleccione un estilo de vida";
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