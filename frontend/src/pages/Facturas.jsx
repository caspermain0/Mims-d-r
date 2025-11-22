// src/pages/Facturas.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import Modal from "../components/Modal";
<<<<<<< HEAD
import { exportarFacturaAPDF } from "../services/pdfServices.js";
=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a

export default function Facturas() {
  const [facturas, setFacturas] = useState([]);
  const [open, setOpen] = useState(false);
  const [detalles, setDetalles] = useState([]);
  const [selected, setSelected] = useState(null);
<<<<<<< HEAD

  // ✅ Ruta correcta según tu backend
  const base = "/facturas/facturas/";

  useEffect(() => {
    cargarFacturas();
  }, []);

  const cargarFacturas = async () => {
=======
  const base = "/facturas/facturas/"; // ✅ Ruta correcta

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
    try {
      const res = await api.get(base);
      setFacturas(res.data);
    } catch (err) {
<<<<<<< HEAD
      console.error("Error cargando facturas:", err);
=======
      console.error(err);
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
      alert("Error cargando facturas");
    }
  };

<<<<<<< HEAD
  const showDetails = (factura) => {
    setSelected(factura);
    setDetalles(factura.detalles || []);
    setOpen(true);
  };

  // ✅ Descargar PDF con jsPDF
  const descargarPDF = (factura) => {
    exportarFacturaAPDF(factura, factura.detalles || []);
  };

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Gestión de Facturas</h2>

        <div className="flex gap-3">
          <button
            onClick={cargarFacturas}
            className="px-4 py-2 bg-slate-100 rounded hover:bg-slate-200"
          >
             Refrescar
          </button>

          <button
            onClick={() => {
              if (selected) {
                descargarPDF(selected);
              } else {
                alert("Seleccione una factura primero");
              }
            }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
             Descargar PDF
=======
  // 🔽 Función para exportar factura individual en PDF
  const exportarPDF = async (facturaId) => {
    try {
      // Hacer la solicitud al endpoint que genera el PDF
      const response = await api.get(`/facturas/exportar/${facturaId}/`, {
        responseType: 'blob', // Importante: para manejar archivos binarios
      });

      // Crear un blob a partir de la respuesta
      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Crear un enlace para descargar el archivo
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `factura_${facturaId}.pdf`); // Nombre del archivo

      // Simular clic para descargar
      document.body.appendChild(link);
      link.click();

      // Limpiar recursos
      link.remove();
      window.URL.revokeObjectURL(url);

      console.log(`✅ Factura ${facturaId} descargada exitosamente`);
    } catch (error) {
      console.error('❌ Error descargando factura:', error);
      alert('Error al descargar la factura. Inténtalo de nuevo.');
    }
  };

  // 🔽 Función para exportar todas las facturas en PDF
  const exportarTodasPDF = async () => {
    try {
      const response = await api.get('/facturas/exportar/todas/', {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `facturas_todas_${new Date().toISOString().slice(0, 10)}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      console.log('✅ Todas las facturas descargadas');
    } catch (error) {
      console.error('❌ Error descargando todas las facturas:', error);
      alert('Error al descargar todas las facturas. Inténtalo de nuevo.');
    }
  };

  const showDetails = (f) => {
    setSelected(f);
    setDetalles(f.detalles || []);
    setOpen(true);
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Gestión de Facturas</h2>
        <div className="flex gap-3">
          <button 
            onClick={fetch} 
            className="px-4 py-2 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
          >
            Refrescar
          </button>
          <button 
            onClick={exportarTodasPDF} 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Exportar Todas (PDF)
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
          </button>
        </div>
      </header>

<<<<<<< HEAD
      <div className="bg-white rounded-lg p-4 shadow">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="py-2">ID</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {facturas.map((f) => (
              <tr key={f.id} className="border-t hover:bg-slate-50 cursor-pointer">
                <td className="py-2">{f.id}</td>
                <td>{f.cliente_nombre || f.cliente}</td>
                <td>{new Date(f.fecha_emision).toLocaleString()}</td>
                <td className="font-semibold">${f.total}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => showDetails(f)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => descargarPDF(f)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                     PDF
=======
      <div className="bg-white rounded-lg p-4 shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-600 border-b">
              <th className="py-2 px-3">ID</th>
              <th className="py-2 px-3">Cliente</th>
              <th className="py-2 px-3">Fecha</th>
              <th className="py-2 px-3">Total</th>
              <th className="py-2 px-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map(f => (
              <tr key={f.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-3">{f.id}</td>
                <td className="py-2 px-3">{f.cliente}</td>
                <td className="py-2 px-3">{new Date(f.fecha_emision).toLocaleString()}</td>
                <td className="py-2 px-3">${f.total}</td>
                <td className="py-2 px-3">
                  <button 
                    onClick={() => showDetails(f)} 
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mr-2"
                  >
                    Ver
                  </button>
                  <button 
                    onClick={() => exportarPDF(f.id)} 
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    PDF
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

<<<<<<< HEAD
      <Modal
        open={open}
        title={`Factura #${selected?.id || ""}`}
=======
      <Modal 
        open={open} 
        title={`Factura #${selected?.id || ""}`} 
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
        onClose={() => setOpen(false)}
      >
        <div>
          <h4 className="font-semibold mb-2">Detalles</h4>
<<<<<<< HEAD

          {detalles.length === 0 ? (
            <p>No hay detalles.</p>
          ) : (
            detalles.map((d) => (
              <div
                key={d.id}
                className="border p-2 rounded mb-2 bg-slate-50"
              >
                <p>
                  <strong>{d.medicamento}</strong>
                </p>
                <p>
                  {d.cantidad} x ${d.precio_unitario} —{" "}
                  <strong>Subtotal: ${d.subtotal}</strong>
                </p>
=======
          {detalles.length === 0 ? (
            <p>No hay detalles.</p>
          ) : (
            detalles.map(d => (
              <div key={d.id} className="border p-2 rounded mb-2 bg-slate-50">
                <p><strong>{d.medicamento}</strong></p>
                <p>{d.cantidad} x ${d.precio_unitario} — Subtotal: ${d.subtotal}</p>
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
