import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Eventos.css";
import Navbar from './Navbar';
import BottomNav from "./BottomNav";
import { useFavoritos } from '../context/useFavoritos';

// API local con eventos reales de Itagüí
const eventos = [
  {
    id: 1,
    titulo: "Festival de la Guadua",
    descripcion: "Celebración anual de la tradición artesanal con la guadua",
    fecha: new Date(2025, 6, 15), // 15 de julio
    ubicacion: "Centro Cultural"
  },
  {
    id: 2,
    titulo: "Noche de Velitas",
    descripcion: "Tradicional celebración con luces y velas",
    fecha: new Date(2025, 11, 7), // 7 de diciembre
    ubicacion: "Plaza Principal"
  },
  {
    id: 3,
    titulo: "Festival de Cometas",
    descripcion: "Evento familiar con competencia de cometas",
    fecha: new Date(2025, 7, 12), // 12 de agosto
    ubicacion: "Parque Central"
  },
  {
    id: 4,
    titulo: "Feria de Emprendimiento",
    descripcion: "Muestra de productos locales y emprendimientos",
    fecha: new Date(2025, 8, 20), // 20 de septiembre
    ubicacion: "Casa de la Cultura"
  },
  {
    id: 5,
    titulo: "Concierto al Aire Libre",
    descripcion: "Presentación de música folclórica colombiana",
    fecha: new Date(2025, 6, 29), // 29 de julio (hoy)
    ubicacion: "Coliseo Municipal"
  }
];

export default function Eventos() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const { favoritos, agregarAFavoritos, removerDeFavoritos } = useFavoritos();

  // DEBUG: Logs para verificar el estado
  console.log('Estado de favoritos:', favoritos);
  console.log('Funciones disponibles:', { agregarAFavoritos, removerDeFavoritos });

  // Función para obtener eventos de una fecha específica
  const obtenerEventosPorFecha = (fecha) => {
    return eventos.filter(evento => 
      evento.fecha.toDateString() === fecha.toDateString()
    );
  };

  // Función para verificar si una fecha tiene eventos
  const tieneEventos = (fecha) => {
    return eventos.some(evento => 
      evento.fecha.toDateString() === fecha.toDateString()
    );
  };

  // Función para obtener próximos eventos
  const obtenerProximosEventos = () => {
    const hoy = new Date();
    return eventos
      .filter(evento => evento.fecha >= hoy)
      .sort((a, b) => a.fecha - b.fecha)
      .slice(0, 5);
  };

  // Función para verificar si un evento está en favoritos
  const esEventoFavorito = (eventoId) => {
    const resultado = favoritos.eventos?.some(evento => evento.id === eventoId) || false;
    console.log(`¿Evento ${eventoId} es favorito?`, resultado);
    return resultado;
  };

  // Función para manejar favoritos de eventos
  const manejarFavoritoEvento = (evento) => {
    console.log('Evento clickeado:', evento);
    
    const eventoParaFavoritos = {
      id: evento.id,
      nombre: evento.titulo,
      descripcion: evento.descripcion,
      fecha: evento.fecha.toLocaleDateString('es-ES'),
      ubicacion: evento.ubicacion,
      imagen: null
    };

    console.log('Evento para favoritos:', eventoParaFavoritos);
    console.log('¿Es favorito?', esEventoFavorito(evento.id));

    if (esEventoFavorito(evento.id)) {
      console.log('Removiendo de favoritos...');
      removerDeFavoritos('eventos', evento.id);
    } else {
      console.log('Agregando a favoritos...');
      agregarAFavoritos('eventos', eventoParaFavoritos);
    }
  };

  const eventosDelDia = obtenerEventosPorFecha(fechaSeleccionada);
  const proximosEventos = obtenerProximosEventos();

  return (
    <div>
      <Navbar />
      
      <div className="eventos-container">
        <div className="eventos-header">
          <h1 className="eventos-title">
            Eventos en Itagüí
          </h1>
          <p className="eventos-subtitle">
            Descubre las actividades y celebraciones de nuestra ciudad
          </p>
        </div>

        <div className="eventos-grid">
          
          {/* Calendario */}
          <div className="eventos-card">
            <h3 className="calendario-icon">📅 Calendario de Eventos</h3>
            <Calendar
              onChange={setFechaSeleccionada}
              value={fechaSeleccionada}
              locale="es-ES"
              tileClassName={({ date }) => {
                if (tieneEventos(date)) {
                  return 'tiene-eventos';
                }
                return null;
              }}
            />
          </div>

          {/* Eventos del día seleccionado */}
          <div className="eventos-card">
            <h3 className="eventos-dia-icon">
              🎯 Eventos del {fechaSeleccionada.toLocaleDateString('es-ES')}
            </h3>
            
            <div className="eventos-del-dia">
              {eventosDelDia.length > 0 ? (
                eventosDelDia.map(evento => (
                  <div key={evento.id} className="evento-item">
                    <div className="evento-content">
                      <h4 className="evento-titulo">
                        {evento.titulo}
                      </h4>
                      <p className="evento-descripcion">
                        {evento.descripcion}
                      </p>
                      <p className="evento-ubicacion">
                        📍 {evento.ubicacion}
                      </p>
                    </div>
                    <button
                      className={`btn-favorito ${esEventoFavorito(evento.id) ? 'favorito-activo' : ''}`}
                      onClick={() => manejarFavoritoEvento(evento)}
                      title={esEventoFavorito(evento.id) ? 'Remover de favoritos' : 'Agregar a favoritos'}
                    >
                      {esEventoFavorito(evento.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                ))
              ) : (
                <div className="no-eventos">
                  <p>No hay eventos programados para esta fecha.</p>
                </div>
              )}
            </div>
          </div>

          {/* Próximos eventos */}
          <div className="eventos-card proximos-eventos">
            <h3 className="proximos-icon">⏰ Próximos Eventos</h3>
            <div className="proximos-eventos-grid">
              {proximosEventos.map(evento => (
                <div key={evento.id} className="proximo-evento-card">
                  <div className="proximo-evento-content">
                    <div className="proximo-evento-fecha">
                      {evento.fecha.toLocaleDateString('es-ES')}
                    </div>
                    <h4 className="proximo-evento-titulo">
                      {evento.titulo}
                    </h4>
                    <p className="proximo-evento-descripcion">
                      {evento.descripcion}
                    </p>
                    <p className="proximo-evento-ubicacion">
                      📍 {evento.ubicacion}
                    </p>
                  </div>
                  <button
                    className={`btn-favorito ${esEventoFavorito(evento.id) ? 'favorito-activo' : ''}`}
                    onClick={() => manejarFavoritoEvento(evento)}
                    title={esEventoFavorito(evento.id) ? 'Remover de favoritos' : 'Agregar a favoritos'}
                  >
                    {esEventoFavorito(evento.id) ? '❤️' : '🤍'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
