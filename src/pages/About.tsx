import { Target, Lightbulb, Heart } from "lucide-react";
import HeroSection from "@components/HeroSection";
import onlineMeeting from "@assets/onlineMeeting.jpg";
import CTASection from "@components/CTASection";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection
          title="Telemedicina Municipal"
          subtitle="Una iniciativa de la M.I. Municipalidad de Guayaquil para mejorar el acceso a la atención médica."
          description="Este servicio gratuito conecta a los ciudadanos con profesionales de salud de la red municipal, ofreciendo consultas médicas virtuales rápidas, seguras y sin desplazamientos."
          primaryButton={{ text: "Agendar mi Cita Médica", link: "/schedule" }}
          image={onlineMeeting}
          reverse={true}
        />        
        
        {/* Nuestra Misión */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8 flex justify-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-text-light" />  
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-dark">
                Nuestra Misión
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                La misión de la Telemedicina Municipal es garantizar que cada guayaquileño pueda acceder a un servicio de salud de calidad sin importar su ubicación.
                Buscamos aprovechar la tecnología para facilitar el contacto directo entre médicos y pacientes, fortaleciendo la red de hospitales, consultorios y unidades móviles del municipio.
              </p>
            </div>
          </div>
        </section>

        {/* Por qué nació este servicio */}
        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="mb-8 flex justify-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                    <Lightbulb className="h-8 w-8 text-text-light" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-dark">
                  Por qué nació este servicio
                </h2>
              </div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span className="text-text-light font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-text-dark">Distancia y movilidad</h3>
                    <p className="text-gray-600">Muchos ciudadanos viven lejos de los centros de salud o tienen dificultades para desplazarse.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span className="text-text-light font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-text-dark">Seguridad</h3>
                    <p className="text-gray-600">Ante la situación actual del país, se busca ofrecer una alternativa segura para la atención médica.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span className="text-text-light font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-text-dark">Eficiencia</h3>
                    <p className="text-gray-600">El sistema digital reduce la congestión en los hospitales y mejora la capacidad de respuesta de los profesionales.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compromiso ciudadano / Cierre */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8 flex justify-center">
                <div className="w-16 h-16 bg-primary-hover rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-text-light" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-dark">
                Nuestro Compromiso
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                La Telemedicina Municipal Guayaquil representa el compromiso de la ciudad con la salud, la innovación y el bienestar de sus habitantes.
                Este servicio gratuito une la tecnología con la atención humana para cuidar a cada ciudadano, acercando la medicina a todos los hogares de Guayaquil.
              </p>
              <blockquote className="text-xl font-semibold text-text-dark italic">
                "Tu salud, más cerca que nunca."
              </blockquote>
            </div>
          </div>
        </section>

        <CTASection
          title="Guía del Servicio"
          description="Conoce los pasos para registrarte y agendar tu cita en línea."
          buttonText="Ver Guía"
          buttonLink="/guia"
        />
      </main>
    </div>
  );
};

export default About;
