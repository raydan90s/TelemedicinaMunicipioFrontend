export interface RegisterFormData {
  cedula: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  generoId: string;
  numeroCelular: string;
  
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterData {
  cedula: string;
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  genero_id: number;
  email: string;
  password: string;
  numero_celular?: string;
  roleCode: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  usuario: {
    id: number;
    email: string;
    cedula: string;
    primer_nombre: string;
    primer_apellido: string;
    verificado: boolean;
  };
  token: string;
}