import { Activity, ChevronDown, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useAuth from "@hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, usuario, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

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
          {isAuthenticated && usuario ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hidden md:flex items-center gap-2 text-white border-2 border-white hover:bg-white hover:text-primary transition-all px-4 py-2 rounded-md text-sm font-medium"
              >
                <span>Hola, {usuario.primer_nombre}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/perfil"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Mi Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;