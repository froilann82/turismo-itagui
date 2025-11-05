import { useFavoritos } from '../context/useFavoritos';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import '../styles/Favoritos.css';

const Favoritos = () => {
  const { favoritos, removerDeFavoritos } = useFavoritos();

  const handleRemoverLugar = (lugarId) => {
    removerDeFavoritos('lugares', lugarId);
  };

  const handleRemoverEvento = (eventoId) => {
    removerDeFavoritos('eventos', eventoId);
  };

  return (
    <div>
      <Navbar />
      
      <div className="favoritos-container">
        {/* Header */}
        <div className="favoritos-header">
          <h1 className="favoritos-title">
            Mis Favoritos
          </h1>
          <p className="favoritos-subtitle">
            Aquí encontrarás los lugares y eventos que más te gustan de Itagüí
          </p>
        </div>

        {/* Contenido principal */}
        <div className="favoritos-content">
          
          {/* Izquierda - Lugares Favoritos */}
          <div className="favoritos-left">
            <div className="favoritos-card">
              <h3>📍 Lugares Favoritos</h3>
              
              <div className="favoritos-items-list">
                {favoritos.lugares && favoritos.lugares.length > 0 ? (
                  favoritos.lugares.map(lugar => (
                    <div key={lugar.id} className="favorito-item">
                      {lugar.imagen && (
                        <img src={lugar.imagen} alt={lugar.nombre} />
                      )}
                      <div className="item-content">
                        <h4>{lugar.nombre}</h4>
                        <p>{lugar.descripcion}</p>
                      </div>
                      <button 
                        className="btn-remover-favorito"
                        onClick={() => handleRemoverLugar(lugar.id)}
                        title="Quitar de favoritos"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>No tienes lugares favoritos aún. Explora el mapa y agrega lugares que te gusten.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Derecha - Eventos Favoritos */}
          <div className="favoritos-right">
            <div className="favoritos-card">
              <h3>🎉 Eventos Favoritos</h3>
              
              <div className="favoritos-items-list">
                {favoritos.eventos && favoritos.eventos.length > 0 ? (
                  favoritos.eventos.map(evento => (
                    <div key={evento.id} className="favorito-item">
                      {evento.imagen && (
                        <img src={evento.imagen} alt={evento.nombre} />
                      )}
                      <div className="item-content">
                        <h4>{evento.nombre}</h4>
                        <p>{evento.descripcion}</p>
                        {evento.fecha && (
                          <div className="evento-fecha">
                            <span>{evento.fecha}</span>
                          </div>
                        )}
                      </div>
                      <button 
                        className="btn-remover-favorito"
                        onClick={() => handleRemoverEvento(evento.id)}
                        title="Quitar de favoritos"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>No tienes eventos favoritos aún. Visita la sección de eventos y marca los que más te interesen.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Favoritos;