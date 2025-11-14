import React, { useState } from 'react';
import { Calendar, Users, Clock, Activity, FileText, Bell, Mail, Search, Menu, ChevronRight, Phone, FileCheck } from 'lucide-react';

const DoctorDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(21);

  const statsCards = [
    { title: 'Total Pacientes', value: '2000+', subtitle: 'Hasta Hoy', icon: Users, color: 'from-blue-500 to-blue-600' },
    { title: 'Pacientes Hoy', value: '068', subtitle: '21 Dic-2021', icon: Activity, color: 'from-blue-500 to-blue-600' },
    { title: 'Citas Hoy', value: '085', subtitle: '21 Dic-2021', icon: Calendar, color: 'from-blue-500 to-blue-600' }
  ];

  const todayAppointments = [
    { id: 1, name: 'M.J. Mical', type: 'Chequeo de Salud', time: 'En Curso', status: 'ongoing' },
    { id: 2, name: 'Sanath Deo', type: 'Chequeo de Salud', time: '12:30 PM', status: 'scheduled' },
    { id: 3, name: 'Loeara Phanj', type: 'Reporte', time: '01:00 PM', status: 'scheduled' },
    { id: 4, name: 'Komola Haris', type: 'Resfriado Común', time: '01:30 PM', status: 'scheduled' }
  ];

  const appointmentRequests = [
    { id: 1, name: 'Maria Sarafat', condition: 'Resfriado', status: ['pending', 'cancel', 'video'] },
    { id: 2, name: 'Jhon Deo', condition: 'En Espera', status: ['confirmed', 'cancel', 'video'] }
  ];

  const nextPatient = {
    name: 'Sanath Deo',
    id: '0220092020005',
    dob: '15 Enero 1989',
    gender: 'Masculino',
    weight: '39 Kg',
    lastAppointment: '15 Dic-2021',
    height: '172 cm',
    regDate: '10 Dic-2021',
    conditions: ['Asma', 'Hipertensión', 'Fiebre']
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-3">
              MD
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Dr. Marttin Deo</h3>
            <p className="text-sm text-gray-500">MBBS, FCPS - MD (Medicine), MCPS</p>
          </div>
        </div>
        
        <nav className="p-4">
          <a href="#" className="flex items-center gap-3 px-4 py-3 mb-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md">
            <Activity size={20} />
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 mb-2 text-gray-600 hover:bg-blue-50 rounded-lg transition">
            <Calendar size={20} />
            <span className="font-medium">Citas</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 mb-2 text-gray-600 hover:bg-blue-50 rounded-lg transition">
            <FileText size={20} />
            <span className="font-medium">Página de Citas</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 mb-2 text-gray-600 hover:bg-blue-50 rounded-lg transition">
            <FileCheck size={20} />
            <span className="font-medium">Pagos</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 mb-2 text-gray-600 hover:bg-blue-50 rounded-lg transition">
            <Users size={20} />
            <span className="font-medium">Perfil</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mt-1">Bienvenido de nuevo, Dr. Deo</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <Mail size={24} className="text-gray-600" />
            </button>
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <Bell size={24} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Menu size={24} className="text-gray-600" />
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {statsCards.map((card, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">{card.title}</p>
                  <h3 className="text-3xl font-bold text-gray-800 mb-1">{card.value}</h3>
                  <p className="text-gray-400 text-xs">{card.subtitle}</p>
                </div>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                  <card.icon size={28} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Patients Summary Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Resumen de Pacientes</h3>
            <p className="text-sm text-gray-500 mb-4">Diciembre 2021</p>
            <div className="relative w-48 h-48 mx-auto">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="12" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="12" 
                        strokeDasharray="75.4 251.2" className="transition-all duration-1000" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" strokeWidth="12" 
                        strokeDasharray="62.8 251.2" strokeDashoffset="-75.4" className="transition-all duration-1000" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#DBEAFE" strokeWidth="12" 
                        strokeDasharray="113 251.2" strokeDashoffset="-138.2" className="transition-all duration-1000" />
              </svg>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">Total Pacientes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-sm text-gray-600">Pacientes Antiguos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-100"></div>
                <span className="text-sm text-gray-600">Nuevos Pacientes</span>
              </div>
            </div>
          </div>

          {/* Today Appointments */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Citas de Hoy</h3>
              <button className="text-blue-600 text-sm font-medium hover:underline">Ver Todo</button>
            </div>
            <div className="space-y-3">
              {todayAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {apt.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{apt.name}</p>
                      <p className="text-xs text-gray-500">{apt.type}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    apt.status === 'ongoing' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {apt.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Patient Details */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Detalles Próximo Paciente</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                SD
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{nextPatient.name}</h4>
                <p className="text-xs text-gray-500">ID del Paciente</p>
                <p className="text-xs text-blue-600 font-medium">{nextPatient.id}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div>
                <p className="text-gray-500 text-xs">Fecha de Nac.</p>
                <p className="font-semibold text-gray-800">{nextPatient.dob}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Peso</p>
                <p className="font-semibold text-gray-800">{nextPatient.weight}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Género</p>
                <p className="font-semibold text-gray-800">{nextPatient.gender}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Altura</p>
                <p className="font-semibold text-gray-800">{nextPatient.height}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Historial del Paciente</p>
              <div className="flex gap-2">
                {nextPatient.conditions.map((condition, idx) => (
                  <span key={idx} className={`px-3 py-1 rounded-full text-xs font-medium ${
                    idx === 0 ? 'bg-amber-100 text-amber-700' :
                    idx === 1 ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {condition}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition flex items-center justify-center gap-2">
                <Phone size={16} />
                Llamar
              </button>
              <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition">
                Documento
              </button>
              <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition">
                Chat
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Patients Review */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Revisión de Pacientes</h3>
            <div className="space-y-3">
              {['Excelente', 'Muy Bueno', 'Bueno', 'Promedio'].map((rating, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{rating}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        idx === 0 ? 'bg-blue-500 w-11/12' :
                        idx === 1 ? 'bg-blue-400 w-9/12' :
                        idx === 2 ? 'bg-amber-500 w-7/12' :
                        'bg-blue-300 w-5/12'
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Appointment Requests */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Solicitudes de Citas</h3>
              <button className="text-blue-600 text-sm font-medium hover:underline">Ver Todo</button>
            </div>
            <div className="space-y-3">
              {appointmentRequests.map((req) => (
                <div key={req.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {req.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{req.name}</p>
                      <p className="text-xs text-gray-500">{req.condition}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="w-7 h-7 rounded bg-green-100 flex items-center justify-center hover:bg-green-200 transition">
                      <span className="text-green-600 text-lg">✓</span>
                    </button>
                    <button className="w-7 h-7 rounded bg-red-100 flex items-center justify-center hover:bg-red-200 transition">
                      <span className="text-red-600 text-lg">✕</span>
                    </button>
                    <button className="w-7 h-7 rounded bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition">
                      <span className="text-blue-600 text-sm">📹</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Calendario</h3>
              <span className="text-sm text-gray-500">Diciembre - 2021</span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs mb-2">
              {['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'].map(day => (
                <div key={day} className="font-semibold text-gray-600">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`p-2 rounded-lg transition ${
                    selectedDate === day
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold shadow-md'
                      : day === 21
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;