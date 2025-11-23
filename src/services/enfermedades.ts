import type { Enfermedad } from "@models/enfermedad";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const enfermedadesService = {
  async getAll(): Promise<Enfermedad[]> {
    const response = await fetch(`${API_URL}/enfermedades`);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener enfermedades");
    }

    return result.data;
  },
};