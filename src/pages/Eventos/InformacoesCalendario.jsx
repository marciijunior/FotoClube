import React from "react";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./InformacoesCalendario.css";

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
                <div key={event.id} className="sidebar-event-card" tabIndex={0}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="sidebar-event-image"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="sidebar-event-details">
                    <h4>{event.title}</h4>
                    <p className="sidebar-event-meta">
                      <span className="event-location">
                        <FaMapMarkerAlt /> {event.location}
                      </span>
                      <span className="event-time">
                        <FaClock /> {event.time}
                      </span>
                    </p>
                    <div className="sidebar-event-actions">
                      <button
                        className="sidebar-event-button"
                        onClick={() => openModal(event)}
                      >
                        Saiba Mais
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="sidebar-placeholder">
            <p>Selecione um dia no calendário para ver os eventos.</p>
          </div>
        )}
      </div>
    </aside>
  );
}
