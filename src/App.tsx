import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Index from "@pages/Home";
import About from "@pages/About";
import Guide from "@pages/Guide";
import DoctorDashboard from "@pages/DoctorDashboard";
import NotFound from "@pages/NotFound";
import Login from "@pages/Login";
import Registro from "@pages/Register";
import { AuthProvider } from "@context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/servicio" element={<About />} />
              <Route path="/guia" element={<Guide />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/iniciar-sesion" element={<Login />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/dashboard" element={<DoctorDashboard />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
  </QueryClientProvider>
  </AuthProvider>
);

export default App;