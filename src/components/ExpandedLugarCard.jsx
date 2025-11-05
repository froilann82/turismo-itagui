import React from 'react';

const ExpandedLugarCard = ({ lugarExpandido, favoritos, toggleLugarFavorito, handleCerrarLugar, handleIndicaciones, tipoTransporte, ruta, duracion, distancia, lugares }) => {
  if (!lugarExpandido) return null;

  const lugarId = lugarExpandido.id ? (lugarExpandido.id.toString().includes('osm-') ? lugarExpandido.id : `propio-${lugarExpandido.id}`) : `propio-${lugares.findIndex(l => l.lat === lugarExpandido.lat && l.lng === lugarExpandido.lng)}`;

  return (
    <>
      <div className="card-overlay" onClick={handleCerrarLugar}></div>
      <div className={`card-lugar expandida`} onClick={(e) => e.stopPropagation()}>
        <div className="card-img-container">
          <div className="card-img-wrapper">
            <img src={lugarExpandido.imagen} alt={lugarExpandido.nombre} />
            <div className="card-close-icon" onClick={handleCerrarLugar}>✕</div>
            <div className={`card-fav-icon ${favoritos.lugares.some(l => l.id === lugarExpandido.id) ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); toggleLugarFavorito(lugarExpandido); }}>
              {favoritos.lugares.some(l => l.id === lugarExpandido.id) ? '❤️' : '🤍'}
            </div>
            {lugarExpandido.rating && (<div className="card-rating"><span className="star">★</span> {lugarExpandido.rating}</div>)}
          </div>
        </div>

        <div className="card-info">
          <div className="card-titulo">{lugarExpandido.nombre}</div>
          <div className="card-autor"><span role="img" aria-label="ubicacion">📍</span> {lugarExpandido.autor || 'Itagüí, Antioquia'}</div>
          <div className="card-desc">{lugarExpandido.descripcion}</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', margin: '20px 0' }}>
            {lugarExpandido.telefono && (
              <div style={{ background: '#f0f9ff', padding: '15px', borderRadius: '12px', border: '2px solid #009FE3', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>📞</span>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#009FE3', fontSize: '0.9rem' }}>Teléfono</div>
                  <div style={{ color: '#333', fontSize: '1rem' }}>{lugarExpandido.telefono}</div>
                </div>
              </div>
            )}

            {lugarExpandido.horarios && (
              <div style={{ background: '#f0f9ff', padding: '15px', borderRadius: '12px', border: '2px solid #009FE3', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>🕒</span>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#009FE3', fontSize: '0.9rem' }}>Horarios</div>
                  <div style={{ color: '#333', fontSize: '1rem' }}>{lugarExpandido.horarios}</div>
                </div>
              </div>
            )}

            {lugarExpandido.precio && (
              <div style={{ background: '#fff7ed', padding: '15px', borderRadius: '12px', border: '2px solid #FF6B35', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>💰</span>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#FF6B35', fontSize: '0.9rem' }}>Precio</div>
                  <div style={{ color: '#333', fontSize: '1rem', fontWeight: 'bold' }}>{lugarExpandido.precio}</div>
                </div>
              </div>
            )}

            {lugarExpandido.rating && (
              <div style={{ background: '#fefce8', padding: '15px', borderRadius: '12px', border: '2px solid #eab308', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>⭐</span>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#eab308', fontSize: '0.9rem' }}>Calificación</div>
                  <div style={{ color: '#333', fontSize: '1rem', fontWeight: 'bold' }}>{lugarExpandido.rating}/5</div>
                </div>
              </div>
            )}
          </div>

          <button className="card-boton" onClick={(e) => { e.stopPropagation(); handleIndicaciones([lugarExpandido.lat, lugarExpandido.lng], tipoTransporte, lugarId); }}>
            <span role="img" aria-label="direcciones">🧭</span> Obtener Indicaciones
          </button>

          {ruta && duracion && (
            <div style={{ background: '#fff3f0', padding: '20px', borderRadius: '12px', border: '2px solid #FF6B35', margin: '20px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.5rem' }}>{tipoTransporte === 'foot' ? '🚶' : tipoTransporte === 'driving' ? '🚗' : '🚴'}</span>
                <div><div style={{ fontWeight: 'bold', color: '#FF6B35', fontSize: '0.9rem' }}>{tipoTransporte === 'foot' ? 'Caminando' : tipoTransporte === 'driving' ? 'En carro' : 'En bici/moto'}</div></div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.5rem' }}>⏱️</span>
                <div><div style={{ fontWeight: 'bold', color: '#FF6B35', fontSize: '0.9rem' }}>Tiempo</div><div style={{ color: '#333', fontSize: '1.1rem', fontWeight: 'bold' }}>{duracion} min</div></div>
              </div>

              {distancia && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.5rem' }}>📏</span>
                  <div><div style={{ fontWeight: 'bold', color: '#FF6B35', fontSize: '0.9rem' }}>Distancia</div><div style={{ color: '#333', fontSize: '1.1rem', fontWeight: 'bold' }}>{distancia} km</div></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpandedLugarCard;
