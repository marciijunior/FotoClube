import HeroCarousel from "./HeroCarousel";
import UpcomingEvents from "./UpcomingEvents";
import AboutSection from "./AboutSection";
import EventUpdates from "../Eventos/EventUpdates";
import JoinUsSection from "./JoinUsSection";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <HeroCarousel />
      <UpcomingEvents />
      <AboutSection />
      <EventUpdates limit={8} />
      <JoinUsSection />
    </div>
  );
}

export default HomePage;
