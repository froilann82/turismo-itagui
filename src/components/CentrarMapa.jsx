import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';

const CentrarMapa = ({ coordenadas, ubicacionUsuario }) => {
  const mapa = useMap();
  const centrado = useRef(false);

  useEffect(() => {
    const coordenadasAUsar = ubicacionUsuario || coordenadas;
    if (!centrado.current && coordenadasAUsar && coordenadasAUsar.length === 2) {
      mapa.setView(coordenadasAUsar, 18);
      centrado.current = true;
    }
  }, [coordenadas, ubicacionUsuario, mapa]);

  return null;
};

export default CentrarMapa;
