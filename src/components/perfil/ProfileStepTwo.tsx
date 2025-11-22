import { InputField } from "@components/common/InputField";
import { ProfileSelects } from "./ProfileSelects";

interface ProfileStepTwoProps {
    formData: {
        fecha_nacimiento: string;
        pais_id: string;
        lugar_residencia: string;
        numero_celular: string;
        grupo_sanguineo_id: string;
        estilo_vida_id: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const ProfileStepTwo = ({ formData, setFormData }: ProfileStepTwoProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
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
            />
            <ProfileSelects
                formData={{
                    pais_id: formData.pais_id,
                    grupo_sanguineo_id: formData.grupo_sanguineo_id,
                    estilo_vida_id: formData.estilo_vida_id,
                }}
                setFormData={setFormData}
            />
            <InputField
                id="lugar_residencia"
                name="lugar_residencia"
                type="text"
                label="Lugar de Residencia"
                value={formData.lugar_residencia}
                onChange={handleChange}
                placeholder="Ingrese su lugar de residencia"
            />
            <InputField
                id="numero_celular"
                name="numero_celular"
                type="text"
                label="Número de Celular"
                value={formData.numero_celular}
                onChange={handleChange}
                placeholder="Ingrese su número de celular"
            />
        </div>
    );
};