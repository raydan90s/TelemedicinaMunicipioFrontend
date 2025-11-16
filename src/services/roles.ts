import type { Rol, RolCreate, RolUpdate } from "@models/roles";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const rolService = {
    async getAll(): Promise<Rol[]> {
        const response = await fetch(`${API_URL}/roles`);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al obtener roles");
        }

        return result.data;
    },

    async getById(id: number): Promise<Rol> {
        const response = await fetch(`${API_URL}/roles/${id}`);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al obtener el rol");
        }

        return result.data;
    },

    async create(data: RolCreate): Promise<Rol> {
        const response = await fetch(`${API_URL}/roles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al crear el rol");
        }

        return result.data;
    },

    async update(id: number, data: RolUpdate): Promise<Rol> {
        const response = await fetch(`${API_URL}/roles/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al actualizar el rol");
        }

        return result.data;
    },

    async delete(id: number): Promise<boolean> {
        const response = await fetch(`${API_URL}/roles/${id}`, {
            method: "DELETE",
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al eliminar el rol");
        }

        return true;
    }
};
