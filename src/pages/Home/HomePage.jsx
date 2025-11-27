import HeroCarousel from './HeroCarousel';
import UpcomingEvents from './UpcomingEvents';
import AboutSection from './AboutSection';
import RecentActivities from './RecentActivities';
import JoinUsSection from './JoinUsSection';
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <HeroCarousel />
      <UpcomingEvents />
      <AboutSection/>
      <RecentActivities />
      <JoinUsSection />
    </div>
  );
}

export default HomePage;