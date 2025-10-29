// src/features/home/HomePage.jsx
import HeroCarousel from './HeroCarousel';
import UpcomingEvents from './UpcomingEvents';
import AboutSection from './AboutSection';
import RecentActivities from './RecentActivities';
import JoinUsSection from './JoinUsSection';
import "./HomePage.css"; // Certifique-se que o CSS da HomePage está atualizado

function HomePage() {
  return (
    <div className="home-container">
      {/* A HomePage agora começa diretamente com o HeroCarousel */}
      <HeroCarousel />
      {/* A secção PhotoOfTheMonth foi removida daqui */}
      <UpcomingEvents />
      <AboutSection />
      <RecentActivities />
      <JoinUsSection />
      {/* O Footer será adicionado pelo AppLayout */}
    </div>
  );
}

export default HomePage;