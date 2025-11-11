import { Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Activity className="h-8 w-8 text-white" />
          <div className="flex flex-col">
            <span className="font-bold text-xl text-white">Tu Salud En Línea</span>
            <span className="text-xs text-white/90">Municipalidad de Guayaquil</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="relative text-sm font-medium text-white/90 before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 before:bg-white before:transition-all hover:before:w-full"
          >
            Inicio
          </Link>

          <Link
            to="/servicio"
            className="relative text-sm font-medium text-white/90 before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 before:bg-white before:transition-all hover:before:w-full"
          >
            Servicio
          </Link>

          <Link
            to="/guia"
            className="relative text-sm font-medium text-white/90 before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 before:bg-white before:transition-all hover:before:w-full"
          >
            Guía
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/iniciar-sesion"
            className="hidden md:inline-flex text-white border-2 border-white hover:bg-white hover:text-primary transition-all px-4 py-2 rounded-md text-sm font-medium"
          >
            Ingresar
          </Link>

          <Link
            to="/registro"
            className="bg-white text-primary hover:bg-white/90 font-semibold shadow-md px-4 py-2 rounded-md text-sm"
          >
            Crear Cuenta
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
