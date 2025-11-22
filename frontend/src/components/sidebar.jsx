<<<<<<< HEAD
import React from "react"; 
import "../styles/sidebar.css";
import { Pill, FileText, Package, LogOut } from "lucide-react";

const Sidebar = ({ seccionActual, setSeccion }) => {
  const items = [
    { id: "medicamentos", nombre: "Medicamentos", icono: <Pill size={20} /> },
    { id: "facturas", nombre: "Facturas", icono: <FileText size={20} /> },
    { id: "pedidos", nombre: "Pedidos", icono: <Package size={20} /> },
  ];

  // Función de logout
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirige al login
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">
        <span className="title-icon">👨‍⚕️</span> Panel Empleado
      </h2>
=======
import React from "react";
import "../styles/sidebar.css";

const Sidebar = ({ seccionActual, setSeccion }) => {
  const items = [
    { id: "medicamentos", nombre: "💊 Medicamentos" },
    { id: "facturas", nombre: "🧾 Facturas" },
    { id: "pedidos", nombre: "📝 Pedidos" },
  ];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Panel Empleado</h2>
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a

      <ul className="sidebar-menu">
        {items.map((item) => (
          <li
            key={item.id}
<<<<<<< HEAD
            className={`sidebar-item ${seccionActual === item.id ? "active" : ""}`}
            onClick={() => setSeccion(item.id)}
          >
            {item.icono} {item.nombre}
          </li>
        ))}
      </ul>

      {/* Botón de logout */}
      <button className="sidebar-logout" onClick={handleLogout}>
        <LogOut size={20} /> Cerrar sesión
      </button>
=======
            className={`sidebar-item ${
              seccionActual === item.id ? "active" : ""
            }`}
            onClick={() => setSeccion(item.id)}
          >
            {item.nombre}
          </li>
        ))}
      </ul>
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
    </aside>
  );
};

export default Sidebar;
