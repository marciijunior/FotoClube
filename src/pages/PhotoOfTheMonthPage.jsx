// src/pages/PhotoOfTheMonthPage.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
// Nota: FaChevronRight ainda é usado na secção de regras, por isso o import é mantido.
import { FaTrophy, FaChevronRight, FaChevronLeft } from 'react-icons/fa'; 
import { slidesData } from '../data/slidesData';
import { pastWinnersData } from '../data/pastWinnersData';
import './PhotoOfTheMonthPage.css';

function PhotoOfTheMonthPage() {
  const mainWinner = slidesData[0];
  const runnersUp = slidesData.slice(1, 9);
  
  const [selectedArchiveId, setSelectedArchiveId] = useState(pastWinnersData[0].id);

  const selectedArchiveWinner = useMemo(() => {
    return pastWinnersData.find(w => w.id === selectedArchiveId);
  }, [selectedArchiveId]);

  const placeholderImage = "/src/assets/images/placeholder-winner.png";

  return (
    <div className="potm-dark-container">
      
      {/* --- 1. SECÇÃO DO VENCEDOR PRINCIPAL (HERO) --- */}
      <section className="potm-dark-hero">
        <div className="potm-dark-hero-text">
          <span className="hero-eyebrow"><FaTrophy /> VENCEDOR DO MÊS</span>
          <h1 className="hero-photo-title">{mainWinner.title}</h1>
          <p className="hero-author">{mainWinner.author}</p>
          <p className="hero-description">
            Esta impressionante captura foi escolhida como a grande vencedora. 
            Veja abaixo os outros finalistas e saiba como participar.
          </p>
          
          {/* --- BOTÃO "SUBMETER FOTO" REMOVIDO DESTA LINHA --- */}

        </div>
        <div className="potm-dark-hero-image-wrapper">
          <img 
            src={mainWinner.image} 
            alt={mainWinner.title}
            className="potm-dark-hero-image"
            onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
          />
        </div>
      </section>

      {/* --- 2. SECÇÃO FINALISTAS (FILMSTRIP) --- */}
      <section className="potm-filmstrip-section">
        <h2 className="dark-section-title">Finalistas</h2>
        <div className="filmstrip-track-wrapper">
          <div className="filmstrip-track">
            {runnersUp.map((winner, index) => (
              <div key={winner.id || index} className="filmstrip-card">
                <img
                  src={winner.image}
                  alt={winner.title}
                  className="filmstrip-image"
                  onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                  loading="lazy"
                />
                <div className="filmstrip-info">
                  <span className="filmstrip-rank">{index + 2}º</span>
                  <p className="filmstrip-author">{winner.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* --- 3. SECÇÃO ARQUIVO (HALL OF FAME) --- */}
      <section className="potm-archive-section">
        <h2 className="dark-section-title">Arquivo de Vencedores</h2>
        <div className="archive-container">
          {/* Coluna de Seleção (Menu) */}
          <div className="archive-menu">
            <label htmlFor="archive-select" className="archive-label">Explorar meses anteriores:</label>
            <div className="archive-select-wrapper">
              <select 
                id="archive-select"
                value={selectedArchiveId}
                onChange={(e) => setSelectedArchiveId(e.target.value)}
              >
                {pastWinnersData.map(winner => (
                  <option key={winner.id} value={winner.id}>
                    {winner.monthWon} - {winner.photographer}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Coluna de Exibição */}
          {selectedArchiveWinner && (
            <div className="archive-display">
              <img 
                src={selectedArchiveWinner.image}
                alt={selectedArchiveWinner.title}
                className="archive-display-image"
                onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
              />
              <div className="archive-display-info">
                <span className="archive-month">{selectedArchiveWinner.monthWon}</span>
                <h3 className="archive-title">{selectedArchiveWinner.title}</h3>
                <p className="archive-author">{selectedArchiveWinner.photographer}</p>
                <p className="archive-notes">
                  <strong>Nota dos Jurados:</strong> "{selectedArchiveWinner.judgesNotes}"
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- 4. SECÇÃO REGRAS (MINIMALISTA) --- */}
      <section className="potm-dark-rules">
        <h2 className="dark-section-title">Como Participar</h2>
        <div className="rules-grid">
          <div>
            <h4>Tema do Próximo Mês</h4>
            <p className="rules-highlight">"Fotografia de Rua"</p>
          </div>
          <div>
            <h4>Limite de Submissão</h4>
            <p className="rules-highlight">Dia 25 deste Mês</p>
          </div>
          <div>
            <h4>Quem Pode</h4>
            <p className="rules-highlight">Exclusivo para Associados</p>
          </div>
        </div>
        <Link to="/login" className="rules-link">
          Ainda não é associado? Junte-se a nós <FaChevronRight />
        </Link>
      </section>

    </div>
  );
}

export default PhotoOfTheMonthPage;