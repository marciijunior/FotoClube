// src/features/home/HomePage.jsx
import HeroCarousel from './HeroCarousel';
import UpcomingEvents from './UpcomingEvents';
import AboutSection from './AboutSection';
import RecentActivities from './RecentActivities'; 
import JoinUsSection from './JoinUsSection'; // 1. Importe a nova seção
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <HeroCarousel />
      <UpcomingEvents />
      <AboutSection />
      <RecentActivities />
      <JoinUsSection /> {/* 2. Adicione a nova seção aqui */}
    </div>
  );
}

export default HomePage;