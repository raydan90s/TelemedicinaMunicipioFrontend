import { Upload } from "lucide-react";

interface ProfileStepOneProps {
    formData: { imageUrl: string | null };
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const ProfileStepOne = ({ formData, setFormData }: ProfileStepOneProps) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setFormData((prev: any) => ({ ...prev, imageUrl: reader.result as string }));
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Subir Foto de Perfil</h2>
            <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                    {formData.imageUrl ? (
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <Upload className="h-12 w-12 text-gray-400" />
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 hover:file:cursor-pointer"
                />
                <p className="text-sm text-gray-500 mt-2">Seleccione una imagen para su foto de perfil</p>
            </div>
        </div>
    );
};