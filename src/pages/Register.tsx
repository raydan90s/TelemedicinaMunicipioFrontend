import { useState, useEffect } from "react";
import { StepIndicator } from "@components/Registro/StepIndicator";
import { StepOne } from "@components/Registro/StepOne";
import { StepTwo } from "@components/Registro/StepTwo";
import { validateStep1, validateStep2 } from "@utils/formValidation";
import { generoService } from "@services/generos";
import { authService } from "@services/auth.service";
import type { Errors } from "@models/errors";
import type { RegisterFormData } from "@models/register";
import type { Genero } from "@models/genero";

const Registro = () => {
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
  
  // Estados para catálogos
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [loadingGeneros, setLoadingGeneros] = useState(true);

  // Cargar géneros al montar el componente
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
    // Validar paso 2 nuevamente antes de enviar
    const validationErrors = validateStep2(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Preparar datos para el backend
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
        tipo_usuario: 'paciente' as const
      };

      const response = await authService.register(registerData);

      // Guardar token en localStorage
      localStorage.setItem('token', response.token);
      
      // Redirigir al dashboard o pantalla de completar perfil
      alert("Registro exitoso. Ahora complete su perfil médico.");
      window.location.href = "/completar-perfil";
    } catch (error: any) {
      console.error("Error en registro:", error);
      setErrors({ 
        submit: error.response?.data?.message || "Error al registrar. Intente nuevamente." 
      });
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
                    generos={generos}                />
              )}
            </>
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

            {step < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={loadingGeneros}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
              <a href="/login" className="text-blue-600 font-semibold hover:underline">
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