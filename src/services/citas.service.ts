// src/services/citas.service.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface CitaDelDia {
  id: number;
  fecha_hora_inicio: string;
  fecha_hora_fin: string;
  estado: string;
  estado_id: number;
  paciente_nombre: string;
  paciente_segundo_nombre?: string;
  paciente_apellido: string;
  paciente_segundo_apellido?: string;
  paciente_id: number;
  paciente_celular: string;
}

export interface CitasResponse {
  success: boolean;
  data: CitaDelDia[];
  count: number;
}

export const citasService = {
  // Obtener citas del día actual
  obtenerCitasDelDia: async (medicoId: number): Promise<CitaDelDia[]> => {
    try {
      const response = await axios.get<CitasResponse>(
        `${API_URL}/citas/medico/${medicoId}/hoy`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error al obtener citas del día:', error);
      throw error;
    }
  },

  // Obtener citas futuras
  obtenerCitasFuturas: async (medicoId: number): Promise<CitaDelDia[]> => {
    try {
      const response = await axios.get<CitasResponse>(
        `${API_URL}/citas/medico/${medicoId}/futuras`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error al obtener citas futuras:', error);
      throw error;
    }
  },

  // Obtener citas por fecha
  obtenerCitasPorFecha: async (
    medicoId: number,
    fecha: string
  ): Promise<CitaDelDia[]> => {
    try {
      const response = await axios.get<CitasResponse>(
        `${API_URL}/citas/medico/${medicoId}/fecha/${fecha}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error al obtener citas por fecha:', error);
      throw error;
    }
  },

  // Marcar cita como completada
  marcarComoAtendida: async (citaId: number): Promise<void> => {
    try {
      await axios.patch(`${API_URL}/citas/${citaId}/atender`);
    } catch (error) {
      console.error('Error al marcar cita como atendida:', error);
      throw error;
    }
  },
};