import { Marker, Popup } from 'react-leaflet';
import { useFavoritos } from '../context/useFavoritos';

const LugarCard = ({ lugar, icono, onIndicaciones, onExpandir, minutos, tipoTransporte }) => {
  const { favoritos, toggleLugarFavorito } = useFavoritos();
  const esFavorito = favoritos.lugares.some(l => l.id === lugar.id);

  // Función para obtener el texto del tipo de transporte
  const obtenerTextoTransporte = (tipo) => {
    switch(tipo) {
      case 'foot':
        return 'caminando';
      case 'driving':
        return 'en carro';
      case 'cycling':
        return 'en bici/moto';
      default:
        return 'estimado';
    }
  };

  return (
    <Marker position={[lugar.lat, lugar.lng]} icon={icono}>
      <Popup 
        closeButton={false} 
        className="popup-restaurante"
        maxWidth={300}
        minWidth={240}
        autoPan={true}
        autoPanPadding={[20, 20]}
        keepInView={true}
      >
        <div className="card-lugar" onClick={onExpandir}>
          <div className="card-img-container">
            <div className="card-img-wrapper">
              <img
                src={lugar.imagen}
                alt={lugar.nombre}
              />
              <div 
                className={`card-fav-icon ${esFavorito ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLugarFavorito(lugar);
                }}
              >
                {esFavorito ? '❤️' : '🤍'}
              </div>
              {lugar.rating && (
                <div className="card-rating">
                  <span className="star">★</span> {lugar.rating}
                </div>
              )}
            </div>
          </div>

          <div className="card-info">
            <div className="card-titulo">{lugar.nombre}</div>
            <div className="card-autor">
              <span role="img" aria-label="ubicacion">📍</span> {lugar.autor || 'Itagüí'}
            </div>
            <div className="card-desc">{lugar.descripcion}</div>
            <button 
              className="card-boton" 
              onClick={(e) => {
                e.stopPropagation();
                onIndicaciones();
              }}
            >
              <span role="img" aria-label="direcciones">🧭</span> Indicaciones
              <span className="card-boton-letra">i</span>
            </button>
            {minutos && (
              <div className="card-minutos">
                ⏱️ {minutos} min
                <span style={{fontSize: '0.85em', color: '#888', marginLeft: 6}}>
                  ({obtenerTextoTransporte(tipoTransporte)})
                </span>
              </div>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default LugarCard;


