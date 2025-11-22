<<<<<<< HEAD
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
=======
// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
import Home from "./pages/home.jsx";
import CatalogoMedicamentos from "./pages/catalogo.jsx";
import Registro from "./pages/registro.jsx";
import Login from "./pages/login.jsx";
import PerfilCliente from "./pages/perfilCliente.jsx";
import PanelAdmin from "./pages/panelAdmin.jsx";
import EmpleadoDashboard from "./pages/empleadoDashboard.jsx";
import EnviarCorreoRecuperacion from "./pages/EnviarCorreoRecuperacion.jsx";
import CambiarPassword from "./pages/CambiarPassword.jsx";
<<<<<<< HEAD
import Acerca from "./pages/Acerca.jsx";
import Reseñas from "./pages/reseñas.jsx";
import Mensajes from "./pages/Mensajes.jsx";
import Contacto from "./pages/Contacto.jsx";

// 🔐 Ruta protegida por rol
=======
import Navbar from "./components/Navbar.jsx";
import Acerca from "./pages/Acerca.jsx";
import Reseñas from "./pages/reseñas.jsx";
import Mensajes from "./pages/Mensajes.jsx";
import Contacto from "./pages/Contacto.jsx"; // 👈 añadimos la nueva página
import ListaUsuarios from "./pages/ListaUsuarios.jsx";

// 👇 componente para proteger rutas según rol
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("usuario") || "{}");

  if (!token) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.rol))
    return <Navigate to="/home" replace />;
<<<<<<< HEAD

=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
  return children;
};

export default function App() {
  return (
<<<<<<< HEAD
    <Routes>
      {/* Todas las rutas pasan por Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />

        {/* 🌐 Rutas públicas */}
        <Route path="home" element={<Home />} />
        <Route path="catalogo" element={<CatalogoMedicamentos />} />
        <Route path="registro" element={<Registro />} />
        <Route path="login" element={<Login />} />
        <Route path="acerca" element={<Acerca />} />
        <Route path="reseñas" element={<Reseñas />} />
        <Route path="recuperar" element={<EnviarCorreoRecuperacion />} />
        <Route path="cambiar-contrasena" element={<CambiarPassword />} />
        <Route path="contacto" element={<Contacto />} />

        {/* 🔒 Rutas privadas */}
        <Route
          path="perfilcliente"
=======
    <>
      {/* Navbar siempre visible en todas las páginas */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* 🌐 Rutas públicas */}
        <Route path="/home" element={<Home />} />
        <Route path="/catalogo" element={<CatalogoMedicamentos />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/reseñas" element={<Reseñas />} />
        <Route path="/recuperar" element={<EnviarCorreoRecuperacion />} />
        <Route path="/cambiar-contrasena" element={<CambiarPassword />} />

        {/* 🔒 Rutas protegidas por rol */}
        <Route
          path="/perfilcliente"
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
          element={
            <PrivateRoute allowedRoles={["cliente"]}>
              <PerfilCliente />
            </PrivateRoute>
          }
        />
<<<<<<< HEAD
        <Route
          path="paneladmin"
=======

        <Route
          path="/paneladmin"
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <PanelAdmin />
            </PrivateRoute>
          }
        />
<<<<<<< HEAD
        <Route
          path="panelempleado"
=======

        <Route
          path="/panelempleado"
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
          element={
            <PrivateRoute allowedRoles={["empleado"]}>
              <EmpleadoDashboard />
            </PrivateRoute>
          }
        />
<<<<<<< HEAD
        <Route
          path="mensajes"
=======

        {/* Página para listar usuarios (admin) */}
        <Route
          path="/usuarios"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <ListaUsuarios />
            </PrivateRoute>
          }
        />

        {/* 👨‍💼 Página de mensajes (solo admin) */}
        <Route
          path="/mensajes"
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Mensajes />
            </PrivateRoute>
          }
        />
<<<<<<< HEAD
      </Route>
    </Routes>
=======

        {/* 📩 Página de contacto (pública, visible a todos los usuarios) */}
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </>
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
  );
}
