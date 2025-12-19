import HeroCarousel from "./HeroCarousel";
import UpcomingEvents from "./UpcomingEvents";
import AboutSection from "./AboutSection";
import RecentActivities from "../Eventos/RecentActivities";
import JoinUsSection from "./JoinUsSection";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <HeroCarousel />
      <UpcomingEvents />
      <AboutSection />
      <RecentActivities limit={8} />
      <JoinUsSection />
    </div>
  );
}

export default HomePage;
