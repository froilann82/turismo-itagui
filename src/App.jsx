import { BrowserRouter, Routes, Route } from "react-router-dom";
import FavoritosProvider from './context/FavoritosProvider'; // Cambiar a import default
import Home from './components/Home';
import Mapa from './components/Mapa';
import Eventos from './components/Eventos';
import Favoritos from './components/Favoritos';

function App() {
  return (
    <FavoritosProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </BrowserRouter>
    </FavoritosProvider>
  );
}

export default App;


