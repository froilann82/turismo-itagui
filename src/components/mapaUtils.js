import L from 'leaflet';

export const centro = [6.172345389753028, -75.60943176849352];

export const limitesItagui = {
  norte: 6.195,
  sur: 6.145,
  oeste: -75.65,
  este: -75.57
};

export function estaEnItagui(lat, lng) {
  return (
    lat <= limitesItagui.norte &&
    lat >= limitesItagui.sur &&
    lng >= limitesItagui.oeste &&
    lng <= limitesItagui.este
  );
}

export const obtenerIcono = (categoria) => {
  let url = '';
  switch (categoria) {
    case 'gastronomia':
      url = 'https://cdn-icons-png.flaticon.com/512/854/854878.png';
      break;
    case 'aventura':
      url = 'https://cdn-icons-png.flaticon.com/512/684/684908.png';
      break;
    case 'cultural':
      url = 'https://cdn-icons-png.flaticon.com/512/3448/3448610.png';
      break;
    case 'shopping':
      url = 'https://cdn-icons-png.flaticon.com/512/833/833314.png';
      break;
    default:
      url = 'https://cdn-icons-png.flaticon.com/512/854/854878.png';
  }
  return new L.Icon({
    iconUrl: url,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

export const iconoVision = (angulo) => {
  const cx = 30;
  const cy = 30;
  const radio = 25;
  const apertura = 40;
  const anguloCorregido = -angulo + 90;
  const anguloCentral = anguloCorregido * (Math.PI / 180);
  const anguloIzq = anguloCentral - (apertura * Math.PI / 360);
  const anguloDer = anguloCentral + (apertura * Math.PI / 360);
  const x1 = cx + radio * Math.cos(anguloIzq);
  const y1 = cy - radio * Math.sin(anguloIzq);
  const x2 = cx + radio * Math.cos(anguloDer);
  const y2 = cy - radio * Math.sin(anguloDer);

  return L.divIcon({
    className: '',
    html: `
      <svg width="60" height="60" viewBox="0 0 60 60" style="display:block;">
        <defs>
          <radialGradient id="grad" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stop-color="#009FE3" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#009FE3" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="${cx}" cy="${cy}" r="25" fill="url(#grad)" stroke="#009FE3" stroke-width="1" opacity="0.4"/>
        <path d="M${cx},${cy} L${x1},${y1} A${radio},${radio} 0 0,1 ${x2},${y2} Z" fill="#009FE3" opacity="0.5" />
        <circle cx="${cx}" cy="${cy}" r="10" fill="#1976FF" stroke="#fff" stroke-width="3"/>
        <circle cx="${cx}" cy="${cy}" r="5" fill="#fff"/>
      </svg>
    `,
    iconSize: [60, 60],
    iconAnchor: [30, 30]
  });
};
