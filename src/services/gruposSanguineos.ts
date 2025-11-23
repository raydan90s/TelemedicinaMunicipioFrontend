import type { GrupoSanguineo } from "@models/grupoSanguineo";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const gruposSanguineosService = {
  async getAll(): Promise<GrupoSanguineo[]> {
    const response = await fetch(`${API_URL}/grupos-sanguineos`);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener grupos sanguíneos");
    }

    return result.data;
  },
};