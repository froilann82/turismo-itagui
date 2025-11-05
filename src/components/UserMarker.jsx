import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { iconoVision } from './mapaUtils';

const UserMarker = ({ ubicacionUsuario, municipioUsuario, barrioUsuario, direccionUsuario, orientacion, direccionBrujula }) => {
  if (!ubicacionUsuario) return null;

  return (
    <Marker position={ubicacionUsuario} icon={iconoVision(orientacion)}>
      <Popup className="popup-ubicacion">
        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#009FE3', marginBottom: 4 }}>📍 Estás aquí</div>
        <div style={{ fontSize: '0.95rem', color: '#0033cc', marginBottom: 2, fontWeight: 'bold' }}>🏙️ {municipioUsuario || 'Cargando municipio...'}</div>
        {barrioUsuario && barrioUsuario !== 'Barrio no identificado' && barrioUsuario !== 'Barrio desconocido' && (
          <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: 4 }}>🏘️ {barrioUsuario}</div>
        )}
        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: 6 }}>📍 {direccionUsuario || 'Cargando dirección...'}</div>
        <div style={{ fontSize: '0.9rem', color: '#FF6B35', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>🧭 Apuntas hacia: {direccionBrujula || 'Calculando...'}</div>
        <div style={{ fontSize: '0.8rem', color: '#666', marginTop: 2 }}>{Math.round(orientacion)}° desde el Norte</div>
      </Popup>
    </Marker>
  );
};

export default UserMarker;
