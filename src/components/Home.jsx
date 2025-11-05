import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import HeaderApp from "./HeaderApp";
import CarouselTarjetas from "./CarouselTarjetas";
import BottomNav from "./BottomNav";

export default function Home() {
  const navigate = useNavigate();

  const irACategoria = (categoria) => {
    navigate(`/mapa?categoria=${categoria}`);
  };

  return (
    <div className="home-container">
      <HeaderApp />
        <div className="home-content">
          
          <div className="carrusel-centro">
            <h3 className="categorias">Nuestras Categorías</h3>
            <CarouselTarjetas onCardClick={irACategoria} />
          </div>
        </div>
      <BottomNav />
    </div>
  );  
}


