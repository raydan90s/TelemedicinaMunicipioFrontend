import type { Requirement } from "@models/types"

interface RequirementsSectionProps {
  title: string;
  subtitle: string;
  requirements: Requirement[];
}

const RequirementsSection = ({ title, subtitle, requirements }: RequirementsSectionProps) => {
  return (
    <section className="py-4 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-dark">
              {title}
            </h2>
            <p className="text-gray-600">
              {subtitle}
            </p>
          </div>

          <div className="bg-background rounded-2xl p-8 shadow-md">
            <div className="space-y-6">
              {requirements.map((requirement, index) => {
                const Icon = requirement.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`mt-1 w-12 h-12 ${requirement.color} rounded-lg flex items-center justify-center shrink-0`}>
                      <Icon className="h-6 w-6 text-text-light" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-text-dark">
                        {requirement.title}
                      </h3>
                      <p className="text-gray-600">
                        {requirement.description}
                      </p>
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

export default RequirementsSection;