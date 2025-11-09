import { CheckCircle, Shield, Clock } from "lucide-react";

export const requirements = [
  {
    icon: CheckCircle,
    title: "Validación de Identidad",
    description: "Necesitas tu número de cédula ecuatoriana para validar tu elegibilidad como ciudadano del cantón Guayaquil.",
    color: "bg-primary",
  },
  {
    icon: Shield,
    title: "Registro con Fotografía",
    description: "Deberás subir una fotografía reciente para validar tu identidad y completar tu perfil médico.",
    color: "bg-secondary",
  },
  {
    icon: Clock,
    title: "Proceso Rápido",
    description: "Una vez registrado, podrás agendar citas médicas en solo 3 clics: selecciona médico, fecha y confirma.",
    color: "bg-primary-hover",
  },
];