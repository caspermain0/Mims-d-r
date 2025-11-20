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
    } finally {
      setLoading(false);
    }
  };

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