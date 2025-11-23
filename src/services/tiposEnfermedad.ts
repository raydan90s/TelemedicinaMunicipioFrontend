import type { TipoEnfermedad } from "@models/tipoEnfermedad";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const tiposEnfermedadService = {
  async getAll(): Promise<TipoEnfermedad[]> {
    const response = await fetch(`${API_URL}/tipos-enfermedad`);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener tipos de enfermedad");
    }

    return result.data;
  },
};