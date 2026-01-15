import React from "react";
import {
  FaCalendarAlt,
  FaBullhorn,
  FaNewspaper,
  FaArrowDown,
} from "react-icons/fa";
import "./PageEventos.css";
import Calendario from "./Calendario.jsx";
import EventUpdates from "./EventUpdates.jsx";
import FeedPosts from "./FeedPosts.jsx";

export default function PageEventos() {
  const scrollToAgenda = () => {
    const element = document.getElementById("agenda-focus");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="page-eventos-wrapper">
      <section className="eventos-hero">
        <div className="hero-content">
          <span className="hero-tag">FotoClube Atividades</span>
          <h1 className="hero-title">
            Explore a nossa <span className="highlight-text">Agenda</span>
          </h1>
          <p className="hero-description">
            Participe nos nossos workshops, concursos e saídas fotográficas.
            Fique a par de tudo o que acontece na nossa comunidade.
          </p>
          <button onClick={scrollToAgenda} className="btn-scroll-down">
            Ver Eventos <FaArrowDown />
          </button>
        </div>
        <div className="hero-bg-glow"></div>
      </section>

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
            <FeedPosts limit={6} />
          </div>
        </section>

        <div className="section-spacer"></div>

        <section className="eventos-section">
          <div className="section-label">
            <h2>Atualizações Recentes</h2>
          </div>
          <div className="glass-container feed-container">
            <EventUpdates limit={8} showTitle={false} />
          </div>
        </section>
      </div>
    </main>
  );
}
