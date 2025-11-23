import type { PacienteEnfermedad, PacienteEnfermedadForm } from "@models/pacienteEnfermedad";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const pacientesEnfermedadesService = {
  async getByPaciente(): Promise<PacienteEnfermedad[]> {
    const response = await fetch(`${API_URL}/pacientes/enfermedades`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener enfermedades del paciente");
    }

    return result.data;
  },

  async updateForPaciente(enfermedades: PacienteEnfermedadForm[]): Promise<void> {
    const response = await fetch(`${API_URL}/pacientes/enfermedades`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ enfermedades }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al actualizar enfermedades del paciente");
    }
  },
};