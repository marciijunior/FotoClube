import { eventsData } from "../../data/eventsData";
import {
  FaHeart,
  FaShareAlt,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaBookmark,
} from "react-icons/fa";
import "./UpcomingEvents.css";

function UpcomingEvents() {
  const featuredEvent = eventsData.find((event) => event.isFeatured);
  const otherEvents = eventsData.filter((event) => !event.isFeatured);

  return (
    <section className="upcoming-events-section">
      <div className="polaroid-container">
        {featuredEvent && (
          <div className="featured-event-carousel">
            {/* MUDANÇA: O cabeçalho com o botão foi movido para DENTRO do carrossel */}
            <header className="events-header">
              <button className="filter-button">Próximos Evento</button>
            </header>

            <div
              className="featured-slide"
              style={{ backgroundImage: `url(${featuredEvent.image})` }}
            >
              <div className="featured-content">
                <h3>{featuredEvent.title}</h3>
                <p>{featuredEvent.description}</p>
                <span>
                  <FaMapMarkerAlt /> {featuredEvent.location}
                </span>
              </div>
            </div>
            <div className="featured-nav">
              <button className="arrow">
                <FaChevronLeft />
              </button>
              <div className="dots">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <button className="arrow">
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}

        <div className="events-list">
          {otherEvents.map((event) => (
            <div key={event.id} className="event-card">
              <img
                src={event.image}
                alt={event.title}
                className="event-image"
              />
              <div className="event-details">
                <div className="event-meta">
                  <span className="pill date-pill">{event.date}</span>
                  <span className="pill time-pill">{event.time}</span>
                </div>
                <h4>{event.title}</h4>
                <p className="event-description">{event.description}</p>
                <p className="event-location">
                  <FaMapMarkerAlt />
                  {event.location}
                </p>
              </div>
              <div className="event-actions">
                <div className="interest-prompt">
                  <span>Tem interesse?</span>
                  <button className="learn-more-button">Saiba mais!</button>
                </div>
                <div className="social-buttons">
                  <button>
                    <FaHeart /> {event.likes}
                  </button>
                  <button>
                    <FaShareAlt />
                  </button>
                  <button>
                    <FaBookmark />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;
