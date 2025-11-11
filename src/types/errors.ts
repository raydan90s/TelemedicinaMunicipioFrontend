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