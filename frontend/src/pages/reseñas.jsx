import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Reseñas() {
  const [reseñas, setReseñas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Ajusta esta URL según tu backend
  const apiUrl = "http://127.0.0.1:8000/api/mensajes/resenas/";

  useEffect(() => {
    const obtenerReseñas = async () => {
      try {
        const response = await axios.get(apiUrl);
        setReseñas(response.data);
      } catch (error) {
        console.error("❌ Error al cargar reseñas:", error);
        setError("No se pudieron cargar las reseñas. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    obtenerReseñas();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          className="text-lg text-gray-600"
        >
          Cargando reseñas...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-10 px-6 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-green-700 mb-10"
      >
        Opiniones de Nuestros Clientes
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {reseñas.length > 0 ? (
          reseñas.map((reseña) => (
            <motion.div
              key={reseña.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition-transform hover:scale-[1.02]"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-3">
                {reseña.nombre}
              </h2>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={22}
                    className={`${
                      i < reseña.calificacion ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={i < reseña.calificacion ? "currentColor" : "none"}
                  />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">{reseña.comentario}</p>

              <p className="text-sm text-gray-500 mt-4 italic">
                Publicado el{" "}
                {new Date(reseña.fecha).toLocaleDateString("es-CO", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center text-gray-500 text-lg"
          >
            No hay reseñas disponibles aún.
          </motion.p>
        )}
      </div>
    </div>
  );
}
