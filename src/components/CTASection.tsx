import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  showIcon?: boolean;
  showStats?: boolean;
  showSecondaryButton?: boolean;
  stats?: {
    appointments?: string;
    satisfaction?: string;
    availability?: string;
  };
  backgroundColor?: string;
  textColor?: string;
}

const CTASection = ({
  title = "¿Listo para agendar tu cita?",
  description = "Únete a miles de ciudadanos que ya disfrutan de atención médica oportuna y eficiente",
  buttonText = "Agendar Cita",
  buttonLink = "/schedule",
  secondaryButtonText = "Contáctanos",
  secondaryButtonLink = "/contact",
  showIcon = false,
  showSecondaryButton = false,
  backgroundColor = "bg-navbar",
  textColor = "text-text-light"
}: CTASectionProps) => {
  return (
    <section className={`py-16 md:py-12 shadow-md ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side - Text content */}
          <div className="flex-1 text-center md:text-left">
            {/* Icon */}
            {showIcon && (
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary rounded-lg mb-4">
                <Calendar className="w-6 h-6 text-text-light" />
              </div>
            )}

            {/* Title */}
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${textColor}`}>
              {title}
            </h2>

            {/* Description */}
            <p className={`text-base md:text-lg ${textColor} opacity-90 max-w-2xl`}>
              {description}
            </p>
          </div>

          {/* Right side - CTA Button */}
          <div className="flex-shrink-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={buttonLink}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-text-light text-primary font-semibold rounded-lg hover:bg-accent transition-all shadow-lg whitespace-nowrap"
              >
                <span>{buttonText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {showSecondaryButton && (
                <Link
                  to={secondaryButtonLink}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-text-light font-semibold rounded-lg hover:bg-primary-hover transition-all whitespace-nowrap"
                >
                  {secondaryButtonText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;