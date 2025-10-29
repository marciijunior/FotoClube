// src/pages/PhotoOfTheMonthPage.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaTrophy, FaChevronRight, FaChevronLeft, FaScroll, FaRegDotCircle, FaRegCircle } from 'react-icons/fa'; // Ícones extras para navegação e regras
import { slidesData } from '../data/slidesData';
import { pastWinnersData } from '../data/pastWinnersData';
import './PhotoOfTheMonthPage.css'; // O CSS será atualizado a seguir

function PhotoOfTheMonthPage() {
  const mainWinner = slidesData[0];
  const runnersUp = slidesData.slice(1, 9);
  const placeholderImage = "/src/assets/images/placeholder-winner.png";

  // --- NOVO ESTADO PARA O CARROSSEL DO ARQUIVO ---
  const [archiveIndex, setArchiveIndex] = useState(0); // Índice do slide atual no arquivo

  const goToNextArchive = () => {
    setArchiveIndex((prevIndex) => (prevIndex + 1) % pastWinnersData.length);
  };

  const goToPrevArchive = () => {
    setArchiveIndex((prevIndex) => (prevIndex - 1 + pastWinnersData.length) % pastWinnersData.length);
  };

  const goToArchiveSlide = (index) => {
    setArchiveIndex(index);
  }
  // --- FIM DO NOVO ESTADO ---

  return (
    <div className="potm-dark-container">

      {/* --- 1. SECÇÃO DO VENCEDOR PRINCIPAL (HERO) - Mantida --- */}
      <section className="potm-dark-hero">
        <div className="potm-dark-hero-text">
          <span className="hero-eyebrow"><FaTrophy /> VENCEDOR DO MÊS</span>
          <h1 className="hero-photo-title">{mainWinner.title}</h1>
          <p className="hero-author">{mainWinner.author}</p>
          <p className="hero-description">
            Esta impressionante captura foi escolhida como a grande vencedora.
            Veja abaixo os outros finalistas e saiba como participar.
          </p>
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

      {/* --- 2. SECÇÃO FINALISTAS (FILMSTRIP) - Mantida --- */}
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

      {/* --- 3. SECÇÃO ARQUIVO (CARROSSEL - VARIAÇÃO B) --- */}
      <section className="potm-archive-carousel-section"> {/* Nova classe */}
        <h2 className="dark-section-title">Arquivo de Vencedores</h2>
        <div className="archive-carousel-container"> {/* Novo container */}
          {/* Botão Anterior */}
          <button
            className="archive-carousel-arrow prev"
            onClick={goToPrevArchive}
            aria-label="Vencedor Anterior"
          >
            <FaChevronLeft />
          </button>

          {/* Wrapper dos Slides */}
          <div className="archive-carousel-slides-wrapper">
            <div
              className="archive-carousel-slides-track"
              style={{ transform: `translateX(-${archiveIndex * 100}%)` }} // Move o track
            >
              {pastWinnersData.map((winner) => (
                <div key={winner.id} className="archive-carousel-slide">
                  <img
                    src={winner.image}
                    alt={winner.title}
                    className="archive-carousel-image"
                    onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                  />
                  <div className="archive-carousel-info">
                    <span className="archive-carousel-month">{winner.monthWon}</span>
                    <h3 className="archive-carousel-title">{winner.title}</h3>
                    <p className="archive-carousel-author">{winner.photographer}</p>
                    <p className="archive-carousel-notes">
                      <strong>Nota dos Jurados:</strong> "{winner.judgesNotes}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão Próximo */}
          <button
            className="archive-carousel-arrow next"
            onClick={goToNextArchive}
            aria-label="Próximo Vencedor"
          >
            <FaChevronRight />
          </button>

          {/* Indicadores de Posição (Dots) */}
          <div className="archive-carousel-dots">
            {pastWinnersData.map((_, index) => (
              <button
                key={index}
                className={`archive-carousel-dot ${index === archiveIndex ? 'active' : ''}`}
                onClick={() => goToArchiveSlide(index)}
                aria-label={`Ir para vencedor ${index + 1}`}
              >
                {index === archiveIndex ? <FaRegDotCircle /> : <FaRegCircle />}
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* --- FIM DA SECÇÃO ARQUIVO (VARIAÇÃO B) --- */}

      {/* --- 4. SECÇÃO REGRAS (MINIMALISTA) - Mantida --- */}
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