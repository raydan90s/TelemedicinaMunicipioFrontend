import { useState } from "react";
import { StepIndicator } from "@components/Registro/StepIndicator";
import { StepOne } from "@components/Registro/StepOne";
import { StepTwo } from "@components/Registro/StepTwo";
import { StepThree } from "@components/Registro/StepThree";
import { generos, gruposSanguineos, estilosVida } from "@data/formData";
import { validateStep1, validateStep2, validateStep3 } from "@utils/formValidation";
import type { Errors } from "@models/errors";
import type { FormData } from "@models/formData";

const Registro = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    cedula: "",
    email: "",
    password: "",
    confirmPassword: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    generoId: "",
    fechaNacimiento: "",
    numeroCelular: "",
    paisId: "1",
    lugarResidencia: "",
    grupoSanguineoId: "",
    estiloVidaId: "",
    rol: "paciente",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNext = () => {
    let validationErrors: Errors = {};

    if (step === 1) {
      validationErrors = validateStep1(formData);
    } else if (step === 2) {
      validationErrors = validateStep2(formData);
    }

    if (Object.keys(validationErrors).length === 0) {
      setStep(step + 1);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateStep3(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      console.log("Datos de registro:", formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Registro exitoso");
    } catch (error) {
      setErrors({ submit: "Error al registrar. Intente nuevamente." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Crear Cuenta</h1>
          <p className="text-gray-600">Complete el formulario para registrarse</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <StepIndicator currentStep={step} totalSteps={3} />

          {step === 1 && (
            <StepOne formData={formData} errors={errors} onChange={handleChange} />
          )}

          {step === 2 && (
            <StepTwo
              formData={formData}
              errors={errors}
              generos={generos}
              onChange={handleChange}
            />
          )}

          {step === 3 && (
            <StepThree
              formData={formData}
              errors={errors}
              gruposSanguineos={gruposSanguineos}
              estilosVida={estilosVida}
              onChange={handleChange}
            />
          )}

          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Anterior
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Siguiente
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Registrando...</span>
                  </>
                ) : (
                  "Crear Cuenta"
                )}
              </button>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              ¿Ya tiene una cuenta?{" "}
              <a href="#login" className="text-blue-600 font-semibold hover:underline">
                Iniciar sesión
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;