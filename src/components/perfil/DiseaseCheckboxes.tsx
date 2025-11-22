import { CheckboxField } from "@components/common/CheckboxField";

interface Disease {
    id: number;
    nombre: string;
}

interface DiseaseCheckboxesProps {
    diseases: Disease[];
    selectedDiseases: number[];
    onChange: (id: number) => void;
}

export const DiseaseCheckboxes = ({ diseases, selectedDiseases, onChange }: DiseaseCheckboxesProps) => {
    return (
        <div className="space-y-3">
            {diseases.map((disease) => (
                <CheckboxField
                    key={disease.id}
                    id={`disease-${disease.id}`}
                    name={`disease-${disease.id}`}
                    label={disease.nombre}
                    checked={selectedDiseases.includes(disease.id)}
                    onChange={() => onChange(disease.id)}
                />
            ))}
        </div>
    );
};