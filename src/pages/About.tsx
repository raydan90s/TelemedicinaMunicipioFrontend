import HeroSection from "@components/sections/HeroSection";
import onlineMeeting from "@assets/onlineMeeting.jpg";
import CTASection from "@components/sections/CTASection";
import MissionSection from "@components/sections/MissionSection";
import ReasonsSection from "@components/sections/ReasonsSection";
import CommitmentSection from "@components/sections/CommitmentSection";
import {reasons} from "@data/reasons";

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

        <MissionSection 
          title="Nuestra Misión"
          description="La misión de la Telemedicina Municipal es garantizar que cada guayaquileño pueda acceder a un servicio de salud de calidad sin importar su ubicación.
                Buscamos aprovechar la tecnología para facilitar el contacto directo entre médicos y pacientes, fortaleciendo la red de hospitales, consultorios y unidades móviles del municipio."
        />
        
        <ReasonsSection 
          title="Por qué nació este servicio"
          reasons={reasons}
        />

        <CommitmentSection 
          title="Nuestro Compromiso"
          description="La Telemedicina Municipal Guayaquil representa el compromiso de la ciudad con la salud, la innovación y el bienestar de sus habitantes.
                Este servicio gratuito une la tecnología con la atención humana para cuidar a cada ciudadano, acercando la medicina a todos los hogares de Guayaquil."
          quote='"Tu salud, más cerca que nunca."'
        />

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
