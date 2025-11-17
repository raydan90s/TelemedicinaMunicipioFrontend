export interface Rol {
  id: number;
  nombre: string;
  descripcion?: string;
  code: string;
}

export interface RolCreate {
  nombre: string;
  descripcion?: string;
  code: string;
}

export interface RolUpdate {
  nombre?: string;
  descripcion?: string;
  code?: string;
}