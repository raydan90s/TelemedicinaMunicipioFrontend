import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '@services/auth.service';
import type { RegisterData } from '@models/register';
import type { Usuario } from '@models/usuario';

interface AuthContextType {
    usuario: Usuario | null;
    roles: string[];
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (identifier: string, password: string) => Promise<Usuario>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    hasRole: (role: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [roles, setRoles] = useState<string[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
                    authService.clearSession();
                }
            }            
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (identifier: string, password: string): Promise<Usuario> => {
        try {
            const response = await authService.login({ identifier, password });
            authService.saveSession(response);
            setUsuario(response.usuario);
            setRoles(Object.keys(response.roles));
            setToken(response.token);
            return response.usuario;
        } catch (error) {
            throw error;
        }
    };

    const register = async (data: RegisterData) => {
        try {
            await authService.register(data);
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