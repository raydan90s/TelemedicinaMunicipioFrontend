// src/components/dashboard/CitaCard.tsx
import type { CitaDelDia } from '@services/citas.service';

interface CitaCardProps {
  cita: CitaDelDia;
  onClick: () => void;
}

export const CitaCard = ({ cita, onClick }: CitaCardProps) => {
  const fecha = new Date(cita.fecha_hora_inicio);
  const hora = fecha.toLocaleTimeString('es-EC', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const nombreCompleto = [
    cita.paciente_nombre,
    cita.paciente_segundo_nombre,
    cita.paciente_apellido,
    cita.paciente_segundo_apellido,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-white"
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="text-xl font-bold text-gray-800 min-w-[80px]">
          {hora}
        </div>
        
        <div className="h-8 w-px bg-gray-300"></div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{nombreCompleto}</h3>
          {cita.paciente_celular && (
            <p className="text-sm text-gray-500">{cita.paciente_celular}</p>
          )}
        </div>
      </div>

      <button className="px-6 py-2 border-2 border-gray-800 rounded-full font-medium hover:bg-gray-800 hover:text-white transition-colors">
        Detalles
      </button>
    </div>
  );
};