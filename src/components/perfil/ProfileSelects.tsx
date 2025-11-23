import { useState, useEffect } from "react";
import { SelectField } from "@components/common/SelectField";
import { paisesService } from "@services/paises";
import { gruposSanguineosService } from "@services/gruposSanguineos";
import { estilosVidaService } from "@services/estilosVida";
import type { Pais } from "@models/pais";
import type { GrupoSanguineo } from "@models/grupoSanguineo";
import type { EstiloVida } from "@models/estiloVida";

interface ProfileSelectsProps {
    formData: {
        pais_id: string;
        grupo_sanguineo_id: string;
        estilo_vida_id: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    errors?: { [key: string]: string };
}

export const ProfileSelects = ({ formData, setFormData, errors = {} }: ProfileSelectsProps) => {
    const [paises, setPaises] = useState<Pais[]>([]);
    const [gruposSanguineos, setGruposSanguineos] = useState<GrupoSanguineo[]>([]);
    const [estilosVida, setEstilosVida] = useState<EstiloVida[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [paisesData, gruposData, estilosData] = await Promise.all([
                    paisesService.getAll(),
                    gruposSanguineosService.getAll(),
                    estilosVidaService.getAll(),
                ]);
                setPaises(paisesData);
                setGruposSanguineos(gruposData);
                setEstilosVida(estilosData);
            } catch (error) {
                console.error("Error al cargar datos de selects:", error);
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
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
            <SelectField
                id="pais_id"
                name="pais_id"
                label="País"
                value={formData.pais_id}
                onChange={handleChange}
                options={paises}
                placeholder="Seleccione un país"
                error={errors.pais_id}
            />
            <SelectField
                id="grupo_sanguineo_id"
                name="grupo_sanguineo_id"
                label="Grupo Sanguíneo"
                value={formData.grupo_sanguineo_id}
                onChange={handleChange}
                options={gruposSanguineos}
                placeholder="Seleccione su grupo sanguíneo"
                error={errors.grupo_sanguineo_id}
            />
            <SelectField
                id="estilo_vida_id"
                name="estilo_vida_id"
                label="Estilo de Vida"
                value={formData.estilo_vida_id}
                onChange={handleChange}
                options={estilosVida}
                placeholder="Seleccione su estilo de vida"
                error={errors.estilo_vida_id}
            />
        </div>
    );
};