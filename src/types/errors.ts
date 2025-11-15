export interface Errors {
  cedula?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  primerNombre?: string;
  segundoNombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  generoId?: string;
  fechaNacimiento?: string;
  numeroCelular?: string;
  lugarResidencia?: string;
  grupoSanguineoId?: string;
  estiloVidaId?: string;
  submit?: string;
  [key: string]: string | undefined; 
}

export interface RegisterFormErrors {
    cedula?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    primer_nombre?: string;
    primer_apellido?: string;
    fecha_nacimiento?: string;
    numero_celular?: string;
    submit?: string;
}

export interface LoginFormErrors {
    email?: string;
    password?: string;
    submit?: string;
}
