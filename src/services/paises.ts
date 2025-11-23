import type { Pais } from "@models/pais";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const paisesService = {
  async getAll(): Promise<Pais[]> {
    const response = await fetch(`${API_URL}/paises`);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener países");
    }

    return result.data;
  },
};