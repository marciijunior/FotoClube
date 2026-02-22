// src/features/home/UpcomingEvents.jsx
import { useState, useMemo, useEffect } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { normalizeImage } from "../../lib/imageUtils";
import { parseEventDate, generateCalendarLink } from "../../lib/dateUtils";
import { useIsMobile } from "../../hooks/useIsMobile";
import "./ProximosEventos.css";

const ALL_EVENTS = gql`
  query AllEvents {
    allEvents {
      id
      title
      date
      time
      location
      description
      image
      category
    }
  }
`;

function UpcomingEvents() {
  const { data, loading } = useQuery(ALL_EVENTS, {
    fetchPolicy: "network-only",
  });
  const navigate = useNavigate();

  const logoImage = "/logo-fotoclube-azul.png";

  // Filtrar e separar eventos futuros e passados
  const { displayEvents, pastEvents } = useMemo(() => {
    if (!data?.allEvents) return { displayEvents: [], pastEvents: [] };

    const now = new Date();
    now.setHours(0, 0, 0, 0); // Zerar hora para comparar apenas data

    const future = [];
    const past = [];

    data.allEvents.forEach((event) => {
      const eventDate = parseEventDate(event.date);
      if (eventDate >= now) {
        future.push(event);
      } else {
        past.push(event);
      }
    });

    // Ordenar futuros: mais próximo primeiro
    future.sort((a, b) => parseEventDate(a.date) - parseEventDate(b.date));

    // Ordenar passados: mais recente primeiro
    past.sort((a, b) => parseEventDate(b.date) - parseEventDate(a.date));

    // Se não houver eventos futuros, usar os eventos passados mais recentes
    const eventsToDisplay =
      future.length > 0 ? future.slice(0, 4) : past.slice(0, 4);

    return {
      displayEvents: eventsToDisplay,
      pastEvents: past.slice(0, 8),
    };
  }, [data]);

  const [activeEventId, setActiveEventId] = useState(
    displayEvents.length > 0 ? displayEvents[0].id : null,
  );
  const [timerProgress, setTimerProgress] = useState(0);
  const isMobile = useIsMobile(1000);

  // Atualizar activeEventId quando displayEvents mudar
  useEffect(() => {
    if (displayEvents.length > 0 && !activeEventId) {
      setActiveEventId(displayEvents[0].id);
    }
  }, [displayEvents, activeEventId]);

  // Animação do progresso do timer
  useEffect(() => {
    if (displayEvents.length <= 1) return;

    setTimerProgress(0);
    const progressInterval = setInterval(() => {
      setTimerProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.833; // Incrementa 0.833% a cada 100ms = 12 segundos total
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [activeEventId, displayEvents]);

  // Rotação automática entre eventos
  useEffect(() => {
    if (displayEvents.length <= 1) return;

    const interval = setInterval(() => {
      const currentIndex = displayEvents.findIndex(
        (e) => e.id === activeEventId,
      );
      let nextIndex;

      // Garante que o próximo seja diferente do atual
      do {
        nextIndex = Math.floor(Math.random() * displayEvents.length);
      } while (nextIndex === currentIndex && displayEvents.length > 1);

      setActiveEventId(displayEvents[nextIndex].id);
    }, 12000); // Muda a cada 12 segundos

    return () => clearInterval(interval);
  }, [displayEvents, activeEventId]);

  const activeEvent = useMemo(() => {
    return displayEvents.find((e) => e.id === activeEventId) || null;
  }, [activeEventId, displayEvents]);

  if (loading) {
    return (
      <section className="upcoming-events-section">
        <div className="upcoming-events-container">
          <p style={{ textAlign: "center", padding: "2rem" }}>
            Carregando eventos...
          </p>
        </div>
      </section>
    );
  }

  if (displayEvents.length === 0) {
    return null;
  }

  // MOBILE LAYOUT: data/foto em cima, descrição embaixo
  if (isMobile) {
    const event =
      displayEvents.find((e) => e.id === activeEventId) || displayEvents[0];
    const dateParts = event.date ? event.date.split(", ") : ["01", "Jan-2025"];
    const day = dateParts[0];
    const month = dateParts[1] ? dateParts[1].split("-")[0] : "";
    return (
      <section className="upcoming-events-section">
        <div className="upcoming-events-container">
          <div className="polaroid-container">
            <h2
              className="section-title"
              style={{
                "--timer-width":
                  displayEvents.length > 1 ? `${timerProgress}%` : "100%",
              }}
            >
              Próximos Eventos
            </h2>
            <div className="ph-mobile-block">
              <div className="ph-mobile-date-image">
                <div className="ph-item-date">
                  <span>{day}</span>
                  <span>{month}</span>
                </div>
                <div className="ph-mobile-image">
                  <div
                    className="ph-bg-image active"
                    style={{
                      backgroundImage: `url(${normalizeImage(event.image) || logoImage})`,
                      height: 180,
                      borderRadius: 8,
                    }}
                  ></div>
                </div>
                <Link to="/eventos" className="ph-all-events-link">
                  Ver todos os eventos <FaArrowRight />
                </Link>
              </div>
              <div className="ph-mobile-details">
                <h3 className="ph-details-title">{event.title}</h3>
                <p className="ph-details-location">
                  <FaMapMarkerAlt /> {event.location}
                </p>
                <p className="ph-details-time">
                  <FaClock /> {event.time}
                </p>
                <p className="ph-details-description">{event.description}</p>
                <Link
                  to={generateCalendarLink(event.date)}
                  className="ph-details-cta"
                >
                  Saber Mais
                </Link>
                <a
                  href="https://calendar.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ph-calendar-link"
                >
                  <FaCalendarAlt /> Adicionar ao Calendário
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // DESKTOP LAYOUT (original)
  return (
    <section className="upcoming-events-section">
      <div className="upcoming-events-container">
        <div className="polaroid-container">
          <h2
            className="section-title"
            style={{
              "--timer-width":
                displayEvents.length > 1 ? `${timerProgress}%` : "100%",
            }}
          >
            Próximos Eventos
          </h2>
          {/* --- O "HUB" INTERATIVO (Mantido) --- */}
          <div className="ph-grid">
            <div className="ph-grid-top">
              {/* COLUNA 1: LISTA */}
              <div className="ph-col-list">
                <div className="ph-list-scroll">
                  {displayEvents.map((event) => {
                    // Extração segura da data para exibição (string split)
                    const dateParts = event.date
                      ? event.date.split(", ")
                      : ["01", "Jan-2025"];
                    const day = dateParts[0];
                    const month = dateParts[1]
                      ? dateParts[1].split("-")[0]
                      : "";

                    return (
                      <button
                        key={event.id}
                        className={`ph-list-item ${event.id === activeEventId ? "active" : ""}`}
                        onMouseEnter={() => setActiveEventId(event.id)}
                      >
                        <div className="ph-item-date">
                          <span>{day}</span>
                          <span>{month}</span>
                        </div>
                        <div className="ph-item-info">
                          <span className="ph-item-category">
                            {event.category || "Evento"}
                          </span>
                          <h4 className="ph-item-title">{event.title}</h4>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <Link to="/eventos" className="ph-all-events-link">
                  Ver todos os eventos <FaArrowRight />
                </Link>
              </div>

              {/* COLUNA 2: IMAGEM */}
              <div className="ph-col-image">
                {displayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`ph-bg-image ${event.id === activeEventId ? "active" : ""}`}
                    style={{
                      backgroundImage: `url(${normalizeImage(event.image) || logoImage})`,
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* DETALHES ABAIXO */}
            <div className="ph-col-details">
              {activeEvent && (
                <div className="ph-details-content" key={activeEvent.id}>
                  <h3 className="ph-details-title">{activeEvent.title}</h3>
                  <p className="ph-details-location">
                    <FaMapMarkerAlt /> {activeEvent.location}
                  </p>

                  {/* Horário do Evento */}
                  <p className="ph-details-time">
                    <FaClock /> {activeEvent.time}
                  </p>

                  <p className="ph-details-description">
                    {activeEvent.description}
                  </p>

                  {/* --- MUDANÇA PRINCIPAL: Link Dinâmico --- */}
                  <Link
                    to={generateCalendarLink(activeEvent.date)}
                    className="ph-details-cta"
                  >
                    Saiba Mais
                  </Link>
                  {/* --------------------------------------- */}

                  <a
                    href="https://calendar.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ph-calendar-link"
                  >
                    <FaCalendarAlt /> Adicionar ao Calendário
                  </a>
                </div>
              )}
            </div>
          </div>{" "}
          {/* Fim do .ph-grid */}
          <div className="pe-section">
            <h3 className="pe-title">Eventos Anteriores</h3>
            <div className="pe-list-wrapper">
              <div className="pe-list">
                {pastEvents.map((event) => (
                  <div
                    key={event.id}
                    className="pe-card"
                    onClick={() => navigate(generateCalendarLink(event.date))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigate(generateCalendarLink(event.date));
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    {/* Imagem à esquerda */}
                    <img
                      src={normalizeImage(event.image) || logoImage}
                      alt={event.title}
                      className="pe-card-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = logoImage;
                      }}
                    />

                    {/* Corpo no meio */}
                    <div className="pe-card-body">
                      <h4 className="pe-card-title">{event.title}</h4>
                      <div className="pe-card-meta">
                        <span className="pe-event-time">
                          <FaClock /> {event.time}
                        </span>
                        <span className="pe-event-location">
                          <FaMapMarkerAlt /> {event.location}
                        </span>
                      </div>
                    </div>

                    {/* Barra Footer Fixa */}
                    <div className="pe-card-actions">
                      <button className="pe-card-button" tabIndex="-1">
                        Saiba Mais{" "}
                        <FaArrowRight style={{ fontSize: "0.8em" }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;
