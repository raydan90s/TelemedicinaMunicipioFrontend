import { UserPlus, UserCheck, Calendar, Video, FileText } from "lucide-react";
import type { Step } from "@models/types";

export const steps: Step[] = [
  {
    icon: UserPlus,
    title: "Crea tu cuenta fácilmente",
    description: "Ingresa tu número de cédula, nombre, correo electrónico y contraseña para registrarte. Recibirás un correo de verificación para activar tu cuenta.",
  },
  {
    icon: UserCheck,
    title: "Configura tu información de salud",
    description: "Agrega tus datos personales y médicos básicos: grupo sanguíneo, enfermedades preexistentes y estilo de vida. Esto ayudará a los profesionales a brindarte una atención más personalizada.",
  },
  {
    icon: Calendar,
    title: "Elige fecha, hora y médico disponible",
    description: "Desde tu perfil, selecciona el profesional de salud, el día y la hora que prefieras. El sistema mostrará las opciones más cercanas y disponibles.",
  },
  {
    icon: Video,
    title: "Atención médica desde tu hogar",
    description: "Ingresa al enlace de tu cita desde el navegador. La videollamada está integrada en la plataforma, sin necesidad de instalar aplicaciones externas.",
  },
  {
    icon: FileText,
    title: "Consulta tu historial y documentos",
    description: "Podrás acceder al resumen de tu cita y subir resultados médicos o exámenes de laboratorio para futuras consultas.",
  },
];