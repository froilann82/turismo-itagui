import { useContext } from 'react';
import { FavoritosContext } from './FavoritosProvider';

export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error('useFavoritos debe usarse dentro de FavoritosProvider');
  }
  return context;
};