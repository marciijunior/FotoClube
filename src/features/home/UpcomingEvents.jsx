// src/features/home/UpcomingEvents.jsx
import React, { useState, useMemo } from 'react';
import { eventsData } from "../../data/eventsData";
import { recentActivitiesData } from '../../data/recentActivitiesData';
import { 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaArrowRight,
  FaRegClock,
  FaUserFriends,
  FaClock // NOVO: Ícone de Horário
} from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./UpcomingEvents.css";

// --- DADOS FICTÍCIOS ADICIONAIS (Mantidos) ---
const extraEventData = {
  "E001": { category: "Workshop", spots: 5, countdown: "Faltam 12 dias" },
  "E002": { category: "Passeio Fotográfico", spots: 20, countdown: "Faltam 19 dias" },
  "E003": { category: "Palestra Online", spots: 50, countdown: "Faltam 25 dias" },
  "E004": { category: "Exposição", spots: null, countdown: "Começa em 30 dias" },
  "E005": { category: "Workshop", spots: 3, countdown: "Faltam 32 dias" },
};
// --- FIM DOS DADOS FICTÍCIOS ---

function UpcomingEvents() {
  const nextEvents = eventsData.slice(0, 4);
  const [activeEventId, setActiveEventId] = useState(nextEvents.length > 0 ? nextEvents[0].id : null);
  const placeholderImage = "/src/assets/images/placeholder-event.png";

  const pastEvents = recentActivitiesData.slice(0, 8);

  const activeEvent = useMemo(() => {
    const event = nextEvents.find(e => e.id === activeEventId);
    if (!event) return null;
    return { ...event, ...extraEventData[event.id] };
  }, [activeEventId, nextEvents]);

  if (nextEvents.length === 0) {
    return null;
  }

  return (
    <section className="upcoming-events-section">
      <div className="upcoming-events-container">
        <div className="polaroid-container">
          
          <h2 className="section-title">Próximos Eventos</h2>

          {/* --- O "HUB" INTERATIVO (Mantido) --- */}
          <div className="ph-grid">
            
            {/* COLUNA 1: LISTA */}
            <div className="ph-col-list">
              <div className="ph-list-scroll">
                {nextEvents.map((event) => (
                  <button
                    key={event.id}
                    className={`ph-list-item ${event.id === activeEventId ? 'active' : ''}`}
                    onMouseEnter={() => setActiveEventId(event.id)}
                  >
                    <div className="ph-item-date">
                      <span>{event.date.day}</span>
                      <span>{event.date.month}</span>
                    </div>
                    <div className="ph-item-info">
                      <span className="ph-item-category">
                        {extraEventData[event.id]?.category || 'Evento'}
                      </span>
                      <h4 className="ph-item-title">{event.title}</h4>
                    </div>
                  </button>
                ))}
              </div>
              <Link to="/eventos" className="ph-all-events-link">
                Ver todos os eventos <FaArrowRight />
              </Link>
            </div>

            {/* COLUNA 2: IMAGEM */}
            <div className="ph-col-image">
              {nextEvents.map((event) => (
                <div
                  key={event.id}
                  className={`ph-bg-image ${event.id === activeEventId ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${event.image})` }}
                  onError={(e) => { e.target.style.backgroundImage = `url(${placeholderImage})`; }}
                ></div>
              ))}
            </div>

            {/* COLUNA 3: DETALHES */}
            <div className="ph-col-details">
              {activeEvent && (
                <div className="ph-details-content" key={activeEvent.id}>
                  <h3 className="ph-details-title">{activeEvent.title}</h3>
                  <p className="ph-details-location"><FaMapMarkerAlt /> {activeEvent.location}</p>
                  
                  {/* --- NOVO: Horário do Evento --- */}
                  <p className="ph-details-time">
                    <FaClock /> {activeEvent.time}
                  </p>
                  {/* --- FIM DA MUDANÇA --- */}

                  <p className="ph-details-description">{activeEvent.description}</p>
                  
                  {activeEvent.spots !== null && (
                    <div className={`ph-spots ${activeEvent.spots < 10 ? 'low' : ''}`}>
                      <FaUserFriends />
                      {activeEvent.spots > 0 
                        ? `Apenas ${activeEvent.spots} vagas restantes!`
                        : "Vagas Esgotadas"}
                    </div>
                  )}
                  <Link to={`/eventos/${activeEvent.id}`} className="ph-details-cta">Saber Mais</Link>
                  <a href="https://calendar.google.com/" target="_blank" rel="noopener noreferrer" className="ph-calendar-link">
                    <FaCalendarAlt /> Adicionar ao Calendário
                  </a>
                </div>
              )}
            </div>
            
          </div> {/* Fim do .ph-grid */}

          {/* --- SECÇÃO DE EVENTOS ANTERIORES (Mantida) --- */}
          <div className="pe-section">
            <h3 className="pe-title">Eventos Anteriores</h3>
            <div className="pe-list-wrapper">
              <div className="pe-list">
                {pastEvents.map(event => (
                  <a href={event.link} key={event.id} className="pe-card-link">
                    <div className="pe-card">
                      <div className="pe-card-image"
                        style={{ backgroundImage: `url(${event.image})` }}
                        onError={(e) => { e.target.style.backgroundImage = `url(${placeholderImage})`; }}
                      >
                        <span className="pe-card-category">{event.category}</span>
                      </div>
                      <div className="pe-card-content">
                        <h5 className="pe-card-title">{event.title}</h5>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* --- FIM DA SECÇÃO --- */}

        </div> {/* Fim do .polaroid-container */}
      </div>
    </section>
  );
}

export default UpcomingEvents;