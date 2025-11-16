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
        handleBlur,
        isRedirecting,
    } = useLoginForm();

    if (isRedirecting) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-600 text-lg font-semibold">
                        Cargando, por favor espere...
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">Bienvenido</h1>
                    <p className="text-gray-600 text-lg">Ingrese a su cuenta de telemedicina</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-10">
                    <div className="space-y-7">
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
                                    className="cursor-pointer w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
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

                    <div className="mt-8 text-center">
                        <p className="text-gray-600 text-base">
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