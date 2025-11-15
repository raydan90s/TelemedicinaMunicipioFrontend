import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { InputField } from "@components/common/InputField";
import { PasswordInput } from "@components/common/PasswordInput";
import { Button } from "@components/common/Button";
import { ErrorAlert } from "@components/common/ErrorAlert";
import { useLoginForm } from "@hooks/useLoginForm";

const Login = () => {
    const {
        formData,
        errors,
        showPassword,
        isLoading,
        handleChange,
        handleSubmit,
        togglePasswordVisibility,
        handleBlur
    } = useLoginForm();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido</h1>
                    <p className="text-gray-600">Ingrese a su cuenta de telemedicina</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="space-y-6">
                        <InputField
                            id="email"
                            name="email"
                            type="email"
                            label="Correo Electrónico"
                            value={formData.identifier}
                            placeholder="correo@ejemplo.com"
                            error={errors.email}
                            onChange={handleChange}
                            onBlur={handleBlur}   
                            icon={<Mail className="h-5 w-5 text-gray-400" />}
                        />

                        <PasswordInput
                            id="password"
                            name="password"
                            label="Contraseña"
                            value={formData.password}
                            placeholder="••••••••"
                            error={errors.password}
                            showPassword={showPassword}
                            onToggleVisibility={togglePasswordVisibility}
                            onChange={handleChange}
                        />

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                                />
                                <span className="text-gray-600">Recordarme</span>
                            </label>
                            <Link 
                                to="/recuperar" 
                                className="text-blue-600 hover:underline font-medium"
                            >
                                ¿Olvidó su contraseña?
                            </Link>
                        </div>

                        <ErrorAlert message={errors.submit || ""} />

                        <Button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            isLoading={isLoading}
                            fullWidth
                        >
                            Ingresar
                        </Button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            ¿No tiene una cuenta?{" "}
                            <Link 
                                to="/registro" 
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Crear cuenta
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;