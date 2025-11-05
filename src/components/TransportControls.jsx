import React from 'react';

const TransportControls = ({ tipoTransporte, cambiarTipoTransporte }) => {
  return (
    <div className="transport-controls">
      <button className={`transport-btn ${tipoTransporte === 'foot' ? 'active' : ''}`} onClick={() => cambiarTipoTransporte('foot')}>
        <span style={{ fontSize: '1.2rem' }}>🚶</span>
        <span>A pie</span>
      </button>
      <button className={`transport-btn ${tipoTransporte === 'driving' ? 'active' : ''}`} onClick={() => cambiarTipoTransporte('driving')}>
        <span style={{ fontSize: '1.2rem' }}>🚗</span>
        <span>Auto</span>
      </button>
      <button className={`transport-btn ${tipoTransporte === 'cycling' ? 'active' : ''}`} onClick={() => cambiarTipoTransporte('cycling')}>
        <span style={{ fontSize: '1.2rem' }}>🚴</span>
        <span>Bici</span>
      </button>
    </div>
  );
};

export default TransportControls;
