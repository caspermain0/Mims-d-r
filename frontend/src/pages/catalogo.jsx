<<<<<<< HEAD
// src/pages/Catalogo.jsx
import React, { useEffect, useState } from "react";
import { getCategoriasConMedicamentos } from "../services/inventarioServices.js";
import "../styles/catalogo.css";

const Catalogo = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaActiva, setCategoriaActiva] = useState(null);
=======
// src/pages/CatalogoMedicamentos.jsx
import React, { useEffect, useState } from "react";
import { getCatalogoPublico, getCategorias } from "../services/inventarioServices.js";
import "./CatalogoMedicamentos.css";

const CatalogoMedicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a

  useEffect(() => {
    const cargarDatos = async () => {
      try {
<<<<<<< HEAD
        const catConMed = await getCategoriasConMedicamentos();
        setCategorias(catConMed);
        if (catConMed.length > 0) setCategoriaActiva(catConMed[0].id); // Primera categoría activa por defecto
=======
        const [medRes, catRes] = await Promise.all([
          getCatalogoPublico(),
          getCategorias()
        ]);
        setMedicamentos(medRes.data);
        setCategorias(catRes.data);
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("No se pudieron cargar los datos del catálogo");
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

<<<<<<< HEAD
  if (loading) return <p style={{ textAlign: "center" }}>Cargando catálogo...</p>;
  if (error) return <p className="error">{error}</p>;

  const manejarClickCategoria = (id) => {
    setCategoriaActiva(id);
  };

  // Filtra la categoría seleccionada
  const categoriaSeleccionada = categorias.find(cat => cat.id === categoriaActiva);

  return (
    <div className="catalogo-container">

      {/* Botones de categorías */}
      <div className="categorias-botones">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            className={`categoria-boton ${cat.id === categoriaActiva ? "activa" : ""}`}
            onClick={() => manejarClickCategoria(cat.id)}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      {/* Medicamentos de la categoría seleccionada */}
      {categoriaSeleccionada ? (
        <section className="categoria-seccion">
          <h2>{categoriaSeleccionada.nombre}</h2>

          {/* Bloque de descripción con estilo */}
          <div className="descripcion-categoria">
            {categoriaSeleccionada.descripcion || "Sin descripción"}
          </div>

          <div className="medicamentos-grid">
            {categoriaSeleccionada.medicamentos && categoriaSeleccionada.medicamentos.length > 0 ? (
              categoriaSeleccionada.medicamentos.map((med) => (
                <div key={med.id} className="medicamento-card">
                  {med.imagen_url ? (
                    <img src={med.imagen_url} alt={med.nombre} />
                  ) : (
                    <img src="/default-image.png" alt="Sin imagen" />
                  )}
                  <h3>{med.nombre}</h3>
                  <p>{med.descripcion ? med.descripcion.substring(0, 100) + "..." : "Sin descripción"}</p>
                  <p className="precio">Precio: ${med.precio_venta}</p>
                </div>
              ))
            ) : (
              <p>No hay medicamentos en esta categoría.</p>
            )}
          </div>
        </section>
      ) : (
        <p>No hay categorías disponibles.</p>
      )}

=======
  if (loading) return <p>Cargando catálogo...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="catalogo-container">
      <section className="categorias-seccion">
        <h2>Categorías</h2>
        <div className="categorias-grid">
          {categorias.length === 0 ? (
            <p>No hay categorías disponibles.</p>
          ) : (
            categorias.map((cat) => (
              <div key={cat.id} className="categoria-card">
                <h3>{cat.nombre}</h3>
                <p>{cat.descripcion || "Sin descripción"}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="medicamentos-seccion">
        <h2>Medicamentos</h2>
        <div className="medicamentos-grid">
          {medicamentos.length === 0 ? (
            <p>No hay medicamentos disponibles.</p>
          ) : (
            medicamentos.map((med) => (
              <div key={med.id} className="medicamento-card">
                <h3>{med.nombre}</h3>
                <p>{med.descripcion ? med.descripcion.substring(0, 100) + "..." : "Sin descripción"}</p>
                <p className="precio">Precio: ${med.precio_venta}</p>
                <p className="stock">Stock: {med.stock_actual}</p>
              </div>
            ))
          )}
        </div>
      </section>
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
    </div>
  );
};

<<<<<<< HEAD
export default Catalogo;
=======
export default CatalogoMedicamentos;
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
