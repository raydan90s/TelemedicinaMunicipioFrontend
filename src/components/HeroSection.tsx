import { Link } from "react-router-dom";

interface ButtonProps {
  text: string;
  link: string;
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  primaryButton: ButtonProps;
  secondaryButton?: ButtonProps;
  image: string;
  reverse?: boolean;
}

const HeroSection = ({
  title,
  subtitle,
  description,
  badge,
  primaryButton,
  secondaryButton,
  image,
  reverse = false,
}: HeroSectionProps) => {
  const gridOrder = reverse ? "md:grid-cols-2" : "md:grid-cols-2";
  const textDiv = (
    <div className="space-y-6">
      {badge && (
        <div className="inline-block px-4 py-2 bg-accent rounded-full">
          <span className="text-text-dark font-semibold text-sm">{badge}</span>
        </div>
      )}

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark leading-tight">
        {title}
      </h1>

      <p className="text-xl text-gray-600 leading-relaxed">{subtitle}</p>

      <p className="text-base text-gray-600">{description}</p>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link
          to={primaryButton.link}
          className="px-8 py-4 bg-primary text-text-dark font-semibold rounded-lg hover:bg-primary-hover transition-all shadow-md text-center"
        >
          {primaryButton.text}
        </Link>
        {secondaryButton && (
          <Link
            to={secondaryButton.link}
            className="px-8 py-4 bg-background text-text-dark border-2 border-primary font-semibold rounded-lg hover:bg-background transition-all text-center"
          >
            {secondaryButton.text}
          </Link>
        )}
      </div>
    </div>
  );

  const imageDiv = (
    <div className="relative">
      <img
        src={image}
        alt={title}
        className="rounded-2xl shadow-xl w-full"
      />
    </div>
  );

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-4 md:py-12">
        <div className={`grid ${gridOrder} gap-12 items-center`}>
          {reverse ? imageDiv : textDiv}
          {reverse ? textDiv : imageDiv}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;