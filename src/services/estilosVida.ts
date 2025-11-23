import type { EstiloVida } from "@models/estiloVida";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const estilosVidaService = {
  async getAll(): Promise<EstiloVida[]> {
    const response = await fetch(`${API_URL}/estilos-vida`);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener estilos de vida");
    }

    return result.data;
  },
};