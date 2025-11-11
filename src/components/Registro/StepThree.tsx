import { MapPin, AlertCircle } from "lucide-react";
import { SelectField } from "../common/SelectField";
import { TextAreaField } from "@components/common/TextAreaField";
import type { FormData } from "@models/formData";
import type { Errors } from "@models/errors";

interface StepThreeProps {
  formData: FormData;
  errors: Errors;
  gruposSanguineos: { id: number; nombre: string }[];
  estilosVida: { id: number; nombre: string }[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

export const StepThree = ({
  formData,
  errors,
  gruposSanguineos,
  estilosVida,
  onChange,
}: StepThreeProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Información Médica
      </h2>

      <TextAreaField
        id="lugarResidencia"
        name="lugarResidencia"
        label="Lugar de Residencia"
        value={formData.lugarResidencia}
        onChange={onChange}
        error={errors.lugarResidencia}
        placeholder="Dirección completa"
        icon={MapPin}
        rows={3}
      />

      <SelectField
        id="grupoSanguineoId"
        name="grupoSanguineoId"
        label="Grupo Sanguíneo"
        value={formData.grupoSanguineoId}
        onChange={onChange}
        options={gruposSanguineos}
        error={errors.grupoSanguineoId}
      />

      <SelectField
        id="estiloVidaId"
        name="estiloVidaId"
        label="Estilo de Vida"
        value={formData.estiloVidaId}
        onChange={onChange}
        options={estilosVida}
        error={errors.estiloVidaId}
      />

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Al registrarse, acepta nuestros términos y condiciones y nuestra política
          de privacidad.
        </p>
      </div>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <span className="text-red-700 text-sm">{errors.submit}</span>
        </div>
      )}
    </div>
  );
};