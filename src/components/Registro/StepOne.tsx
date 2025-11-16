import { useState } from "react";
import { Mail, CreditCard } from "lucide-react";
import { InputField } from "@components/common/InputField";
import { PasswordInput } from "@components/common/PasswordInput";
import type { Errors } from "@models/errors";
import type { RegisterFormData } from "@models/register";

interface StepOneProps {
  formData: RegisterFormData;
  errors: Errors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StepOne = ({ formData, errors, onChange }: StepOneProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Credenciales de Acceso
      </h2>

      <InputField
        id="cedula"
        name="cedula"
        type="text"
        label="Cédula de Identidad"
        required
        value={formData.cedula}
        onChange={onChange}
        error={errors.cedula}
        placeholder="1234567890"
        icon={<CreditCard className="h-5 w-5 text-gray-400" />}
      />

      <InputField
        id="email"
        name="email"
        type="email"
        label="Correo Electrónico"
        required
        value={formData.email}
        onChange={onChange}
        error={errors.email}
        placeholder="correo@ejemplo.com"
        icon={<Mail className="h-5 w-5 text-gray-400" />}
      />

      <PasswordInput
        id="password"
        name="password"
        label="Contraseña"
        value={formData.password}
        onChange={onChange}
        error={errors.password}
        placeholder="Mínimo 8 caracteres"
        showPassword={showPassword}
        onToggleVisibility={() => setShowPassword(!showPassword)}
        required
      />

      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirmar Contraseña"
        value={formData.confirmPassword}
        onChange={onChange}
        error={errors.confirmPassword}
        placeholder="Repita su contraseña"
        showPassword={showConfirmPassword}
        onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
        required
      />
    </div>
  );
};