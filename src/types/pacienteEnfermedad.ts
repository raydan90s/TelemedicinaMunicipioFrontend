export interface PacienteEnfermedad {
  paciente_id: number;
  enfermedad_id: number;
  tipo_enfermedad_id: number;
  detalle?: string;
  enfermedad_nombre?: string;
  tipo_enfermedad_nombre?: string;
}

export interface PacienteEnfermedadForm {
  enfermedad_id: number;
  tipo_enfermedad_id: number;
  detalle?: string;
}