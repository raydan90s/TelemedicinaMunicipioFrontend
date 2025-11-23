import HeroSection from "@components/sections/HeroSection";
import BenefitsSection from "@components/sections/BenefitsSection";
import RequirementsSection from "@components/sections/RequirementsSection";
import TestimonialsSection from "@components/sections/TestimonialsSection";
import heroImage from "@assets/hero-telemedicine.jpg";
import { benefits } from "@data/benefits";
import { requirements } from "@data/requeriments";
import { testimonials } from "@data/testimonials";
import CTASection from "@components/sections/CTASection";
import useAuth from "@hooks/useAuth";

const Home = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className=" min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection
          title="Tu Salud En Línea Guayaquil"
          subtitle="Atención Primaria de Salud Oportuna y Eficiente"
          description="Agenda tu cita médica de manera rápida y segura desde la comodidad de tu hogar."
          badge="Municipalidad de Guayaquil"
          primaryButton={{ text: "Agendar mi Cita Médica", link: "/schedule" }}
          secondaryButton={{ text: "Conocer Más", link: "/servicio" }}
          image={heroImage}
        />

        <BenefitsSection
          title="Beneficios del Sistema"
          subtitle="Un nuevo enfoque de atención médica diseñado para ti"
          benefits={benefits}
        />

        <RequirementsSection
          title="Requisitos para Usar el Sistema"
          subtitle="Solo necesitas cumplir estos requisitos para acceder"
          requirements={requirements}
        />

        <TestimonialsSection
          title="Testimonios de Usuarios"
          subtitle="Lo que dicen nuestros pacientes y profesionales sobre el sistema"
          testimonials={testimonials}
        />

        <CTASection
          title="¡Agenda tu Consulta Médica!"
          description="Atención de calidad a un clic de distancia"
          buttonText="Agendar Cita"
          buttonLink={isAuthenticated ? "/agendar-cita" : "/iniciar-sesion"}
        />
      </main>
    </div>
  );
};

export default Home;
