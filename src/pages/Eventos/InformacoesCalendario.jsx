import React from "react";
import { FaMapMarkerAlt, FaClock, FaArrowRight } from "react-icons/fa";
import "./InformacoesCalendario.css";

const logoImage = "/logo-fotoclube-azul.png";

export default function InformacoesCalendario({
  selectedEvents = [],
  selectedDay,
  monthName,
  openModal,
}) {
  return (
    <aside
      className={`calendar-sidebar ${selectedEvents.length > 0 ? "is-open" : ""}`}
    >
      <div className="sidebar-content">
        {selectedEvents.length > 0 ? (
          <>
            <h3 className="sidebar-title">
              Eventos em {selectedDay} de {monthName}
            </h3>
            <div className="sidebar-event-list">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="sidebar-event-card"
                  onClick={() => openModal(event)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      openModal(event);
                    }
                  }}
                >
                  {/* Imagem à esquerda */}
                  <img
                    src={event.image || logoImage}
                    alt={event.title}
                    className="sidebar-event-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = logoImage;
                    }}
                  />

                  {/* Corpo no meio */}
                  <div className="sidebar-event-body">
                    <h4>{event.title}</h4>
                    <div className="sidebar-event-meta">
                      <span className="event-time">
                        <FaClock /> {event.time}
                      </span>
                      <span className="event-location">
                        <FaMapMarkerAlt /> {event.location}
                      </span>
                    </div>
                  </div>

                  {/* Barra Footer Fixa */}
                  <div className="sidebar-event-actions">
                    <button className="sidebar-event-button" tabIndex="-1">
                      Saiba Mais <FaArrowRight style={{ fontSize: "0.8em" }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="sidebar-placeholder">
            <p>Selecione um dia no calendário para ver os eventos agendados.</p>
          </div>
        )}
      </div>
    </aside>
  );
}
