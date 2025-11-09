import type { LucideIcon } from "lucide-react";

interface StepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

const Step = ({ icon: Icon, title, description }: StepProps) => {
  return (
    <div className="flex items-center gap-6">
      {/* Círculo con icono */}
      <div className="shrink-0">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <Icon className="h-8 w-8 text-text-light" />
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-6 rounded-2xl shadow-md bg-white">
        <h3 className="text-xl font-bold text-text-dark mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default Step;