import { Link } from "react-router-dom";
import { CheckCircle, Clock, Shield } from "lucide-react";
import BenefitsSection from "@components/BenefitsSection";
import heroImage from "@assets/hero-telemedicine.jpg";
import { benefits } from "@data/beneficios";
import CTASection from "@components/CTASection";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-2 md:py-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-accent rounded-full">
                  <span className="text-text-dark font-semibold text-sm">
                    Municipalidad de Guayaquil
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark leading-tight">
                  Tu Salud En Línea Guayaquil
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed">
                  Atención Primaria de Salud Oportuna y Eficiente
                </p>

                <p className="text-base text-gray-600">
                  Agenda tu cita médica de manera rápida y segura desde la comodidad de tu hogar.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    to="/schedule"
                    className="px-8 py-4 bg-primary text-text-dark font-semibold rounded-lg hover:bg-primary-hover transition-all shadow-md text-center"
                  >
                    Agendar mi Cita Médica
                  </Link>
                  <Link
                    to="/auth"
                    className="px-8 py-4 bg-background text-text-dark border-2 border-primary font-semibold rounded-lg hover:bg-background transition-all text-center"
                  >
                    Ingresar a mi Perfil
                  </Link>
                </div>
              </div>

              <div className="relative">
                <img
                  src={heroImage}
                  alt="Telemedicina - Atención médica en línea"
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <BenefitsSection
          title="Beneficios del Sistema"
          subtitle="Un nuevo enfoque de atención médica diseñado para ti"
          benefits={benefits}
        />

        {/* Requisitos Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-dark">
                  Requisitos para Usar el Sistema
                </h2>
                <p className="text-gray-600">
                  Solo necesitas cumplir estos requisitos para acceder
                </p>
              </div>

              <div className="bg-background rounded-2xl p-8 shadow-md">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-text-light" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-text-dark">
                        Validación de Identidad
                      </h3>
                      <p className="text-gray-600">
                        Necesitas tu número de cédula ecuatoriana para validar tu elegibilidad como ciudadano del cantón Guayaquil.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-text-light" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-text-dark">
                        Registro con Fotografía
                      </h3>
                      <p className="text-gray-600">
                        Deberás subir una fotografía reciente para validar tu identidad y completar tu perfil médico.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-12 h-12 bg-primary-hover rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-text-light" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-text-dark">
                        Proceso Rápido
                      </h3>
                      <p className="text-gray-600">
                        Una vez registrado, podrás agendar citas médicas en solo 3 clics: selecciona médico, fecha y confirma.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title="¡Agenda tu Consulta Médica!"
          description="Atención de calidad a un clic de distancia"
          buttonText="Agendar Cita"
          buttonLink="/schedule"
        />
      </main>
    </div>
  );
};

export default Home;
