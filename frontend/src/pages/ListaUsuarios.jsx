import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No autenticado. Inicia sesión para ver los usuarios.");
      setLoading(false);
      navigate("/login");
      return;
    }

    const fetchUsuarios = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8000/api/usuarios/usuarios/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          setError("No autorizado. Inicia sesión de nuevo.");
          localStorage.removeItem("token");
          localStorage.removeItem("usuario");
          navigate("/login");
          return;
        }

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          setError(body?.detail || "Error al obtener usuarios");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUsuarios(data);
      } catch (err) {
        setError("Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [navigate]);

  if (loading) return <div className="p-6">Cargando usuarios...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Usuarios registrados</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-600">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
            {usuarios.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2">{u.id}</td>
                <td className="px-4 py-2">{u.username}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.rol}</td>
                <td className="px-4 py-2">{u.nombre_completo || "-"}</td>
                <td className="px-4 py-2">{u.telefono || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
