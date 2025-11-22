import { DiseaseCheckboxes } from "./DiseaseCheckboxes";

const enfermedades = [
    { id: 1, nombre: "Diabetes" },
    { id: 2, nombre: "Hipertensión" },
    { id: 3, nombre: "Asma" },
    { id: 4, nombre: "Artritis" },
    // Placeholder list
];

interface ProfileStepThreeProps {
    formData: { selectedEnfermedades: number[] };
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const ProfileStepThree = ({ formData, setFormData }: ProfileStepThreeProps) => {
    const handleCheckboxChange = (id: number) => {
        setFormData((prev: any) => ({
            ...prev,
            selectedEnfermedades: prev.selectedEnfermedades.includes(id)
                ? prev.selectedEnfermedades.filter((item: number) => item !== id)
                : [...prev.selectedEnfermedades, id]
        }));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Enfermedades</h2>
            <p className="text-gray-600 mb-4">Seleccione las enfermedades que padece:</p>
            <DiseaseCheckboxes
                diseases={enfermedades}
                selectedDiseases={formData.selectedEnfermedades}
                onChange={handleCheckboxChange}
            />
        </div>
    );
};