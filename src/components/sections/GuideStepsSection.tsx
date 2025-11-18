import type { Step } from "@models/types"


interface GuideStepsSectionProps {
  title: string;
  description: string;
  steps: Step[];
}

const GuideStepsSection = ({ title, description, steps }: GuideStepsSectionProps) => {
    return (
        <section className="pt-12 md:pt-20 pb-4 md:pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
                {title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        
          <div className="pt-4 md:pt-10 pb-8 md:pb-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="space-y-8">
                    {steps.map(step => {
                        const Icon = step.icon;
                        return (
                        <div className="flex items-center gap-6">
                            {/* Círculo con icono */}
                            <div className="shrink-0">
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                                <Icon className="h-8 w-8 text-text-light" />
                                </div>
                            </div>

                            {/* Contenido */}
                            <div className="flex-1 p-6 rounded-2xl shadow-md bg-white">
                                <h3 className="text-xl font-bold text-text-dark mb-3">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                        );
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>
    );
};
export default GuideStepsSection;