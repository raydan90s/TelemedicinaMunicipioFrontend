import { useState } from "react";
import { StepIndicator } from "@components/common/StepIndicator";
import { ProfileStepOne } from "@components/perfil/ProfileStepOne";
import { ProfileStepTwo } from "@components/perfil/ProfileStepTwo";
import { ProfileStepThree } from "@components/perfil/ProfileStepThree";
import { pacientesEnfermedadesService } from "@services/pacientesEnfermedades";
import { validateProfileStep2 } from "@utils/formValidation";
import type { PacienteEnfermedadForm } from "@models/pacienteEnfermedad";
import type { Errors } from "@models/errors";

const ProfileCompletion = () => {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState<Errors>({});
    const [formData, setFormData] = useState({
        imageUrl: null as string | null,
        fecha_nacimiento: "",
        pais_id: "",
        lugar_residencia: "",
        grupo_sanguineo_id: "",
        estilo_vida_id: "",
        tieneEnfermedades: null as boolean | null, // null = no respondido, true/false = respuesta
        enfermedadesPaciente: [] as PacienteEnfermedadForm[],
    });

    const handleNext = () => {
        // Step 1 is optional (image), allow advancing without validation
        if (step === 1) {
            setStep(step + 1);
            setErrors({}); // Clear any previous errors
            return;
        }

        // Step 2 validation
        if (step === 2) {
            const validationErrors = validateProfileStep2({
                fecha_nacimiento: formData.fecha_nacimiento,
                pais_id: formData.pais_id,
                lugar_residencia: formData.lugar_residencia,
                grupo_sanguineo_id: formData.grupo_sanguineo_id,
                estilo_vida_id: formData.estilo_vida_id,
            });

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            setErrors({}); // Clear errors if validation passes
        }

        // Step 3 is optional (diseases), allow advancing
        if (step < 3) setStep(step + 1);
    };

    const handlePrevious = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async () => {
        try {
            // Aquí iría la lógica para enviar los datos del perfil al backend
            // incluyendo las enfermedades del paciente si tieneEnfermedades === true

            if (formData.tieneEnfermedades === true && formData.enfermedadesPaciente.length > 0) {
                // Enviar enfermedades al backend
                await pacientesEnfermedadesService.updateForPaciente(formData.enfermedadesPaciente);
            }

            console.log("Profile completed", formData);
            // Aquí podrías redirigir al dashboard o mostrar un mensaje de éxito
        } catch (error) {
            console.error("Error al completar perfil:", error);
            // Aquí podrías mostrar un mensaje de error
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 md:py-16 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Completar Perfil</h1>
                    <p className="text-gray-600">Complete su información para acceder a todas las funciones</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <StepIndicator currentStep={step} totalSteps={3} />
                    {step === 1 && <ProfileStepOne formData={formData} setFormData={setFormData} />}
                    {step === 2 && <ProfileStepTwo formData={formData} setFormData={setFormData} errors={errors} />}
                    {step === 3 && <ProfileStepThree formData={formData} setFormData={setFormData} />}
                    <div className="flex gap-4 mt-8">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={handlePrevious}
                                className="cursor-pointer flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                            >
                                Anterior
                            </button>
                        )}

                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="cursor-pointer flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                Siguiente
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="cursor-pointer flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                            >
                                Finalizar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCompletion;