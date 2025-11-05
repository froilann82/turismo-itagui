import { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Mapa.css';
import Navbar from './Navbar';
import LugarCard from './LugarCard';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import BottomNav from "./BottomNav";
import { useFavoritos } from '../context/useFavoritos';
import CentrarMapa from './CentrarMapa';
import { obtenerIcono, centro, estaEnItagui } from './mapaUtils';
import UserMarker from './UserMarker';
import TransportControls from './TransportControls';
import CategoryCarousel from './CategoryCarousel';
import ExpandedLugarCard from './ExpandedLugarCard';

// helper functions, icons and constants moved to ./mapaUtils.js

const Mapa = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoriaURL = params.get("categoria");
  const { favoritos, toggleLugarFavorito } = useFavoritos();

  const [lugares, setLugares] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaURL || 'gastronomia');
  const [errorCarga, setErrorCarga] = useState(null);
  const [lugarExpandido, setLugarExpandido] = useState(null); // Estado para la tarjeta expandida

  // Persistir ubicación del usuario en localStorage
  const [ubicacionUsuario, setUbicacionUsuario] = useState(() => {
    const ubicacionGuardada = localStorage.getItem('ubicacionUsuario');
    return ubicacionGuardada ? JSON.parse(ubicacionGuardada) : null;
  });
  const [ruta, setRuta] = useState(null);
  const [duracion, setDuracion] = useState(null);
  const [tipoTransporte, setTipoTransporte] = useState('foot'); // foot, driving, cycling
  const [distancia, setDistancia] = useState(null);
  const [destinoActual, setDestinoActual] = useState(null); // Para recalcular ruta al cambiar transporte
  const [lugarConRuta, setLugarConRuta] = useState(null); // ID del lugar que tiene ruta activa
  const [sitiosOSM, setSitiosOSM] = useState([]);
  const [centroMapa, setCentroMapa] = useState(() => {
    const ubicacionGuardada = localStorage.getItem('ubicacionUsuario');
    return ubicacionGuardada ? JSON.parse(ubicacionGuardada) : centro;
  });
  const [direccionUsuario, setDireccionUsuario] = useState("");
  const [municipioUsuario, setMunicipioUsuario] = useState("");
  const [barrioUsuario, setBarrioUsuario] = useState("");
  const [orientacion, setOrientacion] = useState(0);
  const [direccionBrujula, setDireccionBrujula] = useState("");
  const [permisosBrujula, setPermisosBrujula] = useState(false);
  const [esiOS, setEsiOS] = useState(false);
  const [esChromeIOS, setEsChromeIOS] = useState(false);

  // Función para convertir grados a dirección cardinal exacta con emojis
  const obtenerDireccionCardinal = (grados) => {
    // Simplificar - usar el ángulo directo sin complicaciones
    const angulo = ((grados % 360) + 360) % 360;
    
    if (angulo >= 337.5 || angulo < 22.5) return "⬆️ Norte";
    if (angulo >= 22.5 && angulo < 67.5) return "↗️ Noreste";
    if (angulo >= 67.5 && angulo < 112.5) return "➡️ Este";
    if (angulo >= 112.5 && angulo < 157.5) return "↘️ Sureste";
    if (angulo >= 157.5 && angulo < 202.5) return "⬇️ Sur";
    if (angulo >= 202.5 && angulo < 247.5) return "↙️ Suroeste";
    if (angulo >= 247.5 && angulo < 292.5) return "⬅️ Oeste";
    if (angulo >= 292.5 && angulo < 337.5) return "↖️ Noroeste";
    
    return "⬆️ Norte"; // Fallback
  };

  useEffect(() => {
    let intervalId;
    if (navigator.geolocation) {
      // Configuración específica para iOS/iPhone
      const opciones = {
        enableHighAccuracy: true,
        maximumAge: 0, // No usar cache
        timeout: 30000 // Mayor timeout para iOS
      };

      // Primera obtención de ubicación
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const nuevaUbicacion = [pos.coords.latitude, pos.coords.longitude];
          setUbicacionUsuario(nuevaUbicacion);
          setCentroMapa(nuevaUbicacion);
          // Guardar ubicación en localStorage
          localStorage.setItem('ubicacionUsuario', JSON.stringify(nuevaUbicacion));
          console.log('Ubicación obtenida:', nuevaUbicacion);
        },
        (error) => {
          console.error('Error de geolocalización:', error);
          setUbicacionUsuario(null);
          // Si falla, usar centro de Itagüí
          setCentroMapa(centro);
          localStorage.removeItem('ubicacionUsuario');
          
          // Mostrar mensaje específico del error
          if (error.code === 1) {
            alert('Por favor, permite el acceso a la ubicación en la configuración de tu navegador');
          }
        },
        opciones
      );
      
      // Actualizar ubicación cada 3 segundos (menos frecuente para iOS)
      intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const nuevaUbicacion = [pos.coords.latitude, pos.coords.longitude];
            setUbicacionUsuario(nuevaUbicacion);
            // Actualizar localStorage
            localStorage.setItem('ubicacionUsuario', JSON.stringify(nuevaUbicacion));
          },
          (error) => {
            console.error('Error actualizando ubicación:', error);
          },
          { 
            enableHighAccuracy: true, 
            maximumAge: 2000, // Permitir cache más reciente
            timeout: 15000 
          }
        );
      }, 3000); // Cada 3 segundos en lugar de 2
    } else {
      console.error('Geolocalización no soportada');
      // Si no hay geolocalización, usar centro de Itagüí
      setCentroMapa(centro);
      localStorage.removeItem('ubicacionUsuario');
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    fetch('/datos.json')
      .then(response => response.json())
      .then(data => {
        const datos = data[categoriaSeleccionada] || [];
        setLugares(datos);
        setErrorCarga(null);
      })
      .catch(error => {
        console.error('Error al cargar los datos:', error);
        setErrorCarga('No se pudieron cargar los lugares.');
      });
  }, [categoriaSeleccionada]);

  useEffect(() => {
    const overpassUrl = "https://overpass-api.de/api/interpreter";
    const bbox = "6.145,-75.65,6.195,-75.57";
    const query = `
      [out:json][timeout:30];
      (
        node["amenity"="restaurant"](${bbox});
        way["amenity"="restaurant"](${bbox});
        relation["amenity"="restaurant"](${bbox});
        node["amenity"="cafe"](${bbox});
        way["amenity"="cafe"](${bbox});
        node["amenity"="bar"](${bbox});
        way["amenity"="bar"](${bbox});
        node["amenity"="fast_food"](${bbox});
        way["amenity"="fast_food"](${bbox});
        node["tourism"="museum"](${bbox});
        way["tourism"="museum"](${bbox});
        node["amenity"="theatre"](${bbox});
        way["amenity"="theatre"](${bbox});
        node["amenity"="library"](${bbox});
        way["amenity"="library"](${bbox});
        node["historic"](${bbox});
        way["historic"](${bbox});
        node["amenity"="place_of_worship"](${bbox});
        way["amenity"="place_of_worship"](${bbox});
        node["leisure"="park"](${bbox});
        way["leisure"="park"](${bbox});
        node["leisure"="playground"](${bbox});
        way["leisure"="playground"](${bbox});
        node["leisure"="sports_centre"](${bbox});
        way["leisure"="sports_centre"](${bbox});
        node["tourism"="attraction"](${bbox});
        way["tourism"="attraction"](${bbox});
        node["shop"](${bbox});
        way["shop"](${bbox});
        node["amenity"="marketplace"](${bbox});
        way["amenity"="marketplace"](${bbox});
      );
      out center;
    `;

    axios.post(overpassUrl, query, { headers: { "Content-Type": "text/plain" } })
      .then(res => {
        const elements = res.data.elements.map(el => {
          let categoria = 'gastronomia';
          let nombre = 'Lugar de interés';
          let descripcion = 'Sitio de OpenStreetMap';
          if (el.tags) {
            if (el.tags.amenity === 'restaurant' || el.tags.amenity === 'cafe' || el.tags.amenity === 'bar' || el.tags.amenity === 'fast_food') {
              categoria = 'gastronomia';
              nombre = el.tags.name || (el.tags.amenity === 'restaurant' ? 'Restaurante' : el.tags.amenity === 'cafe' ? 'Café' : el.tags.amenity === 'bar' ? 'Bar' : 'Comida rápida');
              descripcion = el.tags.cuisine || 'Establecimiento gastronómico';
            } else if (el.tags.tourism === 'museum' || el.tags.amenity === 'theatre' || el.tags.amenity === 'library' || el.tags.historic || el.tags.amenity === 'place_of_worship') {
              categoria = 'cultural';
              nombre = el.tags.name || (el.tags.tourism === 'museum' ? 'Museo' : el.tags.amenity === 'theatre' ? 'Teatro' : el.tags.amenity === 'library' ? 'Biblioteca' : el.tags.historic ? 'Sitio histórico' : 'Lugar de culto');
              descripcion = el.tags.description || 'Sitio cultural';
            } else if (el.tags.leisure === 'park' || el.tags.leisure === 'playground' || el.tags.leisure === 'sports_centre' || el.tags.tourism === 'attraction') {
              categoria = 'aventura';
              nombre = el.tags.name || (el.tags.leisure === 'park' ? 'Parque' : el.tags.leisure === 'playground' ? 'Zona de juegos' : el.tags.leisure === 'sports_centre' ? 'Centro deportivo' : 'Atracción turística');
              descripcion = el.tags.description || 'Área recreativa';
            } else if (el.tags.shop || el.tags.amenity === 'marketplace') {
              categoria = 'shopping';
              nombre = el.tags.name || (el.tags.shop ? 'Tienda' : 'Mercado');
              descripcion = el.tags.shop ? `Tienda de ${el.tags.shop}` : 'Centro comercial';
            }
            if (el.tags.name) nombre = el.tags.name;
          }
          return {
            id: el.id,
            nombre,
            lat: el.lat || (el.center && el.center.lat),
            lng: el.lon || (el.center && el.center.lon),
            categoria,
            descripcion,
            imagen: './Restaurante.png'
          };
        });

        const sitiosEnItagui = elements.filter(sitio => sitio.lat && sitio.lng && estaEnItagui(sitio.lat, sitio.lng));
        setSitiosOSM(sitiosEnItagui);
      })
      .catch(err => console.error('Error cargando sitios OSM:', err));
  }, []);

  const sitiosOSMItagui = sitiosOSM.filter((sitio) => sitio.lat && sitio.lng && estaEnItagui(sitio.lat, sitio.lng) && sitio.categoria === categoriaSeleccionada);

  // Logs para debug
  console.log(`🎯 Categoría seleccionada: ${categoriaSeleccionada}`);
  console.log(`📊 Total sitios OSM cargados: ${sitiosOSM.length}`);
  console.log(`✨ Sitios filtrados para categoría "${categoriaSeleccionada}": ${sitiosOSMItagui.length}`);
  if (sitiosOSMItagui.length > 0) {
    console.log('🗺️ Sitios que se mostrarán:', sitiosOSMItagui);
  }

  const obtenerRutaOSRM = async (origen, destino, transporte = 'foot') => {
    // Mapear tipos de transporte a servicios OSRM
    const servicios = {
      foot: 'foot',        // A pie
      driving: 'driving',  // En carro
      cycling: 'cycling'   // En bicicleta/moto
    };
    
    const servicio = servicios[transporte] || 'foot';
    const url = `https://router.project-osrm.org/route/v1/${servicio}/${origen[1]},${origen[0]};${destino[1]},${destino[0]}?overview=full&geometries=geojson`;
    
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo ruta:', error);
      return null;
    }
  };

  const handleIndicaciones = useCallback(async (destino, transporte = tipoTransporte, lugarId = null) => {
    const origen = ubicacionUsuario || centro;
    setDestinoActual(destino); // Guardar destino para recalcular si cambia transporte
    setLugarConRuta(lugarId); // Guardar ID del lugar que tiene ruta activa
    const data = await obtenerRutaOSRM(origen, destino, transporte);
    if (data && data.routes && data.routes.length > 0) {
      const coords = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      setRuta(coords);
      setDuracion(Math.round(data.routes[0].duration / 60));
      setDistancia(Math.round(data.routes[0].distance / 1000 * 100) / 100); // km con 2 decimales
    }
  }, [ubicacionUsuario, tipoTransporte]);

  // Funciones para manejar la tarjeta expandida
  const handleExpandirLugar = (lugar) => {
    setLugarExpandido(lugar);
    document.body.style.overflow = 'hidden';
  };

  const handleCerrarLugar = () => {
    setLugarExpandido(null);
    document.body.style.overflow = 'auto';
  };

  // Función para cambiar tipo de transporte y recalcular ruta si existe
  const cambiarTipoTransporte = (nuevoTipo) => {
    setTipoTransporte(nuevoTipo);
    // Si hay una ruta activa, recalcularla con el nuevo tipo
    if (destinoActual && ruta) {
      handleIndicaciones(destinoActual, nuevoTipo, lugarConRuta);
    }
  };

  useEffect(() => {
    if (ubicacionUsuario) {
      // Primero intentar con zoom más alto para obtener más detalles
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${ubicacionUsuario[0]}&lon=${ubicacionUsuario[1]}&zoom=16&addressdetails=1&extratags=1`)
        .then(res => res.json())
        .then(data => {
          console.log('Datos de ubicación completos:', data); // Para debugging
          const address = data.address || {};
          
          // Obtener municipio/ciudad
          const municipio = 
            address.city ||
            address.town ||
            address.municipality ||
            address.village ||
            address.county ||
            "Municipio desconocido";
          
          // Búsqueda más exhaustiva del barrio
          let barrio =
            address.neighbourhood ||
            address.suburb ||
            address.quarter ||
            address.district ||
            address.residential ||
            address.hamlet ||
            address.locality ||
            data.display_name?.split(',')[1]?.trim() || // Segundo elemento del nombre completo
            null;
          
          // Obtener la calle/dirección específica
          const calle = 
            (address.house_number && address.road ? `${address.house_number} ${address.road}` : address.road) ||
            data.display_name?.split(',')[0]?.trim() ||
            "Dirección no identificada";
          
          console.log('Información extraída:');
          console.log('- Municipio:', municipio);
          console.log('- Barrio:', barrio);
          console.log('- Calle:', calle);
          
          // Si no encontramos barrio, intentar con otra API como respaldo
          if (!barrio) {
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${ubicacionUsuario[0]}&longitude=${ubicacionUsuario[1]}&localityLanguage=es`)
              .then(res2 => res2.json())
              .then(data2 => {
                console.log('Datos BigDataCloud:', data2); // Para debugging
                const barrioAlterno = 
                  data2.locality ||
                  data2.localityInfo?.administrative?.[3]?.name ||
                  data2.localityInfo?.administrative?.[2]?.name ||
                  "Barrio no identificado";
                
                // Crear dirección completa con calle, barrio y municipio
                const direccionCompleta = calle;
                
                setMunicipioUsuario(municipio);
                setBarrioUsuario(barrioAlterno);
                setDireccionUsuario(direccionCompleta);
              })
              .catch(() => {
                // Si falla la segunda API, usar lo que tenemos
                const direccionCompleta = calle;
                
                setMunicipioUsuario(municipio);
                setBarrioUsuario("Barrio no identificado");
                setDireccionUsuario(direccionCompleta);
              });
          } else {
            // Si encontramos barrio en la primera API, usarlo
            const direccionCompleta = calle;
            
            setMunicipioUsuario(municipio);
            setBarrioUsuario(barrio);
            setDireccionUsuario(direccionCompleta);
          }
        })
        .catch(() => {
          setMunicipioUsuario("Municipio desconocido");
          setBarrioUsuario("Barrio desconocido");
          setDireccionUsuario("Ubicación desconocida");
        });
    }
  }, [ubicacionUsuario]);

  useEffect(() => {
    // Detectar si es iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setEsiOS(isIOS);

    // Detectar si es Chrome en iOS
    const isChromeIOS = isIOS && /CriOS/.test(navigator.userAgent);
    setEsChromeIOS(isChromeIOS);

    const handleOrientation = (event) => {
      if (event.alpha !== null) {
        let anguloFinal = event.alpha;
        
        // Para iOS/iPhone - manejar diferentes casos
        if (event.webkitCompassHeading !== undefined) {
          // iOS Safari tiene webkitCompassHeading (más preciso)
          anguloFinal = event.webkitCompassHeading;
        } else if (isIOS) {
          // iOS sin webkitCompassHeading
          anguloFinal = event.alpha;
        } else {
          // Android/otros dispositivos
          anguloFinal = 360 - event.alpha;
        }
        
        setOrientacion(anguloFinal);
        const direccionCardinal = obtenerDireccionCardinal(anguloFinal);
        setDireccionBrujula(direccionCardinal);
      }
    };

    // Función para solicitar permisos en iOS
    const solicitarPermisosOrientacion = async () => {
      if (isIOS && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            console.log('Permisos de orientación concedidos en iOS');
            setPermisosBrujula(true);
            // Agregar listeners después de obtener permisos
            window.addEventListener('deviceorientationabsolute', handleOrientation, true);
            window.addEventListener('deviceorientation', handleOrientation, true);
          } else {
            console.log('Permisos de orientación denegados en iOS');
            setPermisosBrujula(false);
          }
        } catch (error) {
          console.error('Error solicitando permisos de orientación:', error);
          setPermisosBrujula(false);
        }
      } else {
        // No es iOS o no necesita permisos
        setPermisosBrujula(true);
        window.addEventListener('deviceorientationabsolute', handleOrientation, true);
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    };

    // Solicitar permisos automáticamente
    solicitarPermisosOrientacion();
    
    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  // Función para activar brújula manualmente (especialmente para iOS)
  const activarBrujula = async () => {
    if (esiOS && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        // Solicitar permisos de orientación
        const orientationPermission = await DeviceOrientationEvent.requestPermission();
        
        // También solicitar permisos de motion si está disponible
        let motionPermission = 'granted';
        if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
          motionPermission = await DeviceMotionEvent.requestPermission();
        }
        
        if (orientationPermission === 'granted' && motionPermission === 'granted') {
          setPermisosBrujula(true);
          console.log('Brújula activada en iOS');
          
          const handleOrientation = (event) => {
            if (event.alpha !== null) {
              let anguloFinal = event.alpha;
              
              if (event.webkitCompassHeading !== undefined) {
                anguloFinal = event.webkitCompassHeading;
              }
              
              setOrientacion(anguloFinal);
              const direccionCardinal = obtenerDireccionCardinal(anguloFinal);
              setDireccionBrujula(direccionCardinal);
            }
          };
          
          window.addEventListener('deviceorientationabsolute', handleOrientation, true);
          window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
          alert('Se necesitan permisos de orientación para usar la brújula');
        }
      } catch (error) {
        console.error('Error activando brújula:', error);
        alert('Error al activar la brújula. Verifica la configuración de tu navegador.');
      }
    }
  };


  // Combinar lugares propios y OSM para el buscador
  const lugaresParaNavbar = [
    ...lugares,
    ...sitiosOSMItagui
  ];

  // Función para centrar el mapa en el lugar seleccionado desde el buscador
  const handleLugarSeleccionado = (lugar) => {
    if (lugar.lat && lugar.lng) {
      setCentroMapa([lugar.lat, lugar.lng]);
      setTimeout(() => {
        setLugarExpandido(lugar);
      }, 200); // Pequeño delay para asegurar que el mapa se centre antes de expandir
    }
  };

  return (
    <div className="contenedor-mapa">
      <Navbar lugares={lugaresParaNavbar} onLugarSeleccionado={handleLugarSeleccionado} categoriaSeleccionada={categoriaSeleccionada} />

      <CategoryCarousel categoriaSeleccionada={categoriaSeleccionada} setCategoriaSeleccionada={setCategoriaSeleccionada} />

      {errorCarga && <div style={{ color: 'red', background: '#fff3f3', padding: 10, margin: 10, borderRadius: 6 }}>{errorCarga}</div>}

      {esChromeIOS && (
        <div style={{ background: '#FF6B35', color: 'white', padding: '12px', margin: '10px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '4px' }}>🧭 Brújula no disponible</div>
          <div style={{ fontSize: '0.9rem' }}>Para usar la brújula en iPhone, abre esta página en Safari en lugar de Chrome</div>
        </div>
      )}

      {esiOS && !esChromeIOS && !permisosBrujula && (
        <div style={{ background: '#009FE3', color: 'white', padding: '12px', margin: '10px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }} onClick={activarBrujula}>
          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '4px' }}>🧭 Activar Brújula</div>
          <div style={{ fontSize: '0.9rem' }}>Toca aquí para habilitar la dirección en tu iPhone</div>
        </div>
      )}

      <MapContainer center={centroMapa} zoom={18} className="mapa-leaflet" style={{ flex: 1 }} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors' />

        <CentrarMapa coordenadas={centroMapa} ubicacionUsuario={ubicacionUsuario} />

        <UserMarker ubicacionUsuario={ubicacionUsuario} municipioUsuario={municipioUsuario} barrioUsuario={barrioUsuario} direccionUsuario={direccionUsuario} orientacion={orientacion} direccionBrujula={direccionBrujula} />

        {lugares.map((lugar, index) => (
          <LugarCard key={lugar.id ? `propio-${lugar.id}` : `propio-${index}`} lugar={lugar} icono={obtenerIcono(categoriaSeleccionada)} onIndicaciones={() => handleIndicaciones([lugar.lat, lugar.lng], tipoTransporte, lugar.id || `propio-${index}`)} onExpandir={() => handleExpandirLugar(lugar)} minutos={lugarConRuta === (lugar.id || `propio-${index}`) && ruta ? duracion : null} tipoTransporte={tipoTransporte} />
        ))}

        {sitiosOSMItagui.map((lugar) => (
          <LugarCard key={`osm-${lugar.id}`} lugar={lugar} icono={obtenerIcono(lugar.categoria)} onIndicaciones={() => handleIndicaciones([lugar.lat, lugar.lng], tipoTransporte, `osm-${lugar.id}`)} onExpandir={() => handleExpandirLugar(lugar)} minutos={lugarConRuta === `osm-${lugar.id}` && ruta ? duracion : null} tipoTransporte={tipoTransporte} />
        ))}

        {ruta && <Polyline positions={ruta} color="#009FE3" weight={6} />}
      </MapContainer>

      <TransportControls tipoTransporte={tipoTransporte} cambiarTipoTransporte={cambiarTipoTransporte} />

      <ExpandedLugarCard lugarExpandido={lugarExpandido} favoritos={favoritos} toggleLugarFavorito={toggleLugarFavorito} handleCerrarLugar={handleCerrarLugar} handleIndicaciones={handleIndicaciones} tipoTransporte={tipoTransporte} ruta={ruta} duracion={duracion} distancia={distancia} lugares={lugares} />

      <BottomNav />
    </div>
  );
};

export default Mapa;
