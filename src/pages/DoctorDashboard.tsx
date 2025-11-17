// src/pages/DashboardMedico.tsx
import { useEffect, useState } from 'react';
import { Calendar, User, Settings } from 'lucide-react';
import useAuth from '@hooks/useAuth';
import { citasService, type CitaDelDia } from '@services/citas.service';
import { pacientesService, type HistoriaClinica } from '@services/pacientes.service';
import { CitaCard } from '@components/dashboard/CitaCard';
import { ModalHistoriaClinica } from '@components/dashboard/ModalHistoriaClinica';

type TabActiva = 'hoy' | 'atendidas';

const DoctorDashboard = () => {
  const { usuario } = useAuth();
  const [citasHoy, setCitasHoy] = useState<CitaDelDia[]>([]);
  const [citasProgramadas, setCitasProgramadas] = useState<CitaDelDia[]>([]);
  const [citasCompletadas, setCitasCompletadas] = useState<CitaDelDia[]>([]);
  const [proximaCita, setProximaCita] = useState<CitaDelDia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<HistoriaClinica | null>(null);
  const [loadingPaciente, setLoadingPaciente] = useState(false);
  const [tabActiva, setTabActiva] = useState<TabActiva>('hoy');

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
      
      const citas = await citasService.obtenerCitasDelDia(usuario.id);
      setCitasHoy(citas);
      
      // Separar por estado
      const programadas = citas.filter(c => c.estado === 'Programada');
      const completadas = citas.filter(c => c.estado === 'Completada');
      
      setCitasProgramadas(programadas);
      setCitasCompletadas(completadas);
      
      // Obtener la próxima cita (primera programada)
      if (programadas.length > 0) {
        setProximaCita(programadas[0]);
      } else {
        setProximaCita(null);
      }
      
      console.log('✅ Citas cargadas:', citas);
      console.log('📅 Programadas:', programadas.length);
      console.log('✅ Completadas:', completadas.length);
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

  const handleMarcarCompletada = async (citaId: number) => {
    try {
      console.log('🔄 Marcando cita como completada:', citaId);
      await citasService.marcarComoAtendida(citaId);
      
      // Recargar citas para actualizar la UI
      await cargarCitasDelDia();
      
      console.log('✅ Cita marcada como completada');
    } catch (err) {
      console.error('❌ Error al marcar cita:', err);
      alert('Error al marcar la cita como completada');
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
            <p className="text-xs text-gray-400">Municipio de Guayaquil 2025</p>
            <p className="text-xs text-gray-400">Todos los derechos reservados</p>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-8">
          {/* Header con contador */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bienvenida, Dra. {usuario?.primer_nombre}
              </h1>
              <p className="text-gray-600">¿Cómo podemos ayudarte hoy?</p>
            </div>

            {/* Contador de consultas */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-900 rounded-full">
              <span className="font-medium">Consultas Atendidas</span>
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xl">
                {citasCompletadas.length}
              </div>
            </div>
          </div>

          {/* Próxima consulta destacada */}
          {proximaCita && (
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
                      {[
                        proximaCita.paciente_nombre,
                        proximaCita.paciente_segundo_nombre,
                        proximaCita.paciente_apellido,
                        proximaCita.paciente_segundo_apellido
                      ].filter(Boolean).join(' ')}
                    </h3>
                    <p className="text-gray-600">
                      {new Date(proximaCita.fecha_hora_inicio).toLocaleString('es-EC', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    {proximaCita.paciente_celular && (
                      <p className="text-sm text-gray-500">{proximaCita.paciente_celular}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleClickCita(proximaCita)}
                    className="px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-colors"
                  >
                    Ver Detalles
                  </button>
                  <button
                    onClick={() => handleMarcarCompletada(proximaCita.id)}
                    className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                  >
                    Completar →
                  </button>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Pestañas de navegación */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex gap-8">
              <button
                onClick={() => setTabActiva('hoy')}
                className={`pb-4 px-2 font-semibold transition-colors relative ${
                  tabActiva === 'hoy'
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Consultas de Hoy ({citasProgramadas.length})
                {tabActiva === 'hoy' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                )}
              </button>
              
              <button
                onClick={() => setTabActiva('atendidas')}
                className={`pb-4 px-2 font-semibold transition-colors relative ${
                  tabActiva === 'atendidas'
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Consultas Atendidas ({citasCompletadas.length})
                {tabActiva === 'atendidas' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                )}
              </button>
            </div>
          </div>

          {/* Contenido de las pestañas */}
          {tabActiva === 'hoy' ? (
            <section>
              {citasProgramadas.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No hay citas programadas para hoy</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {citasProgramadas.map((cita) => (
                    <CitaCard
                      key={cita.id}
                      cita={cita}
                      onClick={() => handleClickCita(cita)}
                      onMarcarCompletada={() => handleMarcarCompletada(cita.id)}
                      showCompletarButton={true}
                    />
                  ))}
                </div>
              )}
            </section>
          ) : (
            <section>
              {citasCompletadas.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Aún no hay citas completadas hoy</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {citasCompletadas.map((cita) => (
                    <CitaCard
                      key={cita.id}
                      cita={cita}
                      onClick={() => handleClickCita(cita)}
                      completada={true}
                      showCompletarButton={false}
                    />
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>

      {/* Modal de carga */}
      {loadingPaciente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-700">Cargando información del paciente...</p>
          </div>
        </div>
      )}

      {/* Modal de Historia Clínica */}
      <ModalHistoriaClinica
        paciente={pacienteSeleccionado}
        onClose={() => setPacienteSeleccionado(null)}
      />
    </div>
  );
};

export default DoctorDashboard;