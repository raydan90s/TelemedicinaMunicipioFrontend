// src/components/dashboard/ModalHistoriaClinica.tsx
import { X } from 'lucide-react';
import type { HistoriaClinica } from '@services/pacientes.service';

interface ModalHistoriaClinicaProps {
  paciente: HistoriaClinica | null;
  onClose: () => void;
}

export const ModalHistoriaClinica = ({
  paciente,
  onClose,
}: ModalHistoriaClinicaProps) => {
  if (!paciente) return null;

  const calcularEdad = (fechaNacimiento: string) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const nombreCompleto = [
    paciente.primer_nombre,
    paciente.segundo_nombre,
    paciente.primer_apellido,
    paciente.segundo_apellido,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{nombreCompleto}</h2>
            <p className="text-gray-600">
              {calcularEdad(paciente.fecha_nacimiento)} años • {paciente.genero}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Información Personal */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Información Personal
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Cédula</p>
                <p className="font-semibold">{paciente.cedula}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold">{paciente.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-semibold">{paciente.numero_celular || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Grupo Sanguíneo</p>
                <p className="font-semibold">{paciente.grupo_sanguineo || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">País</p>
                <p className="font-semibold">{paciente.pais || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Residencia</p>
                <p className="font-semibold">{paciente.lugar_residencia || 'N/A'}</p>
              </div>
            </div>
          </section>

          {/* Enfermedades */}
          {paciente.enfermedades && paciente.enfermedades.length > 0 && (
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Enfermedades
              </h3>
              <div className="space-y-3">
                {paciente.enfermedades.map((enfermedad, index) => (
                  <div
                    key={index}
                    className="p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-red-900">
                          {enfermedad.enfermedad}
                        </h4>
                        <p className="text-sm text-red-700 mt-1">
                          Tipo: {enfermedad.tipo}
                        </p>
                      </div>
                    </div>
                    {enfermedad.detalle && (
                      <p className="text-sm text-gray-700 mt-2">
                        {enfermedad.detalle}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Consultas Previas */}
          {paciente.consultas_previas && paciente.consultas_previas.length > 0 && (
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Historial de Consultas
              </h3>
              <div className="space-y-3">
                {paciente.consultas_previas.map((consulta) => (
                  <div
                    key={consulta.cita_id}
                    className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm text-gray-600">
                          {new Date(consulta.fecha).toLocaleDateString('es-EC', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                        <p className="text-xs text-gray-500">
                          Dr. {consulta.medico_nombre} {consulta.medico_apellido}
                          {consulta.especialidad && ` • ${consulta.especialidad}`}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-semibold text-gray-700">
                          Motivo:
                        </p>
                        <p className="text-sm text-gray-900">
                          {consulta.motivo_cita}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700">
                          Diagnóstico:
                        </p>
                        <p className="text-sm text-gray-900">
                          {consulta.diagnostico}
                        </p>
                      </div>
                      {consulta.observaciones && (
                        <div>
                          <p className="text-xs font-semibold text-gray-700">
                            Observaciones:
                          </p>
                          <p className="text-sm text-gray-900">
                            {consulta.observaciones}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Documentos */}
          {paciente.documentos && paciente.documentos.length > 0 && (
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Documentos Médicos
              </h3>
              <div className="space-y-2">
                {paciente.documentos.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{doc.titulo}</p>
                      <p className="text-xs text-gray-500">{doc.tipo_documento}</p>
                    </div>
                    <span className="text-blue-600 text-sm font-medium">
                      Ver →
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};