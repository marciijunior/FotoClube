// src/features/home/HomePage.jsx
import HeroCarousel from './HeroCarousel';
import UpcomingEvents from './UpcomingEvents';
import AboutSection from './AboutSection';
import RecentActivities from './RecentActivities'; // 1. Importe aqui
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <HeroCarousel />
      <UpcomingEvents />
      <AboutSection />
      <RecentActivities /> {/* 2. Adicione aqui */}
    </div>
  );
}

export default HomePage;