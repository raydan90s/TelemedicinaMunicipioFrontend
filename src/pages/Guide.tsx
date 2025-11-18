import { steps } from "@data/guideSteps";
import CTASection from "@components/sections/CTASection";
import GuideStepsSection from "@components/sections/GuideStepsSection";

const Guide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <GuideStepsSection 
          title="Guía de Uso"
          description="Usar el servicio es muy sencillo. Sigue estos pasos para registrarte, agendar tu cita y recibir atención médica desde tu hogar."
          steps={steps}
        />

        <CTASection
          title="¡Comienza Hoy Mismo!"
          description="Crea tu cuenta y accede al sistema para agendar tu primera cita médica en línea."
          buttonText="Crear Cuenta"
          buttonLink="/registro"
        />
      </main>
    </div>
  );
};

export default Guide;
