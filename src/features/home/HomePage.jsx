import HeroCarousel from './HeroCarousel';
import UpcomingEvents from './UpcomingEvents'; // 1. Importe o novo componente
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <HeroCarousel />
      <UpcomingEvents />
    </div>
  );
}

export default HomePage;