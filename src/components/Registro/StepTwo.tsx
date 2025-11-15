import { Calendar, Phone } from "lucide-react";
import { InputField } from "@components/common/InputField";
import { SelectField } from "@components/common/SelectField";
import type { Errors } from "@models/errors";
import type { RegisterFormData } from "@models/register";

interface StepTwoProps {
  formData: RegisterFormData;
  errors: Errors;
  generos: { id: number; nombre: string }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const StepTwo = ({ formData, errors, generos, onChange }: StepTwoProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Información Personal
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="primerNombre"
          name="primerNombre"
          type="text"
          label="Primer Nombre *"
          value={formData.primerNombre}
          onChange={onChange}
          error={errors.primerNombre}
          placeholder=""
        />

        <InputField
          id="segundoNombre"
          name="segundoNombre"
          type="text"
          label="Segundo Nombre"
          value={formData.segundoNombre}
          onChange={onChange}
          placeholder=""
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="primerApellido"
          name="primerApellido"
          type="text"
          label="Primer Apellido *"
          value={formData.primerApellido}
          onChange={onChange}
          error={errors.primerApellido}
          placeholder=""
        />

        <InputField
          id="segundoApellido"
          name="segundoApellido"
          type="text"
          label="Segundo Apellido"
          value={formData.segundoApellido}
          onChange={onChange}
          placeholder=""
        />
      </div>

      <SelectField
        id="generoId"
        name="generoId"
        label="Género *"
        value={formData.generoId}
        onChange={onChange}
        options={generos}
        error={errors.generoId}
      />


      <InputField
        id="numeroCelular"
        name="numeroCelular"
        type="tel"
        label="Número de Celular *"
        value={formData.numeroCelular}
        onChange={onChange}
        error={errors.numeroCelular}
        placeholder="0999999999"
        icon={<Phone className="h-5 w-5 text-gray-400" />}
      />
    </div>
  );
};