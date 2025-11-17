// src/pages/DashboardMedico.tsx (o DoctorDashboard.tsx)
import { useEffect, useState } from 'react';
import { Calendar, User, Settings } from 'lucide-react';
import useAuth from '@hooks/useAuth';
import { citasService, type CitaDelDia } from '@services/citas.service';
import { pacientesService, type HistoriaClinica } from '@services/pacientes.service';
import { CitaCard } from '@components/dashboard/CitaCard';
import { ModalHistoriaClinica } from '@components/dashboard/ModalHistoriaClinica';

const DoctorDashboard = () => {
  const { usuario } = useAuth();
  const [citasHoy, setCitasHoy] = useState<CitaDelDia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<HistoriaClinica | null>(null);
  const [loadingPaciente, setLoadingPaciente] = useState(false);

  // Contador de consultas atendidas (simulado por ahora)
  const consultasAtendidas = citasHoy.filter(c => c.estado === 'Completada').length;

  useEffect(() => {
    if (usuario?.id) {
      cargarCitasDelDia();
    }
  }, [usuario]);

  const cargarCitasDelDia = async () => {
    if (!usuario?.id) return;

    try {
      setLoading(true);
      setError(null);
      
      // Obtener citas del día
      const citas = await citasService.obtenerCitasDelDia(usuario.id);
      setCitasHoy(citas);
      
      console.log('✅ Citas cargadas:', citas);
    } catch (err) {
      console.error('❌ Error al cargar citas:', err);
      setError('Error al cargar las citas del día');
    } finally {
      setLoading(false);
    }
  };

  const handleClickCita = async (cita: CitaDelDia) => {
    try {
      setLoadingPaciente(true);
      console.log('🔍 Cargando historia clínica del paciente:', cita.paciente_id);
      
      const historia = await pacientesService.obtenerHistoriaClinica(cita.paciente_id);
      setPacienteSeleccionado(historia);
      
      console.log('✅ Historia clínica cargada:', historia);
    } catch (err) {
      console.error('❌ Error al cargar historia clínica:', err);
      alert('Error al cargar la información del paciente');
    } finally {
      setLoadingPaciente(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 text-lg font-semibold">
            Cargando dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Layout con sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <div className="mb-8">
            <h2 className="font-bold text-xl mb-1">Tu Salud en Línea</h2>
            <p className="text-sm text-gray-500">Municipalidad de Guayaquil</p>
          </div>

          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-lg font-medium text-gray-900">
              <span className="text-xl">⊞</span>
              Inicio
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg font-medium text-gray-600">
              <Calendar className="w-5 h-5" />
              Mis consultas
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg font-medium text-gray-600">
              <User className="w-5 h-5" />
              Perfil Profesional
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg font-medium text-gray-600">
              <Settings className="w-5 h-5" />
              Ajustes
            </button>
          </nav>

          <div className="mt-auto pt-8">
            <p className="text-xs text-gray-400">
              Municipio de Guayaquil 2025
            </p>
            <p className="text-xs text-gray-400">Todos los derechos reservados</p>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bienvenida, Dra. {usuario?.primer_nombre}
            </h1>
            <p className="text-gray-600">¿Cómo podemos ayudarte hoy?</p>
          </div>

          {/* Contador de consultas */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-900 rounded-full">
              <span className="font-medium">Consultas Atendidas</span>
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xl">
                {consultasAtendidas}
              </div>
            </div>
          </div>

          {/* Próxima consulta (si hay) */}
          {citasHoy.length > 0 && citasHoy[0].estado === 'Programada' && (
            <div className="mb-8 p-6 bg-white border-2 border-gray-900 rounded-2xl">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Próxima Consulta
              </h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">
                      {citasHoy[0].paciente_nombre} {citasHoy[0].paciente_apellido}
                    </h3>
                    <p className="text-gray-600">
                      {new Date(citasHoy[0].fecha_hora_inicio).toLocaleString('es-EC', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleClickCita(citasHoy[0])}
                  className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Ingresar →
                </button>
              </div>
            </div>
          )}

          {/* Consultas para hoy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Consultas para Hoy
            </h2>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {citasHoy.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No hay citas programadas para hoy</p>
              </div>
            ) : (
              <div className="space-y-4">
                {citasHoy.map((cita) => (
                  <CitaCard
                    key={cita.id}
                    cita={cita}
                    onClick={() => handleClickCita(cita)}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Modal de Historia Clínica */}
      {loadingPaciente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-700">Cargando información del paciente...</p>
          </div>
        </div>
      )}

      <ModalHistoriaClinica
        paciente={pacienteSeleccionado}
        onClose={() => setPacienteSeleccionado(null)}
      />
    </div>
  );
};

export default DoctorDashboard;