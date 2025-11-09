import { steps } from "@data/guideSteps";
import Step from "@components/Step";
import CTASection from "@components/CTASection";

const Guide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Título principal */}
        <section className="pt-12 md:pt-20 pb-4 md:pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
                Guía de Uso
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Usar el servicio es muy sencillo. Sigue estos pasos para registrarte, agendar tu cita y recibir atención médica desde tu hogar.
              </p>
            </div>
          </div>
        </section>

        {/* Pasos */}
        <section className="pt-4 md:pt-8 pb-8 md:pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <Step
                    key={index}
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
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
