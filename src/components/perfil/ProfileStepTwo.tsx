import { InputField } from "@components/common/InputField";
import { ProfileSelects } from "./ProfileSelects";

interface ProfileStepTwoProps {
    formData: {
        fecha_nacimiento: string;
        pais_id: string;
        lugar_residencia: string;
        grupo_sanguineo_id: string;
        estilo_vida_id: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    errors?: { [key: string]: string };
}

export const ProfileStepTwo = ({ formData, setFormData, errors = {} }: ProfileStepTwoProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            // Note: We can't directly modify errors here, this would be handled in parent component
            // The parent should clear errors when validation passes
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Personal</h2>
            <InputField
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                type="date"
                label="Fecha de Nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                placeholder="Seleccione su fecha de nacimiento"
                error={errors.fecha_nacimiento}
                required
            />
            <ProfileSelects
                formData={{
                    pais_id: formData.pais_id,
                    grupo_sanguineo_id: formData.grupo_sanguineo_id,
                    estilo_vida_id: formData.estilo_vida_id,
                }}
                setFormData={setFormData}
                errors={errors}
            />
            <InputField
                id="lugar_residencia"
                name="lugar_residencia"
                type="text"
                label="Lugar de Residencia"
                value={formData.lugar_residencia}
                onChange={handleChange}
                placeholder="Ingrese su lugar de residencia"
                error={errors.lugar_residencia}
                required
            />
        </div>
    );
};