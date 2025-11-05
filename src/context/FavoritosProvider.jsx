import { createContext, useState, useEffect } from 'react';

const FavoritosContext = createContext();

const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState({
    lugares: [],
    eventos: []
  });

  // Cargar favoritos del localStorage al iniciar
  useEffect(() => {
    const favoritosGuardados = localStorage.getItem('favoritos');
    if (favoritosGuardados) {
      try {
        setFavoritos(JSON.parse(favoritosGuardados));
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
      }
    }
  }, []);

  // Guardar en localStorage cuando cambien los favoritos
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  // Función para agregar a favoritos
  const agregarAFavoritos = (tipo, item) => {
    console.log('Agregando a favoritos:', tipo, item);
    setFavoritos(prev => ({
      ...prev,
      [tipo]: [...prev[tipo], item]
    }));
  };

  // Función para remover de favoritos
  const removerDeFavoritos = (tipo, itemId) => {
    console.log('Removiendo de favoritos:', tipo, itemId);
    setFavoritos(prev => ({
      ...prev,
      [tipo]: prev[tipo].filter(item => item.id !== itemId)
    }));
  };

  // Función legacy para lugares (mantener compatibilidad)
  const toggleLugarFavorito = (lugar) => {
    setFavoritos(prev => {
      const lugarExiste = prev.lugares.find(l => l.id === lugar.id);
      if (lugarExiste) {
        return {
          ...prev,
          lugares: prev.lugares.filter(l => l.id !== lugar.id)
        };
      }
      return {
        ...prev,
        lugares: [...prev.lugares, lugar]
      };
    });
  };

  const value = {
    favoritos,
    agregarAFavoritos,
    removerDeFavoritos,
    toggleLugarFavorito
  };

  return (
    <FavoritosContext.Provider value={value}>
      {children}
    </FavoritosContext.Provider>
  );
};

// Exportar solo el provider como default y el contexto para el hook
export default FavoritosProvider;
export { FavoritosContext };