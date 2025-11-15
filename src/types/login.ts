export interface LoginData {
    identifier: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    usuario: {
        id: number;
        email: string;
        cedula: string;
        primer_nombre: string;
        primer_apellido: string;
        verificado: boolean;
    };
    roles: Record<string, string[]>;
    token: string;
}