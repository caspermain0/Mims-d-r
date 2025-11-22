// src/pages/Medicamentos.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/Modal";

export default function Medicamentos() {
<<<<<<< HEAD
  const base = "/inventario/medicamentos-crud/";
=======
  const base = "http://127.0.0.1:8000/api/inventario/medicamentos-crud/";
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
  const categoriasBase = "/inventario/categorias/";
  const [medicamentos, setMedicamentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio_venta: 0,
    stock_actual: 0,
    stock_minimo: 0,
    fecha_vencimiento: "",
    estado: true,
<<<<<<< HEAD
    imagen_url: "",
=======
    imagen: null, // 🟡 Nuevo campo para imágenes
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
    categoria_id: null,
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [mRes, cRes] = await Promise.all([
        api.get(base),
        api.get(categoriasBase),
      ]);
      setMedicamentos(mRes.data);
      setCategorias(cRes.data);
    } catch (err) {
      console.error(err);
      alert("Error cargando inventario");
    }
  };

<<<<<<< HEAD
  const openCreate = () => { setEditing(null); setForm({ nombre:"", descripcion:"", precio_venta:0, stock_actual:0, stock_minimo:0, fecha_vencimiento:"", estado:true, imagen_url:"", categoria_id:null }); setOpen(true); };
  const openEdit = (m) => { setEditing(m); setForm({
    nombre: m.nombre, descripcion: m.descripcion, precio_venta: m.precio_venta,
    stock_actual: m.stock_actual, stock_minimo: m.stock_minimo, fecha_vencimiento: m.fecha_vencimiento || "",
    estado: m.estado, imagen_url: m.imagen_url || "", categoria_id: m.categoria?.id || null
  }); setOpen(true); };

  const save = async () => {
    try {
      const payload = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio_venta: form.precio_venta,
        stock_actual: form.stock_actual,
        stock_minimo: form.stock_minimo,
        fecha_vencimiento: form.fecha_vencimiento || null,
        estado: form.estado,
        imagen_url: form.imagen_url,
        categoria_id: form.categoria_id,
      };
      if (editing) {
        await api.put(`${base}${editing.id}/`, payload);
      } else {
        await api.post(base, payload);
=======
  const openCreate = () => {
    setEditing(null);
    setForm({
      nombre: "",
      descripcion: "",
      precio_venta: 0,
      stock_actual: 0,
      stock_minimo: 0,
      fecha_vencimiento: "",
      estado: true,
      imagen: null,
      categoria_id: null,
    });
    setOpen(true);
  };

  const openEdit = (m) => {
    setEditing(m);
    setForm({
      nombre: m.nombre,
      descripcion: m.descripcion,
      precio_venta: m.precio_venta,
      stock_actual: m.stock_actual,
      stock_minimo: m.stock_minimo,
      fecha_vencimiento: m.fecha_vencimiento || "",
      estado: m.estado,
      imagen: null,
      categoria_id: m.categoria?.id || null,
    });
    setOpen(true);
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imagen: e.target.files[0] });
  };

  const save = async () => {
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (editing) {
        await api.put(`${base}${editing.id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post(base, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
      }
      setOpen(false);
      fetchAll();
    } catch (err) {
      console.error(err);
      alert("Error guardando medicamento");
    }
  };

  const remove = async (m) => {
    if (!confirm("Inactivar medicamento?")) return;
    await api.delete(`${base}${m.id}/`);
    fetchAll();
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Gestión de Medicamentos</h2>
        <div className="flex gap-3">
<<<<<<< HEAD
          <button onClick={openCreate} className="px-4 py-2 bg-green-600 text-white rounded">+ Nuevo</button>
          <button onClick={fetchAll} className="px-4 py-2 bg-slate-100 rounded">Refrescar</button>
=======
          <button
            onClick={openCreate}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            + Nuevo
          </button>
          <button
            onClick={fetchAll}
            className="px-4 py-2 bg-slate-100 rounded"
          >
            Refrescar
          </button>
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
        </div>
      </header>

      <div className="bg-white rounded-lg p-4 shadow">
        <table className="w-full">
<<<<<<< HEAD
          <thead><tr className="text-left text-slate-600"><th className="py-2">ID</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Categoria</th><th>Acciones</th></tr></thead>
          <tbody>
            {medicamentos.map(m => (
=======
          <thead>
            <tr className="text-left text-slate-600">
              <th className="py-2">ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoria</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.map((m) => (
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
              <tr key={m.id} className="border-t">
                <td className="py-2">{m.id}</td>
                <td>{m.nombre}</td>
                <td>${m.precio_venta}</td>
                <td>{m.stock_actual}</td>
                <td>{m.categoria?.nombre || "N/A"}</td>
                <td>
<<<<<<< HEAD
                  <button onClick={() => openEdit(m)} className="px-3 py-1 bg-blue-600 text-white rounded mr-2">Editar</button>
                  <button onClick={() => remove(m)} className="px-3 py-1 bg-red-500 text-white rounded">Inactivar</button>
=======
                  <button
                    onClick={() => openEdit(m)}
                    className="px-3 py-1 bg-blue-600 text-white rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => remove(m)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Inactivar
                  </button>
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

<<<<<<< HEAD
      <Modal open={open} title={editing ? "Editar medicamento" : "Nuevo medicamento"} onClose={() => setOpen(false)} footer={
        <>
          <button onClick={() => setOpen(false)} className="px-4 py-2 rounded bg-gray-100">Cancelar</button>
          <button onClick={save} className="px-4 py-2 rounded bg-blue-600 text-white">Guardar</button>
        </>
      }>
        <div className="space-y-3">
          <input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} placeholder="Nombre" className="w-full px-3 py-2 border rounded"/>
          <textarea value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} placeholder="Descripción" className="w-full px-3 py-2 border rounded"/>
          <div className="grid grid-cols-2 gap-3">
            <input value={form.precio_venta} onChange={e => setForm({...form, precio_venta: e.target.value})} placeholder="Precio" type="number" className="px-3 py-2 border rounded"/>
            <input value={form.stock_actual} onChange={e => setForm({...form, stock_actual: e.target.value})} placeholder="Stock actual" type="number" className="px-3 py-2 border rounded"/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input value={form.stock_minimo} onChange={e => setForm({...form, stock_minimo: e.target.value})} placeholder="Stock mínimo" type="number" className="px-3 py-2 border rounded"/>
            <input value={form.fecha_vencimiento} onChange={e => setForm({...form, fecha_vencimiento: e.target.value})} placeholder="Fecha vencimiento (YYYY-MM-DD)" className="px-3 py-2 border rounded"/>
          </div>

          <select value={form.categoria_id || ""} onChange={e => setForm({...form, categoria_id: e.target.value || null})} className="w-full px-3 py-2 border rounded">
            <option value="">-- Seleccionar categoría --</option>
            {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>

          <input value={form.imagen_url} onChange={e => setForm({...form, imagen_url: e.target.value})} placeholder="URL imagen (opcional)" className="w-full px-3 py-2 border rounded"/>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.estado} onChange={e => setForm({...form, estado: e.target.checked})}/>
=======
      <Modal
        open={open}
        title={editing ? "Editar medicamento" : "Nuevo medicamento"}
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
            >
              Guardar
            </button>
          </>
        }
      >
        <div className="space-y-3">
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
          <div className="grid grid-cols-2 gap-3">
            <input
              value={form.precio_venta}
              onChange={(e) =>
                setForm({ ...form, precio_venta: e.target.value })
              }
              placeholder="Precio"
              type="number"
              className="px-3 py-2 border rounded"
            />
            <input
              value={form.stock_actual}
              onChange={(e) =>
                setForm({ ...form, stock_actual: e.target.value })
              }
              placeholder="Stock actual"
              type="number"
              className="px-3 py-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              value={form.stock_minimo}
              onChange={(e) =>
                setForm({ ...form, stock_minimo: e.target.value })
              }
              placeholder="Stock mínimo"
              type="number"
              className="px-3 py-2 border rounded"
            />
            <input
              value={form.fecha_vencimiento}
              onChange={(e) =>
                setForm({ ...form, fecha_vencimiento: e.target.value })
              }
              placeholder="Fecha vencimiento (YYYY-MM-DD)"
              className="px-3 py-2 border rounded"
            />
          </div>

          <select
            value={form.categoria_id || ""}
            onChange={(e) =>
              setForm({ ...form, categoria_id: e.target.value || null })
            }
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">-- Seleccionar categoría --</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>

          <input
            value={form.imagen_url}
            onChange={(e) =>
              setForm({ ...form, imagen_url: e.target.value })
            }
            placeholder="URL imagen (opcional)"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.estado}
              onChange={(e) =>
                setForm({ ...form, estado: e.target.checked })
              }
            />
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
            Activo
          </label>
        </div>
      </Modal>
    </div>
  );
}
