// src/pages/Roles.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import Modal from "../components/Modal";

export default function Roles() {
  const [roles, setRoles] = useState([]);
<<<<<<< HEAD
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    activo: true,
  });

  const base = "/usuarios/roles/"; // Ruta del ViewSet en DRF

  useEffect(() => {
    fetchRoles();
  }, []);

  /** ----------------------------------------
   * 1. Obtener lista de roles
   -----------------------------------------*/
  const fetchRoles = async () => {
    try {
      const res = await api.get(base);
=======
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nombre: "", descripcion: "", activo: true });
  const baseRoles = "/usuarios/roles/";
  const baseUsuarios = "/usuarios/usuarios/";

  useEffect(() => {
    fetchRoles();
    fetchUsuarios(); // Cargar usuarios
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await api.get(baseRoles);
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
      setRoles(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar roles");
    }
  };

<<<<<<< HEAD
  /** ----------------------------------------
   * 2. Guardar (crear o editar)
   -----------------------------------------*/
  const save = async () => {
    try {
      if (editing) {
        // PATCH actualiza parcialmente
        await api.patch(`${base}${editing.id}/`, form);
      } else {
        await api.post(base, form);
      }

      setOpen(false);
      resetForm();
=======
  const fetchUsuarios = async () => {
    try {
      const res = await api.get(baseUsuarios);
      setUsuarios(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar usuarios");
    }
  };

  const save = async () => {
    try {
      if (editing) {
        await api.put(`${baseRoles}${editing.id}/`, form);
      } else {
        await api.post(baseRoles, form);
      }
      setOpen(false);
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
      fetchRoles();
    } catch (err) {
      console.error(err);
      alert("Error al guardar rol");
    }
  };

<<<<<<< HEAD
  /** ----------------------------------------
   * 3. Inactivar rol (DELETE → perform_destroy)
   -----------------------------------------*/
  const remove = async (r) => {
    if (!confirm("¿Inactivar rol?")) return;
    try {
      await api.delete(`${base}${r.id}/`);
      fetchRoles();
    } catch (err) {
      console.error(err);
      alert("Error al inactivar rol");
    }
  };

  /** ----------------------------------------
   * 4. Preparar modal para editar
   -----------------------------------------*/
  const startEdit = (r) => {
    setEditing(r);
    setForm({
      nombre: r.nombre,
      descripcion: r.descripcion,
      activo: r.activo,
    });
    setOpen(true);
  };

  /** ----------------------------------------
   * 5. Limpiar formulario
   -----------------------------------------*/
  const resetForm = () => {
    setEditing(null);
    setForm({ nombre: "", descripcion: "", activo: true });
  };

  return (
    <div>
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Gestión de Roles</h2>

        <button
          onClick={() => { resetForm(); setOpen(true); }}
          className="px-4 py-2 bg-green-600 text-white rounded"
=======
  const remove = async (r) => {
    if (!confirm("¿Inactivar rol?")) return;
    await api.delete(`${baseRoles}${r.id}/`);
    fetchRoles();
  };

  const startEdit = (r) => {
    setEditing(r);
    setForm({ nombre: r.nombre, descripcion: r.descripcion, activo: r.activo });
    setOpen(true);
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Gestión de Roles</h2>
        <button
          onClick={() => { 
            setEditing(null); 
            setForm({ nombre: "", descripcion: "", activo: true }); 
            setOpen(true); 
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
        >
          + Nuevo rol
        </button>
      </header>

<<<<<<< HEAD
      {/* Tabla */}
      <div className="bg-white rounded-lg p-4 shadow">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="py-2">ID</th>
              <th>Nombre</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="py-2">{r.id}</td>
                <td>{r.nombre}</td>
                <td>{r.activo ? "Sí" : "No"}</td>
                <td className="flex gap-2 py-2">
                  <button
                    onClick={() => startEdit(r)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => remove(r)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
=======
      <div className="bg-white rounded-lg p-4 shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-600 border-b">
              <th className="py-2 px-3">ID</th>
              <th className="py-2 px-3">Nombre</th>
              <th className="py-2 px-3">Activo</th>
              <th className="py-2 px-3">Usuario asignado</th>
              <th className="py-2 px-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-3">{r.id}</td>
                <td className="py-2 px-3">{r.nombre}</td>
                <td className="py-2 px-3">{r.activo ? "Sí" : "No"}</td>
                <td className="py-2 px-3">
                  {usuarios.find((u) => u.rol === r.nombre)?.nombre_completo || "Sin asignar"}
                </td>
                <td className="py-2 px-3">
                  <button 
                    onClick={() => startEdit(r)} 
                    className="px-3 py-1 bg-blue-600 text-white rounded mr-2 hover:bg-blue-700 transition-colors"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => remove(r)} 
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
                  >
                    Inactivar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

<<<<<<< HEAD
      {/* Modal */}
      <Modal
        open={open}
        title={editing ? "Editar rol" : "Nuevo rol"}
        onClose={() => setOpen(false)}
        footer={
          <>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={save}
              className="px-4 py-2 rounded bg-blue-600 text-white"
=======
      <Modal 
        open={open} 
        title={editing ? "Editar rol" : "Nuevo rol"} 
        onClose={() => setOpen(false)} 
        footer={
          <>
            <button 
              onClick={() => setOpen(false)} 
              className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={save} 
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
            >
              Guardar
            </button>
          </>
        }
      >
        <div className="space-y-3">
<<<<<<< HEAD
          <input
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder="Nombre"
            className="w-full px-3 py-2 border rounded"
          />

          <textarea
            value={form.descripcion}
            onChange={(e) =>
              setForm({ ...form, descripcion: e.target.value })
            }
            placeholder="Descripción"
            className="w-full px-3 py-2 border rounded"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.activo}
              onChange={(e) =>
                setForm({ ...form, activo: e.target.checked })
              }
            />
            Activo
          </label>
=======
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input 
              value={form.nombre} 
              onChange={e => setForm({...form, nombre: e.target.value})} 
              placeholder="Nombre del rol" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea 
              value={form.descripcion} 
              onChange={e => setForm({...form, descripcion: e.target.value})} 
              placeholder="Descripción del rol" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="activo" 
              checked={form.activo} 
              onChange={e => setForm({...form, activo: e.target.checked})}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="activo" className="ml-2 block text-sm text-gray-900">
              Activo
            </label>
          </div>
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
        </div>
      </Modal>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
