import { eventsData } from '../../data/eventsData';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import './UpcomingEvents.css'; // Usaremos um CSS dedicado

function UpcomingEvents() {
  // Filtra apenas os eventos que não estão em destaque para a lista
  const upcomingEvents = eventsData.filter(event => !event.isFeatured);

  return (
    <section className="upcoming-events-section">
      <div className="events-container">
        <header className="events-header">
          <h1>Próximos Eventos</h1>
        </header>
        <div className="events-list">
          {upcomingEvents.map(event => (
            <div key={event.id} className="event-card">
              <img src={event.image} alt={event.title} className="event-image" />
              <div className="event-details">
                <div className="event-meta">
                  <span>{event.date}</span>
                  <span className="event-time">{event.time}</span>
                </div>
                <h3>{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <p className="event-location">{event.location}</p>
              </div>
              <div className="event-actions">
                <div className="interest-prompt">
                  <span>Tem interesse?</span>
                  <button className="learn-more-button">Saiba mais!</button>
                </div>
                <div className="social-buttons">
                  <button><FaHeart /> {event.likes}</button>
                  <button><FaShareAlt /></button>
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