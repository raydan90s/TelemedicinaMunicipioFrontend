import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '@services/auth.service';

interface Usuario {
    id: number;
    email: string;
    cedula: string;
    primer_nombre: string;
    primer_apellido: string;
    verificado: boolean;
}

interface AuthContextType {
    usuario: Usuario | null;
    roles: string[];
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (identifier: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    hasRole: (role: string) => boolean;
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
    fecha_nacimiento?: string;
    numero_celular?: string;
    pais_id?: number;
    lugar_residencia?: string;
    grupo_sanguineo_id?: number;
    estilo_vida_id?: number;
    licencia_medica?: string;
    pasaporte?: string;
    especialidades?: number[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [roles, setRoles] = useState<string[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Verificar sesión al cargar
    useEffect(() => {
        const initAuth = async () => {
            const storedToken = authService.getToken();
            
            if (storedToken) {
                try {
                    const response = await authService.verifyToken(storedToken);
                    setUsuario(response.usuario);
                    setRoles(response.roles ? Object.keys(response.roles) : []);
                    setToken(storedToken);
                } catch (error) {
                    // Token inválido, limpiar sesión
                    authService.clearSession();
                }
            }
            
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (identifier: string, password: string) => {
        try {
            const response = await authService.login({ identifier, password });
            
            authService.saveSession(response);
            setUsuario(response.usuario);
            setRoles(Object.keys(response.roles));
            setToken(response.token);
        } catch (error) {
            throw error;
        }
    };

    const register = async (data: RegisterData) => {
        try {
            const response = await authService.register(data);
            
            authService.saveSession(response);
            setUsuario(response.usuario);
            // El backend devuelve roles basado en tipo_usuario
            const userRoles = data.tipo_usuario === 'medico' ? ['Médico'] : ['Paciente'];
            setRoles(userRoles);
            setToken(response.token);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authService.clearSession();
        setUsuario(null);
        setRoles([]);
        setToken(null);
    };

    const hasRole = (role: string): boolean => {
        return roles.includes(role);
    };

    const value: AuthContextType = {
        usuario,
        roles,
        token,
        isAuthenticated: !!usuario,
        isLoading,
        login,
        register,
        logout,
        hasRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};