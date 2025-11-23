import { useState, useEffect } from "react";
import { enfermedadesService } from "@services/enfermedades";
import { tiposEnfermedadService } from "@services/tiposEnfermedad";
import type { Enfermedad } from "@models/enfermedad";
import type { TipoEnfermedad } from "@models/tipoEnfermedad";
import type { PacienteEnfermedadForm } from "@models/pacienteEnfermedad";

interface ProfileStepThreeProps {
    formData: {
        tieneEnfermedades: boolean | null;
        enfermedadesPaciente: PacienteEnfermedadForm[];
    };
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const ProfileStepThree = ({ formData, setFormData }: ProfileStepThreeProps) => {
    const [enfermedades, setEnfermedades] = useState<Enfermedad[]>([]);
    const [tiposEnfermedad, setTiposEnfermedad] = useState<TipoEnfermedad[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [enfermedadesData, tiposData] = await Promise.all([
                    enfermedadesService.getAll(),
                    tiposEnfermedadService.getAll(),
                ]);
                setEnfermedades(enfermedadesData);
                setTiposEnfermedad(tiposData);
            } catch (error) {
                console.error("Error al cargar datos de enfermedades:", error);
            } finally {
                setLoading(false);
            }
        };

        // Solo cargar datos si el usuario podría tener enfermedades
        if (formData.tieneEnfermedades === null || formData.tieneEnfermedades === true) {
            cargarDatos();
        } else {
            setLoading(false);
        }
    }, [formData.tieneEnfermedades]);

    const handleTieneEnfermedadesChange = (tiene: boolean) => {
        setFormData((prev: any) => ({
            ...prev,
            tieneEnfermedades: tiene,
            enfermedadesPaciente: tiene ? prev.enfermedadesPaciente : [],
        }));
    };

    const handleAgregarEnfermedad = () => {
        setFormData((prev: any) => ({
            ...prev,
            enfermedadesPaciente: [
                ...prev.enfermedadesPaciente,
                { enfermedad_id: 0, tipo_enfermedad_id: 0, detalle: "" }
            ]
        }));
    };

    const handleEnfermedadChange = (index: number, field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            enfermedadesPaciente: prev.enfermedadesPaciente.map((enf: any, i: number) =>
                i === index ? { ...enf, [field]: value } : enf
            )
        }));
    };

    const handleEliminarEnfermedad = (index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            enfermedadesPaciente: prev.enfermedadesPaciente.filter((_: any, i: number) => i !== index)
        }));
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-center items-center py-8">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Enfermedades</h2>

            {/* Pregunta inicial */}
            <div className="space-y-4">
                <p className="text-gray-600">¿Padece alguna enfermedad?</p>
                <div className="flex gap-6">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="tieneEnfermedades"
                            checked={formData.tieneEnfermedades === false}
                            onChange={() => handleTieneEnfermedadesChange(false)}
                            className="mr-2"
                        />
                        No
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="tieneEnfermedades"
                            checked={formData.tieneEnfermedades === true}
                            onChange={() => handleTieneEnfermedadesChange(true)}
                            className="mr-2"
                        />
                        Sí
                    </label>
                </div>
            </div>

            {/* Formulario de enfermedades - solo si respondió Sí */}
            {formData.tieneEnfermedades === true && (
                <div className="space-y-4">
                    <p className="text-gray-600">Seleccione sus enfermedades:</p>

                    {formData.enfermedadesPaciente.map((enfermedad, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium text-gray-800">Enfermedad {index + 1}</h4>
                                <button
                                    type="button"
                                    onClick={() => handleEliminarEnfermedad(index)}
                                    className="text-red-600 hover:text-red-800 text-sm"
                                >
                                    Eliminar
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Enfermedad
                                    </label>
                                    <select
                                        value={enfermedad.enfermedad_id}
                                        onChange={(e) => handleEnfermedadChange(index, 'enfermedad_id', parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value={0}>Seleccione una enfermedad</option>
                                        {enfermedades.map((enf) => (
                                            <option key={enf.id} value={enf.id}>
                                                {enf.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tipo
                                    </label>
                                    <select
                                        value={enfermedad.tipo_enfermedad_id}
                                        onChange={(e) => handleEnfermedadChange(index, 'tipo_enfermedad_id', parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value={0}>Seleccione un tipo</option>
                                        {tiposEnfermedad.map((tipo) => (
                                            <option key={tipo.id} value={tipo.id}>
                                                {tipo.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Detalles adicionales (opcional)
                                </label>
                                <textarea
                                    value={enfermedad.detalle || ''}
                                    onChange={(e) => handleEnfermedadChange(index, 'detalle', e.target.value)}
                                    placeholder="Ingrese detalles adicionales sobre esta enfermedad..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAgregarEnfermedad}
                        className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
                    >
                        + Agregar otra enfermedad
                    </button>
                </div>
            )}
        </div>
    );
};