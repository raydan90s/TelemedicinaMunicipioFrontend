import type { Genero, GeneroCreate, GeneroUpdate } from "@models/genero";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const generoService = {
    async getAll(): Promise<Genero[]> {
        const response = await fetch(`${API_URL}/genero`);

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al obtener géneros");
        }

        return result.data;
    },

    async getById(id: number): Promise<Genero> {
        const response = await fetch(`${API_URL}/generos/${id}`);

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al obtener el género");
        }

        return result.data;
    },

    async create(data: GeneroCreate): Promise<Genero> {
        const response = await fetch(`${API_URL}/generos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al crear el género");
        }

        return result.data;
    },

    async update(id: number, data: GeneroUpdate): Promise<Genero> {
        const response = await fetch(`${API_URL}/generos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al actualizar el género");
        }

        return result.data;
    },

    async delete(id: number): Promise<boolean> {
        const response = await fetch(`${API_URL}/generos/${id}`, {
            method: "DELETE",
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al eliminar el género");
        }

        return true;
    }
};
