interface LoginData {
    identifier: string;
    password: string;
}

interface LoginResponse {
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
    message?: string;
}

interface RegisterData {
    cedula: string;
    email: string;
    password: string;
    primer_nombre: string;
    segundo_nombre?: string;
    primer_apellido: string;
    segundo_apellido?: string;
    genero_id: number;
    tipo_usuario: 'paciente' | 'medico';
    // Datos de paciente
    fecha_nacimiento?: string;
    numero_celular?: string;
    pais_id?: number;
    lugar_residencia?: string;
    grupo_sanguineo_id?: number;
    estilo_vida_id?: number;
    // Datos de médico
    licencia_medica?: string;
    pasaporte?: string;
    especialidades?: number[];
}

interface RegisterResponse {
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

const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
    async login(data: LoginData): Promise<LoginResponse> {
        const response = await fetch(`${API_URL}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Error al iniciar sesión');
        }

        return result;
    },

    async register(data: RegisterData): Promise<RegisterResponse> {
        const response = await fetch(`${API_URL}/usuarios/registro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Error al registrar usuario');
        }

        return result;
    },

    async verifyToken(token: string) {
        const response = await fetch(`${API_URL}/usuarios/token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Token inválido o expirado');
        }

        return await response.json();
    },

    saveSession(data: LoginResponse | RegisterResponse) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        if ('roles' in data) {
            localStorage.setItem('roles', JSON.stringify(data.roles));
        }
    },

    clearSession() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('roles');
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    },

    getUserRoles(): string[] {
        const rolesData = localStorage.getItem('roles');
        if (!rolesData) return [];
        
        try {
            const roles = JSON.parse(rolesData);
            return Object.keys(roles);
        } catch {
            return [];
        }
    },

    getUser() {
        const userData = localStorage.getItem('usuario');
        if (!userData) return null;
        
        try {
            return JSON.parse(userData);
        } catch {
            return null;
        }
    }
};