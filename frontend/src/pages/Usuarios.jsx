// src/pages/Usuarios.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import Modal from "../components/Modal";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);
<<<<<<< HEAD

=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    nombre_completo: "",
    telefono: "",
    direccion: "",
<<<<<<< HEAD
    rol: "cliente",
  });

  const base = "/usuarios/usuarios/";
=======
    calle: "", // Campo agregado
    numero: "", // Campo agregado
    rol: "cliente",
  });
  const base = "/usuarios/usuarios/"; // viewset register path
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get(base);
<<<<<<< HEAD
      setUsuarios(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
=======
      setUsuarios(res.data);
    } catch (err) {
      console.error(err);
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
      alert("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setForm({
      username: "",
      email: "",
      password: "",
      nombre_completo: "",
      telefono: "",
      direccion: "",
<<<<<<< HEAD
=======
      calle: "", // Campo agregado
      numero: "", // Campo agregado
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
      rol: "cliente",
    });
    setOpenModal(true);
  };

  const openEdit = (u) => {
    setEditing(u);
    setForm({
      username: u.username || "",
      email: u.email || "",
      password: "",
      nombre_completo: u.nombre_completo || "",
      telefono: u.telefono || "",
      direccion: u.direccion || "",
<<<<<<< HEAD
=======
      calle: u.calle || "", // Campo agregado
      numero: u.numero || "", // Campo agregado
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
      rol: u.rol || "cliente",
    });
    setOpenModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
    try {
      if (editing) {
        await api.put(`${base}${editing.id}/`, form);
      } else {
<<<<<<< HEAD
        await api.post(base, form);
      }

      setOpenModal(false);
      fetchUsers();
    } catch (err) {
      console.error("Error al guardar usuario:", err);
=======
        await api.post(`${base}`, form);
      }
      setOpenModal(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
      alert("Error al guardar usuario");
    }
  };

  const handleDeactivate = async (u) => {
<<<<<<< HEAD
    if (!window.confirm("¿Inactivar usuario?")) return;

=======
    if (!confirm("Inactivar usuario?")) return;
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
    try {
      await api.delete(`${base}${u.id}/`);
      fetchUsers();
    } catch (err) {
<<<<<<< HEAD
      console.error("Error al inactivar:", err);
=======
      console.error(err);
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
      alert("Error al inactivar");
    }
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
        <div className="flex gap-3">
          <button
            onClick={openCreate}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            + Nuevo usuario
          </button>
          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200"
          >
            {loading ? "Cargando..." : "Refrescar"}
          </button>
        </div>
      </header>

      <div className="bg-white rounded-lg p-4 shadow">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="py-2">ID</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="py-2">{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td className="py-2">
                  <button
                    onClick={() => openEdit(u)}
                    className="px-3 py-1 mr-2 bg-blue-600 text-white rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeactivate(u)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Inactivar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={openModal}
        title={editing ? "Editar Usuario" : "Crear Usuario"}
        onClose={() => setOpenModal(false)}
<<<<<<< HEAD
        footer={null}
=======
        footer={
          <>
            <button
              onClick={() => setOpenModal(false)}
              className="px-4 py-2 rounded bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Guardar
            </button>
          </>
        }
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Usuario"
            className="w-full px-3 py-2 border rounded"
            required
          />
<<<<<<< HEAD

=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Correo"
            type="email"
            className="w-full px-3 py-2 border rounded"
            required
          />
<<<<<<< HEAD

=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
          <input
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Contraseña"
            type="password"
            className="w-full px-3 py-2 border rounded"
            {...(!editing ? { required: true } : {})}
          />
<<<<<<< HEAD

=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
          <input
            value={form.nombre_completo}
            onChange={(e) =>
              setForm({ ...form, nombre_completo: e.target.value })
            }
            placeholder="Nombre completo"
            className="w-full px-3 py-2 border rounded"
          />
<<<<<<< HEAD

=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
          <input
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            placeholder="Teléfono"
            className="w-full px-3 py-2 border rounded"
          />
<<<<<<< HEAD

=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
          <input
            value={form.direccion}
            onChange={(e) => setForm({ ...form, direccion: e.target.value })}
            placeholder="Dirección"
            className="w-full px-3 py-2 border rounded"
          />
<<<<<<< HEAD

=======
          <input
            value={form.calle}
            onChange={(e) => setForm({ ...form, calle: e.target.value })}
            placeholder="Calle"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            value={form.numero}
            onChange={(e) => setForm({ ...form, numero: e.target.value })}
            placeholder="Número"
            className="w-full px-3 py-2 border rounded"
          />
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
          <select
            value={form.rol}
            onChange={(e) => setForm({ ...form, rol: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="cliente">Cliente</option>
            <option value="empleado">Empleado</option>
            <option value="admin">Administrador</option>
          </select>
<<<<<<< HEAD

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setOpenModal(false)}
              type="button"
              className="px-4 py-2 rounded bg-gray-100"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Guardar
            </button>
          </div>
=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
        </form>
      </Modal>
    </div>
  );
}
