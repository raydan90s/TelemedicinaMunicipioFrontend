export interface Genero {
    id: number;
    nombre: string;
    codigo?: string | null;
}

export interface GeneroCreate {
    nombre: string;
    codigo?: string | null;
}

export interface GeneroUpdate {
    nombre?: string;
    codigo?: string | null;
}