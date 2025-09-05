import HeroCarousel from './HeroCarousel';
import { slidesData } from '../../data/slidesData'; // Importa os dados dos slides
import "./HomePage.css";

function HomePage() {
  // A lógica e a secção de eventos foram removidas.

  return (
    <div className="home-container">
      <HeroCarousel slides={slidesData} />
    </div>
  );
}

export default HomePage;