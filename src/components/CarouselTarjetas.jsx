import "../styles/CarouselTarjetas.css";

const tarjetas = [
  {
    categoria: "gastronomia",
    titulo: "Gastronomía",
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    descripcion: "Aquí encontrarás una variedad de platos típicos de la región.",
    rating: 4.7,
    personas: 50,
  },
  {
    categoria: "cultural",
    titulo: "Cultura",
    imagen: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    descripcion: "Explora la rica historia y tradiciones de Itagüí.",
    rating: 4.5,
    personas: 32,
  },
  {
    categoria: "aventura",
    titulo: "Aventura",
    imagen: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    descripcion: "Disfruta de actividades al aire libre y deportes.",
    rating: 4.8,
    personas: 41,
  },
  {
    categoria: "shopping",
    titulo: "Shopping",
    imagen: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    descripcion: "Descubre los mejores lugares para ir de compras en Itagüí.",
    rating: 4.6,
    personas: 28,
  },
];

export default function CarouselTarjetas({ onCardClick }) {
  return (
    <div className="carousel-tarjetas">
      {tarjetas.map((t, i) => (
        <div
          className="tarjeta-carousel"
          key={i}
          onClick={() => onCardClick && onCardClick(t.categoria)}
          style={{ cursor: "pointer" }}
        >
          <img src={t.imagen} alt={t.titulo} className="img-tarjeta" />
          <div className="info-tarjeta">
            <h3>{t.titulo}</h3>
            <div className="tarjeta-rating">
              <span>⭐ {t.rating}</span>
              <span className="tarjeta-personas">+{t.personas}</span>
            </div>
            <span className="tarjeta-desc">{t.descripcion}</span>
          </div>
        </div>
      ))}
    </div>
  );
}