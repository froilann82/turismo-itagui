import React, { useState, useRef, useEffect } from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

// Recibe lugares como prop
export default function Navbar({ lugares = [], categoriaSeleccionada, onLugarSeleccionado }) {
  const [busqueda, setBusqueda] = useState("");
  // Limpiar el input cuando cambie la categoría
  useEffect(() => {
    setBusqueda("");
    setDropdownAbierto(false);
  }, [categoriaSeleccionada]);
  const [dropdownAbierto, setDropdownAbierto] = useState(false);
  const contenedorRef = useRef(null);

  // Filtra lugares por nombre
  const lugaresFiltrados = lugares.filter(lugar =>
    lugar.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Cierra el dropdown si se hace click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (contenedorRef.current && !contenedorRef.current.contains(event.target)) {
        setDropdownAbierto(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Maneja Enter en el input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Normalizar texto para comparar
      const normalizar = (str) => str.normalize("NFD").replace(/\p{Diacritic}/gu, "").trim().toLowerCase();
      const busquedaNorm = normalizar(busqueda);
      // Buscar coincidencia exacta (ignorando mayúsculas/minúsculas, tildes y espacios)
      const lugar = lugares.find(l => normalizar(l.nombre) === busquedaNorm);
      if (lugar) {
        setBusqueda(lugar.nombre);
        setDropdownAbierto(false);
        if (onLugarSeleccionado) onLugarSeleccionado(lugar);
      } else if (lugaresFiltrados.length > 0) {
        // Si no hay coincidencia exacta, tomar el primero filtrado
        const lugarFiltrado = lugaresFiltrados[0];
        setBusqueda(lugarFiltrado.nombre);
        setDropdownAbierto(false);
        if (onLugarSeleccionado) onLugarSeleccionado(lugarFiltrado);
      }
    }
  };

  return (
    <div className="navbar-superior">
      <div>
        <img src={logo} alt="Logo Itagüí" className="Logo-Mapa" />
      </div>
      <div className="navbar-titulo">Alcaldía de Itagüí</div>
      <div className="navbar-busqueda-contenedor" ref={contenedorRef}>
        <span className="navbar-icono-busqueda">
          <svg width="20" height="20" fill="gray" viewBox="0 0 24 24">
            <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"/>
          </svg>
        </span>
        <input
          className="navbar-input"
          type="text"
          placeholder="Buscar en Itagüí"
          value={busqueda}
          onChange={e => {
            setBusqueda(e.target.value);
            setDropdownAbierto(true);
          }}
          onFocus={() => setDropdownAbierto(true)}
          onKeyDown={handleKeyDown}
        />
        <span
          style={{ cursor: "pointer", marginLeft: 8, display: "flex", alignItems: "center" }}
          onClick={() => setDropdownAbierto(v => !v)}
        >
          <svg width="18" height="18" fill="gray" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </span>
        {dropdownAbierto && (
          <ul
            style={{
              position: "absolute",
              top: "110%",
              left: 0,
              right: 0,
              background: "#fff",
              borderRadius: "0 0 12px 12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              zIndex: 1001,
              listStyle: "none",
              margin: 0,
              padding: "8px 0",
              maxHeight: 220,
              overflowY: "auto"
            }}
          >
            {lugaresFiltrados.length > 0 ? (
              lugaresFiltrados.map((lugar) => (
                <li
                  key={lugar.id}
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontSize: 15,
                    color: "#222"
                  }}
                  onClick={() => {
                    setBusqueda(lugar.nombre);
                    setDropdownAbierto(false);
                    if (onLugarSeleccionado) onLugarSeleccionado(lugar);
                  }}
                >
                  {lugar.nombre}
                </li>
              ))
            ) : (
              <li style={{ padding: "8px 16px", color: "#888", fontSize: 15 }}>
                ubicación no encontrada
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}


