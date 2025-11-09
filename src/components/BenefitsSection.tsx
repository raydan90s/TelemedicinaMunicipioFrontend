import type { Benefit } from "@models/types"

interface BenefitsSectionProps {
  title: string;
  subtitle: string;
  benefits: Benefit[];
}

const BenefitsSection = ({ title, subtitle, benefits }: BenefitsSectionProps) => {
  return (
    <section className="py-4 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-dark">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group bg-background rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Icon Container */}
                <div
                  className={`mb-6 w-16 h-16 rounded-xl bg-primary flex items-center justify-center ${benefit.color}`}
                >
                  <Icon className="h-8 w-8 text-text-light" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-text-dark group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
