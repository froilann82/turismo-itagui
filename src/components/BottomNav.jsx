import "../styles/BottomNav.css";
import { LuHouse } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom"; 

export default function BottomNav() {
  const navigate = useNavigate(); 
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <button
        className={`nav-btn${location.pathname === "/" ? " active" : ""}`}
        onClick={() => navigate("/")}
      >
        <LuHouse className="nav-icon" />
        Inicio
      </button>
      <button
        className={`nav-btn${location.pathname === "/eventos" ? " active" : ""}`}
        onClick={() => navigate("/eventos")}
      >
        <FaCalendarAlt className="nav-icon" />
        Eventos
      </button>
      <button
        className={`nav-btn${location.pathname === "/mapa" ? " active" : ""}`}
        onClick={() => navigate("/mapa")}
      >
        <CiSearch className="nav-icon" />
        Buscar
      </button>
      <button
        className={`nav-btn${location.pathname === "/favoritos" ? " active" : ""}`}
        onClick={() => navigate("/favoritos")}
      >
        <MdFavoriteBorder className="nav-icon" />
        Favoritos
      </button>
    </nav>
  );
}
