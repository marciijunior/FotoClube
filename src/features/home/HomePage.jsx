// src/features/home/HomePage.jsx
import HeroCarousel from './HeroCarousel';
import PhotoOfTheMonth from './PhotoOfTheMonth'; // 1. Importe o novo componente
import UpcomingEvents from './UpcomingEvents';
import AboutSection from './AboutSection';
import RecentActivities from './RecentActivities';
import JoinUsSection from './JoinUsSection';
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <HeroCarousel />
      <PhotoOfTheMonth /> {/* 2. Adicione a nova secção aqui */}
      <UpcomingEvents />
      <AboutSection />
      <RecentActivities />
      <JoinUsSection />
    </div>
  );
}

export default HomePage;