// src/pages/PhotoOfTheMonthPage/PhotoDetailsModal.jsx
import React from "react";
import {
  FaTrophy,
  FaUser,
  FaCalendar,
  FaTimes,
  FaAward,
  FaStickyNote,
} from "react-icons/fa";
import "./PhotoDetailsModal.css";

function PhotoDetailsModal({ winner, placeholderImage, onClose }) {
  if (!winner) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getPositionText = (position) => {
    if (position === 1) return "1º Lugar - Vencedor";
    if (position === 2) return "2º Lugar - Finalista";
    if (position === 3) return "3º Lugar - Finalista";
    return `${position}º Lugar - Finalista`;
  };

  return (
    <div className="photo-modal-overlay" onClick={handleOverlayClick}>
      <div className="photo-modal-content">
        <button className="photo-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="photo-modal-image-section">
          {winner.position === 1 && (
            <div className="photo-modal-winner-badge">
              <FaTrophy /> VENCEDOR DO MÊS
            </div>
          )}
          <img
            src={(() => {
              if (!winner.image) return "";
              if (
                winner.image.startsWith("http://localhost") ||
                winner.image.startsWith("https://localhost")
              ) {
                const filename = winner.image.split("/").pop();
                return `${import.meta.env.VITE_UPLOADS_URL}/${filename}`;
              }
              if (winner.image.startsWith("http")) return winner.image;
              return `${import.meta.env.VITE_UPLOADS_URL}/${winner.image}`;
            })()}
            alt={winner.title}
            className="photo-modal-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholderImage;
            }}
          />
        </div>

        <div className="photo-modal-info-section">
          <div className="photo-modal-header">
            <h2 className="photo-modal-title">{winner.title}</h2>
            <p className="photo-modal-author">
              <FaUser /> {winner.author}
            </p>
            {winner.monthWon && (
              <p className="photo-modal-month">
                <FaCalendar /> {winner.monthWon}
              </p>
            )}
          </div>

          <div className="photo-modal-details">
            {winner.position && (
              <div className="photo-modal-detail-block">
                <div className="photo-modal-detail-label">
                  <FaAward /> Posição
                </div>
                <div className="photo-modal-position-badge">
                  {getPositionText(winner.position)}
                </div>
              </div>
            )}

            {winner.judgesNotes && (
              <div className="photo-modal-detail-block">
                <div className="photo-modal-detail-label">
                  <FaStickyNote /> Nota dos Jurados
                </div>
                <p className="photo-modal-detail-text">{winner.judgesNotes}</p>
              </div>
            )}

            <div className="photo-modal-detail-block">
              <div className="photo-modal-detail-label">
                <FaTrophy /> Sobre esta Fotografia
              </div>
              <p className="photo-modal-detail-text">
                {winner.position === 1
                  ? `Esta impressionante captura foi escolhida como a grande vencedora do concurso de ${winner.monthWon || "fotografia"}. A composição, técnica e criatividade demonstradas nesta imagem conquistaram os jurados e se destacaram entre todas as participações.`
                  : `Esta fotografia foi selecionada entre as finalistas do concurso de ${winner.monthWon || "fotografia"}, demonstrando excelente técnica e visão artística.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetailsModal;
