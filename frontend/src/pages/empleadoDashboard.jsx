import React, { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MedicamentosEmpleado from "../pages/medicamentosEmpleado";
import PanelFactura from "../pages/panelFactura";
import PanelPedidos from "../pages/PanelPedidos";
import "../styles/empleadoDashboard.css";

// Iconos profesionales de lucide-react
import { Pill, FileText, Package, LogOut } from "lucide-react";

export default function EmpleadoDashboard() {
  const [seccionActual, setSeccionActual] = useState("medicamentos");
  const navigate = useNavigate();

  // Función de logout
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    navigate("/login"); // redirige al login
  };

  const secciones = [
    { id: "medicamentos", nombre: "Medicamentos", icono: <Pill size={20} /> },
    { id: "facturas", nombre: "Facturas", icono: <FileText size={20} /> },
    { id: "pedidos", nombre: "Pedidos", icono: <Package size={20} /> },
    { id: "logout", nombre: "Cerrar sesión", icono: <LogOut size={20} />, accion: handleLogout },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar
        seccionActual={seccionActual}
        setSeccion={setSeccionActual}
        secciones={secciones} // enviamos las secciones con iconos
      />
=======
import Sidebar from "../components/Sidebar";
import MedicamentosEmpleado from "../pages/MedicamentosEmpleado";
import PanelFactura from "../pages/PanelFactura";
import PanelPedidos from "../pages/PanelPedidos";
import "../styles/empleadoDashboard.css";

export default function EmpleadoDashboard() {
  const [seccionActual, setSeccionActual] = useState("medicamentos");

  return (
    <div className="dashboard-container">
      <Sidebar seccionActual={seccionActual} setSeccion={setSeccionActual} />
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a

      <div className="dashboard-content">
        {seccionActual === "medicamentos" && <MedicamentosEmpleado />}
        {seccionActual === "facturas" && <PanelFactura />}
        {seccionActual === "pedidos" && <PanelPedidos />}
      </div>
    </div>
  );
}
