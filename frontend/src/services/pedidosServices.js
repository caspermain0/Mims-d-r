<<<<<<< HEAD
=======
// src/services/pedidosServices.js
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
import API from "./api.js";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

<<<<<<< HEAD
// 🔹 Obtener todos los pedidos
export const obtenerPedidos = async () => {
  const res = await API.get("pedidos/listar/", getAuthHeaders());
  return res.data;
};

// 🔹 Cambiar estado del pedido
export const cambiarEstadoPedido = async (id, nuevoEstado) => {
  const res = await API.put(
    `pedidos/actualizar/${id}/`, // <-- usar endpoint personalizado
=======
// Obtener todos los pedidos
export const obtenerPedidos = async () => {
  const res = await API.get("/pedidos/", getAuthHeaders());
  return res.data;
};

// Cambiar estado del pedido
export const cambiarEstadoPedido = async (id, nuevoEstado) => {
  const res = await API.put(
    `/pedidos/${id}/`,
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
    { estado: nuevoEstado },
    getAuthHeaders()
  );
  return res.data;
};
