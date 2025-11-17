// src/components/dashboard/CitaCard.tsx
import { Check } from 'lucide-react';
import type { CitaDelDia } from '@services/citas.service';

interface CitaCardProps {
  cita: CitaDelDia;
  onClick: () => void;
  completada?: boolean;
  onMarcarCompletada?: () => void;
  showCompletarButton?: boolean;
}

export const CitaCard = ({ 
  cita, 
  onClick, 
  completada = false,
  onMarcarCompletada,
  showCompletarButton = false
}: CitaCardProps) => {
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
    <div className="bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all">
      {/* Contenedor clickeable para ver detalles */}
      <div 
        onClick={onClick}
        className="p-4 cursor-pointer"
      >
        <div className="flex items-center justify-between">
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

          {/* Badge de estado (solo si está completada) */}
          {completada && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-900 text-white text-xs font-semibold rounded-full">
              <Check className="w-3 h-3" />
              Completada
            </span>
          )}
        </div>
      </div>

      {/* Botones (solo en citas programadas) */}
      {showCompletarButton && onMarcarCompletada && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex gap-2">
          <button
            onClick={onClick}
            className="flex-1 px-4 py-2 border-2 border-gray-800 text-gray-800 rounded-full font-medium hover:bg-gray-800 hover:text-white transition-colors"
          >
            Detalles
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('¿Marcar esta cita como completada?')) {
                onMarcarCompletada();
              }
            }}
            className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Completar
          </button>
        </div>
      )}

      {/* Solo botón de detalles en citas completadas */}
      {completada && !showCompletarButton && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100">
          <button
            onClick={onClick}
            className="w-full px-4 py-2 border-2 border-gray-800 text-gray-800 rounded-full font-medium hover:bg-gray-800 hover:text-white transition-colors"
          >
            Ver Detalles
          </button>
        </div>
      )}
    </div>
  );
};