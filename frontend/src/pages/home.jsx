import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [carritoOpen, setCarritoOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // ============================
  // 🔐 Obtener TOKEN si existe
  // ============================
  const token = localStorage.getItem("token");

  // ============================
  // 🔍 Verificar rol del usuario
  // ============================
  useEffect(() => {
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/usuarios/perfil/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUsuario(res.data))
        .catch((err) => {
          console.error("Error obteniendo perfil:", err);
          if (err.response?.status === 401) {
            localStorage.removeItem("token");
          }
        });
    }
  }, [token]);

  const API_PEDIDOS = "http://127.0.0.1:8000/api/pedidos/crud/";

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/inventario/catalogo/")
      .then((res) => {
        setProductos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar medicamentos:", err);
        setLoading(false);
      });
  }, []);

  // ============================
  // ➕ Agregar medicamento al carrito
  // ============================
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((p) => p.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // ============================
  // ➖ Reducir cantidad
  // ============================
  const reducirCantidad = (id) => {
    setCarrito(
      carrito
        .map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  // ============================
  // 🗑 Eliminar producto
  // ============================
  const eliminar = (id) =>
    setCarrito(carrito.filter((p) => p.id !== id));

  // ============================
  // 📨 ENVIAR PEDIDO (con token)
  // ============================
  const enviarPedido = async () => {
    if (!carrito.length) return alert("El carrito está vacío");
    const detalles = carrito.map((p) => ({
      medicamento: p.id,
      cantidad: p.cantidad,
      subtotal: p.precio_venta * p.cantidad,
    }));
    const total = detalles.reduce((t, d) => t + d.subtotal, 0);
    try {
      await axios.post(
        API_PEDIDOS,
        { cliente: 1, total, detalles },
        {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }
      );
      alert("Pedido enviado correctamente");
      setCarrito([]);
    } catch (e) {
      console.log("ERROR AL ENVIAR PEDIDO:", e);
      alert("Error enviando pedido");
    }
  };

  // ============================
  // 🖼️ Mostrar imagen correcta (usando solo 'imagen')
  // ============================
  const BACKEND_URL = process.env.VITE_API_URL || "http://127.0.0.1:8000";

  const obtenerImagen = (producto) => {
    // producto.imagen puede venir como:
    // - URL absoluta (http...)
    // - ruta relativa comenzando con '/' (p.ej. '/media/...')
    // - solo nombre/parte relativa ('media/medicamentos/..')
    if (!producto?.imagen) return "/placeholder.png";
    const img = producto.imagen;
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    if (img.startsWith("/")) return `${BACKEND_URL}${img}`;
    return `${BACKEND_URL}/${img}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      {/* ✅ Barra superior para admin/empleado */}
      {usuario && (usuario.rol === "admin" || usuario.rol === "empleado") && (
        <div className="bg-blue-800 text-white p-3 text-center">
          <p>
            Panel de {usuario.rol === "admin" ? "Administrador" : "Empleado"}:{" "}
            <strong>{usuario.nombre_completo || usuario.username}</strong>
          </p>
          <button
            onClick={() => (window.location.href = "/panel-admin")}
            className="mt-2 px-4 py-1 bg-white text-blue-800 rounded hover:bg-gray-100 transition-colors"
          >
            Ir al Panel
          </button>
        </div>
      )}

      {/* Sección bienvenida */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-10 mt-6"
      >
        <h2 className="text-3xl font-extrabold text-blue-700 mb-4">
          Bienvenido a tu tienda de confianza 💊
        </h2>
        <p className="text-gray-700 max-w-xl mx-auto">
          Compra medicamentos de calidad con atención personalizada y entrega rápida.
        </p>
      </motion.div>

      {/* Catálogo */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {loading ? (
          <p className="text-gray-600 text-lg col-span-3 text-center">Cargando medicamentos...</p>
        ) : productos.length > 0 ? (
          productos.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition-all"
            >
              <img
                src={obtenerImagen(p)}
                alt={p.nombre}
                className="w-full h-48 object-contain mb-4 rounded-lg"
                onError={(e) => (e.target.src = "/placeholder.png")}
              />
              <h3 className="text-lg font-semibold text-gray-800">{p.nombre}</h3>
              
              {/* ✅ Descripción sin repetir el nombre */}
              <p className="text-gray-500 text-sm mt-1">
                {p.descripcion
                  ? p.descripcion.replace(p.nombre, "").replace(/[-–—]/g, "").trim()
                  : "Sin descripción"}
              </p>

              <p className="mt-3 text-lg font-bold text-green-600">
                ${p.precio_venta?.toLocaleString("es-CO")}
              </p>

              <button
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => agregarAlCarrito(p)}
              >
                ➕ Agregar al pedido
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-600 text-lg col-span-3 text-center">No hay medicamentos disponibles</p>
        )}
      </motion.div>

      {/* Carrito lateral */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl border-l transition-transform duration-300 p-4 ${
          carritoOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h3 className="text-xl font-bold mb-4">🛒 Carrito</h3>

        {carrito.length === 0 ? (
          <p className="text-gray-500">No hay productos en el carrito</p>
        ) : (
          <>
            {carrito.map((p) => (
              <div key={p.id} className="border-b pb-3 mb-3">
                <p className="font-semibold">{p.nombre}</p>
                <p className="text-sm text-gray-600">Cantidad: {p.cantidad}</p>
                <p className="text-sm text-gray-600">Subtotal: ${(p.precio_venta * p.cantidad).toLocaleString("es-CO")}</p>

                <div className="flex gap-2 mt-2">
                  <button 
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition-colors"
                    onClick={() => reducirCantidad(p.id)}
                  >
                    -
                  </button>
                  <button 
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition-colors"
                    onClick={() => agregarAlCarrito(p)}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    onClick={() => eliminar(p.id)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 pt-4 border-t">
              <p className="text-lg font-bold">
                Total: ${carrito.reduce((t, p) => t + (p.precio_venta * p.cantidad), 0).toLocaleString("es-CO")}
              </p>
              <button
                className="w-full bg-green-600 text-white py-2 rounded mt-2 hover:bg-green-700 transition-colors"
                onClick={enviarPedido}
              >
                📦 Enviar pedido
              </button>
            </div>
          </>
        )}
      </div>

      {/* Botón carrito */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        onClick={() => setCarritoOpen(!carritoOpen)}
      >
        🛒 ({carrito.length})
      </button>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-4 text-center mt-auto">
        © 2025 www.mims.co
      </footer>
    </div>
  );
}