// src/pages/PhotoOfTheMonthPage/ArchiveSection.jsx
import React, { useState, useMemo } from 'react';
import { FaTimes } from 'react-icons/fa'; // Importa o ícone de fechar
import './ArchiveSection.css'; // O CSS atualizado abaixo

// Função do componente
function ArchiveSection({ pastWinners, placeholderImage }) {
  
  // Estado para controlar o vencedor selecionado (Menu Vertical)
  const [selectedWinnerId, setSelectedWinnerId] = useState(pastWinners[0]?.id || null);

  // --- NOVO ESTADO PARA O MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Encontra o objeto completo do vencedor selecionado
  const selectedWinner = useMemo(() => {
    return pastWinners.find(w => w.id === selectedWinnerId);
  }, [selectedWinnerId, pastWinners]);

  // Funções do Modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    // Usa um Fragment (<>) para que o modal possa ser "irmão" da secção
    <>
      <section className="potm-archive-menu-section">
        <h2 className="dark-section-title">Arquivo de Vencedores</h2>
        <div className="archive-menu-container">
          
          {/* --- Coluna do Menu (Sem alterações) --- */}
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

          {/* --- Coluna de Destaque (Com onClick na imagem) --- */}
          <div className="archive-menu-display">
            {selectedWinner ? (
              <>
                <img
                  key={selectedWinner.id} 
                  src={selectedWinner.image}
                  alt={selectedWinner.title}
                  className="archive-menu-display-image"
                  onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                  onClick={openModal} // --- ADICIONADO: Abre o modal ---
                />
                <div 
                  key={`${selectedWinner.id}-info`}
                  className="archive-menu-display-info"
                >
                  <span className="archive-menu-display-month">{selectedWinner.monthWon}</span>
                  <h3 className="archive-menu-display-title">{selectedWinner.title}</h3>
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

      {/* --- NOVO: MODAL (Renderizado fora da secção) --- */}
      {/* O modal só é renderizado se estiver aberto E houver um vencedor selecionado */}
      {isModalOpen && selectedWinner && (
        <div className="archive-modal-backdrop" onClick={closeModal}>
          <div className="archive-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="archive-modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            {/* O conteúdo do modal é baseado no 'selectedWinner' */}
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
      {/* --- FIM DO MODAL --- */}
    </>
  );
}

// Exportação Padrão
export default ArchiveSection;