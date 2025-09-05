import { FaHeart, FaShareAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { eventsData } from '../../data/eventsData';
import './EventsPage.css';

function EventsPage() {
  const featuredEvent = eventsData.find(event => event.isFeatured);
  const otherEvents = eventsData.filter(event => !event.isFeatured);

  return (
    <div className="events-page">
      <div className="events-container">
        <header className="events-header">
          <h1>Eventos</h1>
          <button className="filter-button active">Próximos Eventos</button>
        </header>

        {/* Carrossel do Evento em Destaque */}
        <div className="featured-event-carousel">
          <div className="featured-slide" style={{ backgroundImage: `url(${featuredEvent.image})` }}>
            <div className="featured-content">
              <h2>{featuredEvent.title}</h2>
              <p>{featuredEvent.description}</p>
              <span>{featuredEvent.location}</span>
            </div>
          </div>
          <div className="featured-nav">
            <button><FaChevronLeft /></button>
            <div className="dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <button><FaChevronRight /></button>
          </div>
        </div>

        {/* Lista de Outros Eventos */}
        <div className="events-list">
          {otherEvents.map(event => (
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

        {/* Paginação */}
        <div className="pagination">
          <button><FaChevronLeft /></button>
          <button className="page-number active">1</button>
          <button className="page-number">2</button>
          <button className="page-number">3</button>
          <button><FaChevronRight /></button>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;