import { SelectField } from "@components/common/SelectField";

interface ProfileSelectsProps {
    formData: {
        pais_id: string;
        grupo_sanguineo_id: string;
        estilo_vida_id: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const paises = [
    { id: 1, nombre: "México" },
    { id: 2, nombre: "Colombia" },
    // Add more countries as needed
];

const gruposSanguineos = [
    { id: 1, nombre: "A+" },
    { id: 2, nombre: "B+" },
    { id: 3, nombre: "AB+" },
    { id: 4, nombre: "O+" },
    { id: 5, nombre: "A-" },
    { id: 6, nombre: "B-" },
    { id: 7, nombre: "AB-" },
    { id: 8, nombre: "O-" },
];

const estilosVida = [
    { id: 1, nombre: "Activo" },
    { id: 2, nombre: "Sedentario" },
    { id: 3, nombre: "Moderado" },
    // Add more as needed
];

export const ProfileSelects = ({ formData, setFormData }: ProfileSelectsProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6">
            <SelectField
                id="pais_id"
                name="pais_id"
                label="País"
                value={formData.pais_id}
                onChange={handleChange}
                options={paises}
                placeholder="Seleccione un país"
            />
            <SelectField
                id="grupo_sanguineo_id"
                name="grupo_sanguineo_id"
                label="Grupo Sanguíneo"
                value={formData.grupo_sanguineo_id}
                onChange={handleChange}
                options={gruposSanguineos}
                placeholder="Seleccione su grupo sanguíneo"
            />
            <SelectField
                id="estilo_vida_id"
                name="estilo_vida_id"
                label="Estilo de Vida"
                value={formData.estilo_vida_id}
                onChange={handleChange}
                options={estilosVida}
                placeholder="Seleccione su estilo de vida"
            />
        </div>
    );
};