import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaBullhorn,
  FaNewspaper,
  FaTimes,
} from "react-icons/fa";
import "./PageEventos.css";
import Calendario from "./Calendario.jsx";
import AtualizacoesEventos from "./AtualizacoesEventos.jsx";
import FeedPostagens from "./FeedPostagens.jsx";

export default function PageEventos() {
  // Verifica se o popup já foi visto no localStorage
  const [showPopup, setShowPopup] = useState(() => {
    const alreadySeen = localStorage.getItem("agendaPopupSeen");
    return !alreadySeen;
  });

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem("agendaPopupSeen", "true");
  };

  // Fechar popup com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <main className="page-eventos-wrapper">
      {/* Pop-up Explore a Nossa Agenda */}
      {showPopup && (
        <div className="agenda-popup-overlay" onClick={closePopup}>
          <div className="agenda-popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close-btn" onClick={closePopup}>
              <FaTimes />
            </button>
            <div className="popup-content">
              <span className="hero-tag">FotoClube Atividades</span>
              <h1 className="hero-title">
                Explore a nossa <span className="highlight-text">Agenda</span>
              </h1>
              <p className="hero-description">
                Participe nos nossos workshops, concursos e saídas fotográficas.
                Fique a par de tudo o que acontece na nossa comunidade.
              </p>
              <button onClick={closePopup} className="btn-scroll-down">
                Ver Eventos
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="page-eventos-container">
        <section id="agenda-focus" className="eventos-section">
          <div className="section-label centered">
            <h2>Calendário Mensal</h2>
          </div>
          <div className="glass-container">
            <Calendario />
          </div>
        </section>

        <div className="section-spacer"></div>

        <section className="eventos-section">
          <div className="section-label centered">
            <h2>Feed do FotoClube</h2>
          </div>
          <div className="glass-container feed-container">
            <FeedPostagens limit={6} />
          </div>
        </section>

        <div className="section-spacer"></div>

        <section className="eventos-section">
          <div className="section-label">
            <h2>Atualizações Recentes</h2>
          </div>
          <div className="glass-container feed-container">
            <AtualizacoesEventos limit={8} showTitle={false} />
          </div>
        </section>
      </div>
    </main>
  );
}
