import { Activity, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-footer mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Logo y descripción */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-text-light" />
              <span className="font-bold text-text-light">Tu Salud En Línea</span>
            </div>
            <p className="text-xs text-text-light leading-relaxed">
              Atención médica oportuna para todos los ciudadanos de Guayaquil.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="font-semibold mb-3 text-sm text-text-light">Enlaces</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <Link to="/" className="text-text-light hover:text-text-light transition-colors">
                Inicio
              </Link>
              <Link to="/schedule" className="text-text-light hover:text-text-light transition-colors">
                Agendar Cita
              </Link>
              <Link to="/auth" className="text-text-light hover:text-text-light transition-colors">
                Mi Perfil
              </Link>
              <a href="#" className="text-text-light hover:text-text-light transition-colors">
                Términos
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold mb-3 text-sm text-text-light">Contacto</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-text-light" />
                <span className="text-text-light">042-593-000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-text-light" />
                <span className="text-text-light">salud@guayaquil.gob.ec</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center text-xs text-white/70">
          <p>&copy; {new Date().getFullYear()} Municipalidad de Guayaquil. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
