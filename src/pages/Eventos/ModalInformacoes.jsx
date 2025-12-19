import React from "react";
import { FaMapMarkerAlt, FaClock, FaTimes } from "react-icons/fa";
import "./ModalInformacoes.css";

const logoImage = "/src/assets/logo-fotoclube-azul.png";

export default function ModalInformacoes({
  modalOpen,
  modalEvent,
  closeModal,
}) {
  if (!modalOpen || !modalEvent) return null;

  return (
    <div
      className="event-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes do evento ${modalEvent.title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="event-modal">
        <button
          className="event-modal-close"
          onClick={closeModal}
          aria-label="Fechar"
        >
          <FaTimes />
        </button>
        <div className="event-modal-body">
          <img
            src={modalEvent.image || logoImage}
            alt={modalEvent.title}
            className="event-modal-image"
            onError={(e) => {
              e.target.src = logoImage;
            }}
          />
          <div className="event-modal-content">
            <h2>{modalEvent.title}</h2>
            <p className="modal-meta">
              <FaMapMarkerAlt /> {modalEvent.location}
            </p>
            <p className="modal-meta">
              <FaClock /> {modalEvent.time}
            </p>
            <p className="modal-description">
              {modalEvent.description ??
                modalEvent.details ??
                "Sem descrição disponível."}
            </p>
            <div className="modal-actions">
              <button className="sidebar-event-button" onClick={closeModal}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
