import React from 'react';

const CategoryCarousel = ({ categoriaSeleccionada, setCategoriaSeleccionada }) => {
  return (
    <div className="carrusel-mapa">
      <button className={`categoria-btn${categoriaSeleccionada === 'gastronomia' ? ' activa' : ''}`} onClick={() => setCategoriaSeleccionada('gastronomia')}>🍽️ Gastronomía</button>
      <button className={`categoria-btn${categoriaSeleccionada === 'cultural' ? ' activa' : ''}`} onClick={() => setCategoriaSeleccionada('cultural')}>🏛️ Cultura</button>
      <button className={`categoria-btn${categoriaSeleccionada === 'aventura' ? ' activa' : ''}`} onClick={() => setCategoriaSeleccionada('aventura')}>🌿 Aventura</button>
      <button className={`categoria-btn${categoriaSeleccionada === 'shopping' ? ' activa' : ''}`} onClick={() => setCategoriaSeleccionada('shopping')}>🛍️ Shopping</button>
    </div>
  );
};

export default CategoryCarousel;
