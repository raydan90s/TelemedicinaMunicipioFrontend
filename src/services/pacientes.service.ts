// src/services/pacientes.service.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface Enfermedad {
  enfermedad: string;
  tipo: string;
  detalle: string;
}

export interface ConsultaPrevia {
  cita_id: number;
  fecha: string;
  motivo_cita: string;
  diagnostico: string;
  observaciones: string;
  medico_nombre: string;
  medico_apellido: string;
  especialidad?: string;
}

export interface Documento {
  id: number;
  titulo: string;
  url: string;
  fecha_hora_subida: string;
  tipo_documento: string;
}

export interface HistoriaClinica {
  id: number;
  cedula: string;
  email: string;
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  genero: string;
  fecha_nacimiento: string;
  numero_celular: string;
  pais: string;
  lugar_residencia: string;
  grupo_sanguineo: string;
  estilo_vida: string;
  enfermedades: Enfermedad[];
  consultas_previas: ConsultaPrevia[];
  documentos: Documento[];
}

export interface HistoriaClinicaResponse {
  success: boolean;
  data: HistoriaClinica;
}

export const pacientesService = {
  // Obtener historia clínica completa
  obtenerHistoriaClinica: async (
    pacienteId: number
  ): Promise<HistoriaClinica> => {
    try {
      const response = await axios.get<HistoriaClinicaResponse>(
        `${API_URL}/pacientes/${pacienteId}/historia`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error al obtener historia clínica:', error);
      throw error;
    }
  },
};