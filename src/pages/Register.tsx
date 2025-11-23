import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepIndicator } from "@components/common/StepIndicator";
import { StepOne } from "@components/registro/StepOne";
import { StepTwo } from "@components/registro/StepTwo";
import SuccessNotification from "@components/registro/SuccessNotification";
import VerificationSuccessScreen from "@components/registro/VerificationSuccessScreen";
import { validateStep1, validateStep2 } from "@utils/formValidation";
import { generoService } from "@services/generos";
import useAuth from "@hooks/useAuth";
import type { Errors } from "@models/errors";
import type { RegisterFormData } from "@models/register";
import type { Genero } from "@models/genero";

type RegistrationStage =
  | { stage: 'form' }
  | { stage: 'success', email: string };

const Registro = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [flow, setFlow] = useState<RegistrationStage>({ stage: 'form' });
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    cedula: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    generoId: "",
    numeroCelular: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [loadingGeneros, setLoadingGeneros] = useState(true);

  useEffect(() => {
    const cargarGeneros = async () => {
      try {
        const data = await generoService.getAll();
        setGeneros(data);
      } catch (error) {
        console.error("Error al cargar géneros:", error);
        setErrors({ submit: "Error al cargar los datos del formulario" });
      } finally {
        setLoadingGeneros(false);
      }
    };

    cargarGeneros();
  }, []);

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
    const validationErrors = validateStep2(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const registerData = {
        cedula: formData.cedula,
        email: formData.email,
        password: formData.password,
        primer_nombre: formData.primerNombre,
        segundo_nombre: formData.segundoNombre || undefined,
        primer_apellido: formData.primerApellido,
        segundo_apellido: formData.segundoApellido || undefined,
        genero_id: parseInt(formData.generoId),
        numero_celular: formData.numeroCelular || undefined,
        roleCode: "PACIENTE"
      };

      await register(registerData);

      setShowSuccessNotification(true);
      setErrors({});

      setTimeout(() => {
        setFlow({ stage: 'success', email: formData.email });
        setShowSuccessNotification(false);
      }, 2000);

    } catch (error: any) {
      console.error("Error en registro:", error);
      setErrors({
        submit: error.message || "Error al registrar. Intente nuevamente."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetToForm = () => {
    setFlow({ stage: 'form' });
    setStep(1);
    setFormData({
      cedula: "",
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      generoId: "",
      numeroCelular: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setShowSuccessNotification(false);
  };

  if (flow.stage === 'success') {
    return (
      <VerificationSuccessScreen
        userEmail={flow.email}
        isFromCheckout={false}
        onRegisterAnother={resetToForm}
      />
    );
  }

  return (
    <>
      <SuccessNotification show={showSuccessNotification} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 md:py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Crear Cuenta</h1>
            <p className="text-gray-600">Complete el formulario para registrarse</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <StepIndicator currentStep={step} totalSteps={2} />

            {loadingGeneros ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {step === 1 && (
                  <StepOne
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                  />
                )}

                {step === 2 && (
                  <StepTwo
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                    generos={generos}
                  />
                )}
              </>
            )}

            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="cursor-pointer flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Anterior
                </button>
              )}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={loadingGeneros}
                  className="cursor-pointer flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="cursor-pointer flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                <button
                  onClick={() => navigate("/iniciar-sesion")}
                  className="cursor-pointer text-blue-600 font-semibold hover:underline"
                >
                  Iniciar sesión
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registro;