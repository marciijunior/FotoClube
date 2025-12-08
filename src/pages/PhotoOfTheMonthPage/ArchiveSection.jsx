// src/pages/PhotoOfTheMonthPage/ArchiveSection.jsx
import React, { useState, useMemo } from 'react';
import { FaTimes } from 'react-icons/fa'; 
import './ArchiveSection.css';

function ArchiveSection({ pastWinners, placeholderImage }) {
  const [selectedWinnerId, setSelectedWinnerId] = useState(pastWinners[0]?.id || null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedWinner = useMemo(() => {
    return pastWinners.find(w => w.id === selectedWinnerId);
  }, [selectedWinnerId, pastWinners]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className="potm-archive-menu-section">
        {/* Título Claro */}
        <h2 className="section-title-light">Arquivo de Vencedores</h2>
        <div className="archive-menu-container">
          
          <div className="archive-menu-list">
            {pastWinners.map((winner) => (
              <button
                key={winner.id}
                className={`archive-menu-button ${winner.id === selectedWinnerId ? 'active' : ''}`}
                onClick={() => setSelectedWinnerId(winner.id)}
              >
                <span className="archive-menu-month">{winner.monthWon}</span>
                <span className="archive-menu-photographer">{winner.photographer}</span>
              </button>
            ))}
          </div>

          <div className="archive-menu-display">
            {selectedWinner ? (
              <>
                <div className="archive-menu-display-image-wrapper" onClick={openModal}>
                  <img
                    src={selectedWinner.image}
                    alt={selectedWinner.title}
                    className="archive-menu-display-image"
                    onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                  />
                </div>
                <div className="archive-menu-display-info">
                  <h3>{selectedWinner.title}</h3>
                  <p className="archive-menu-display-author">{selectedWinner.photographer}</p>
                  <p className="archive-menu-display-notes">
                    <strong>Nota dos Jurados:</strong> "{selectedWinner.judgesNotes}"
                  </p>
                </div>
              </>
            ) : (
              <p>Nenhum vencedor selecionado.</p>
            )}
          </div>
          
        </div>
      </section>

      {isModalOpen && selectedWinner && (
        <div className="archive-modal-backdrop" onClick={closeModal}>
          <div className="archive-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="archive-modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            <img
              src={selectedWinner.image}
              alt={selectedWinner.title}
              className="archive-modal-image"
              onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
            />
            <div className="archive-modal-info">
              <span className="archive-modal-month">{selectedWinner.monthWon}</span>
              <h3 className="archive-modal-title">{selectedWinner.title}</h3>
              <p className="archive-modal-author">{selectedWinner.photographer}</p>
              <p className="archive-modal-notes">
                <strong>Nota dos Jurados:</strong> "{selectedWinner.judgesNotes}"
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ArchiveSection;