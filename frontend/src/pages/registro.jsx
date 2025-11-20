import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pill, UserPlus, LogIn } from "lucide-react";
import "../styles/registro.css"; // 👈 Importa los estilos

export default function Registro() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nombre_completo: "",
    telefono: "",
    calle: "", // 🟡 Nuevo campo
    numero: "", // 🟡 Nuevo campo
  });
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Usar la ruta pública de registro (vista RegistroUsuarioView)
      const response = await fetch("http://localhost:8000/api/usuarios/registro/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMensaje("Usuario registrado con éxito");
        navigate("/login");
      } else {
        const errorData = await response.json();
        // Mostrar errores de validación del serializer si existen
        if (errorData.detail) {
          setMensaje(errorData.detail);
        } else if (typeof errorData === 'object') {
          // Convertir errores por campo en un solo texto legible
          const messages = Object.entries(errorData).map(([k, v]) => {
            if (Array.isArray(v)) return `${k}: ${v.join(', ')}`;
            return `${k}: ${String(v)}`;
          });
          setMensaje(messages.join('\n'));
        } else {
          setMensaje("Error al registrar usuario");
        }
      }
    } catch (error) {
      setMensaje("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 💫 Fondo animado */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="burbuja"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{ y: [0, -50, 0], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 🧾 Contenedor del formulario */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="registro-form relative z-10"
      >
        <div className="text-center mb-6">
          <Pill className="text-blue-600 mb-2 mx-auto" size={46} />
          <h2 className="text-3xl font-bold text-blue-800 tracking-tight">
            Registro de Usuario
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Crea tu cuenta para acceder a nuestra droguería
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "username", placeholder: "Usuario" },
            { name: "email", placeholder: "Correo electrónico", type: "email" },
            { name: "password", placeholder: "Contraseña", type: "password" },
            { name: "nombre_completo", placeholder: "Nombre completo" },
            { name: "telefono", placeholder: "Teléfono" },
            { name: "calle", placeholder: "Calle" }, // 🟡 Nuevo campo
            { name: "numero", placeholder: "Número" }, // 🟡 Nuevo campo
          ].map((field) => (
            <div key={field.name}>
              <input
                name={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required={["username", "email", "password"].includes(field.name)}
                className="registro-input"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="registro-btn"
          >
            <UserPlus size={20} />
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>

        {/* ✅ Enlace al login */}
        <div className="text-center mt-5">
          <p className="text-gray-600 text-sm">
            ¿Ya tienes una cuenta?
          </p>
          <Link
            to="/login"
            className="registro-login-link inline-flex items-center justify-center mt-2"
          >
            <LogIn size={18} className="mr-2" />
            Iniciar sesión
          </Link>
        </div>

        {mensaje && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-5 text-center font-medium whitespace-pre-line ${
              mensaje.includes("éxito") ? "text-green-600" : "text-red-600"
            }`}
          >
            {mensaje}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
