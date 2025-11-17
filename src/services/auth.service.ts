import type { LoginData, LoginResponse } from "@models/login";
import type { RegisterData, RegisterResponse } from "@models/register";

const API_URL = import.meta.env.VITE_API_BASE_URL;

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
        if ('roles' in data) {
            localStorage.setItem('roles', JSON.stringify(data.roles));
        }
    },

    clearSession() {
        localStorage.removeItem('token');
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
};