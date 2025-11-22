<<<<<<< HEAD
// src/pages/Reportes.jsx - Informes de Facturas
import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import Modal from "../components/Modal";
import { exportarFacturaAPDF } from "../services/pdfServices.js";

export default function Reportes() {
  const [facturas, setFacturas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [detalles, setDetalles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const base = "/facturas/facturas/"; // ✅ ruta correcta del ViewSet

  useEffect(() => {
    cargarFacturas();
  }, []);

  // ==========================================
  //  CARGAR FACTURAS
  // ==========================================
  const cargarFacturas = async () => {
    setLoading(true);
    try {
      const res = await api.get(base);
      setFacturas(res.data);
    } catch (err) {
      console.error("Error cargando facturas:", err);
      alert("Error al cargar facturas");
=======
// src/pages/Reportes.jsx
import React, { useState, useEffect } from "react";
import api from "../services/api.js";

export default function Reportes() {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState({
    tipo: "ventas", // ventas, clientes, productos, etc.
    fechaInicio: "",
    fechaFin: "",
  });

  // Cargar reportes iniciales
  useEffect(() => {
    cargarReportes();
  }, []);

  const cargarReportes = async () => {
    setLoading(true);
    try {
      const res = await api.get("/reportes/"); // Ajusta la URL según tu backend
      setReportes(res.data);
    } catch (err) {
      console.error("Error cargando reportes:", err);
      alert("Error cargando reportes");
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  // ==========================================
  //  VER DETALLES
  // ==========================================
  const verDetalles = (factura) => {
    setSelected(factura);
    setDetalles(factura.detalles || []);
    setIsEditing(false);
    setModalOpen(true);
  };

  // ==========================================
  //  EDITAR FACTURA
  // ==========================================
  const iniciarEdicion = (factura) => {
    setEditForm({
      metodo_pago: factura.metodo_pago,
      direccion_entrega: factura.direccion_entrega,
      observaciones: factura.observaciones,
    });
    setIsEditing(true);
  };

  const guardarEdicion = async () => {
    if (!selected || !editForm) return;
    try {
      await api.patch(`${base}${selected.id}/`, editForm);
      alert("Factura actualizada correctamente");
      setIsEditing(false);
      cargarFacturas();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error al actualizar factura");
    }
  };

  // ==========================================
  //  ANULAR FACTURA
  // ==========================================
  const anularFactura = async (factura) => {
    if (!confirm(`¿Anular factura #${factura.id}? Esta acción no se puede deshacer.`)) return;

    try {
      await api.delete(`${base}${factura.id}/`);
      alert("Factura anulada correctamente");
      cargarFacturas();
    } catch (err) {
      console.error(err);
      alert("Error al anular factura");
    }
  };

  // ==========================================
  //  DESCARGAR FACTURA (PDF) - CON jsPDF
  // ==========================================
  const descargarPDF = (factura) => {
    // Llamar al servicio de PDF con los detalles de la factura
    const detallesFactura = factura.detalles || [];
    exportarFacturaAPDF(factura, detallesFactura);
  };

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">📊 Informes de Facturas</h2>
        <div className="flex gap-3">
          <button
            onClick={cargarFacturas}
            className="px-4 py-2 bg-slate-100 text-slate-900 rounded hover:bg-slate-200"
            disabled={loading}
          >
            {loading ? "Cargando..." : "🔄 Refrescar"}
          </button>
        </div>
      </header>

      <div className="bg-white rounded-lg p-4 shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-600 border-b">
              <th className="py-2 px-2">ID</th>
              <th className="py-2 px-2">Cliente</th>
              <th className="py-2 px-2">Fecha</th>
              <th className="py-2 px-2">Total</th>
              <th className="py-2 px-2">Método Pago</th>
              <th className="py-2 px-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {facturas.map((f) => (
              <tr key={f.id} className="border-t hover:bg-slate-50">
                <td className="py-2 px-2">{f.id}</td>
                <td className="py-2 px-2">{f.cliente_nombre || f.cliente}</td>
                <td className="py-2 px-2">{new Date(f.fecha_emision).toLocaleDateString()}</td>
                <td className="py-2 px-2 font-semibold">${f.total}</td>
                <td className="py-2 px-2 capitalize">{f.metodo_pago}</td>
                <td className="py-2 px-2 flex gap-2 flex-wrap">
                  <button
                    onClick={() => verDetalles(f)}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                     Ver
                  </button>
                  <button
                    onClick={() => {
                      setSelected(f);
                      setDetalles(f.detalles || []);
                      iniciarEdicion(f);
                      setModalOpen(true);
                    }}
                    className="px-2 py-1 bg-amber-500 text-white rounded text-sm hover:bg-amber-600"
                  >
                     Editar
                  </button>
                  <button
                    onClick={() => descargarPDF(f)}
                    className="px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                  >
                     PDF
                  </button>
                  <button
                    onClick={() => anularFactura(f)}
                    className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                     Anular
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE DETALLES Y EDICIÓN */}
      <Modal
        open={modalOpen}
        title={`Factura #${selected?.id || ""}`}
        onClose={() => {
          setModalOpen(false);
          setIsEditing(false);
          setEditForm(null);
        }}
        footer={
          isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={guardarEdicion}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Guardar Cambios
              </button>
            </>
          ) : undefined
        }
      >
        <div className="space-y-4">
          {isEditing ? (
            // FORMULARIO DE EDICIÓN
            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Método de Pago</label>
                <select
                  value={editForm?.metodo_pago || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, metodo_pago: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta</option>
                  <option value="transferencia">Transferencia</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Dirección de Entrega</label>
                <input
                  type="text"
                  value={editForm?.direccion_entrega || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, direccion_entrega: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Ingrese dirección"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Observaciones</label>
                <textarea
                  value={editForm?.observaciones || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, observaciones: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Notas adicionales"
                  rows="3"
                />
              </div>
            </div>
          ) : (
            // VISTA DE DETALLES
            <div>
              <h4 className="font-semibold mb-2">📦 Detalles de Productos</h4>
              {detalles.length === 0 ? (
                <p className="text-gray-500">No hay detalles registrados.</p>
              ) : (
                <div className="space-y-2">
                  {detalles.map((d) => (
                    <div key={d.id} className="border p-3 rounded bg-slate-50">
                      <p className="font-semibold">{d.medicamento || "N/A"}</p>
                      <p className="text-sm text-gray-600">
                        {d.cantidad} x ${d.precio_unitario} = ${d.subtotal}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-4 border-t">
                <p className="text-lg font-bold text-right">
                  Total: ${selected?.total || 0}
                </p>
              </div>

              {selected && (
                <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                  <p>
                    <strong>Cliente:</strong> {selected.cliente_nombre || selected.cliente}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {new Date(selected.fecha_emision).toLocaleString()}
                  </p>
                  <p>
                    <strong>Método Pago:</strong> {selected.metodo_pago}
                  </p>
                  {selected.direccion_entrega && (
                    <p>
                      <strong>Dirección:</strong> {selected.direccion_entrega}
                    </p>
                  )}
                  {selected.observaciones && (
                    <p>
                      <strong>Observaciones:</strong> {selected.observaciones}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
=======
  // Exportar reporte en PDF
  const exportarPDF = async (tipoReporte) => {
    try {
      const response = await api.get(`/reportes/exportar/${tipoReporte}/`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reporte_${tipoReporte}_${new Date().toISOString().slice(0, 10)}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      console.log(`✅ Reporte ${tipoReporte} descargado`);
    } catch (error) {
      console.error('❌ Error descargando reporte:', error);
      alert('Error al descargar el reporte. Inténtalo de nuevo.');
    }
  };

  // Generar reporte con filtros
  const generarReporte = async () => {
    setLoading(true);
    try {
      const res = await api.post("/reportes/generar/", filtro);
      setReportes(res.data);
    } catch (err) {
      console.error("Error generando reporte:", err);
      alert("Error generando reporte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Generación de Reportes</h2>
      </header>

      {/* Filtros */}
      <div className="bg-white rounded-lg p-4 shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Reporte</label>
            <select
              value={filtro.tipo}
              onChange={(e) => setFiltro({...filtro, tipo: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="ventas">Ventas</option>
              <option value="clientes">Clientes</option>
              <option value="productos">Productos</option>
              <option value="facturas">Facturas</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
            <input
              type="date"
              value={filtro.fechaInicio}
              onChange={(e) => setFiltro({...filtro, fechaInicio: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
            <input
              type="date"
              value={filtro.fechaFin}
              onChange={(e) => setFiltro({...filtro, fechaFin: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <button
            onClick={generarReporte}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Generar Reporte"}
          </button>
          <button
            onClick={() => exportarPDF(filtro.tipo)}
            disabled={loading || reportes.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Resultados */}
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold mb-4">Resultados</h3>
        {loading ? (
          <p>Cargando reporte...</p>
        ) : reportes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-600 border-b">
                  <th className="py-2 px-3">ID</th>
                  <th className="py-2 px-3">Descripción</th>
                  <th className="py-2 px-3">Valor</th>
                  <th className="py-2 px-3">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {reportes.map((r, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-3">{r.id}</td>
                    <td className="py-2 px-3">{r.descripcion}</td>
                    <td className="py-2 px-3">${r.valor}</td>
                    <td className="py-2 px-3">{r.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No hay datos para mostrar.</p>
        )}
      </div>
    </div>
  );
}
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
