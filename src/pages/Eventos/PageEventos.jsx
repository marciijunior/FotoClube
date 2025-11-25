import React from "react";
import { FaCalendarAlt, FaBullhorn, FaArrowDown } from "react-icons/fa";
import "./PageEventos.css";

// Componentes internos da pasta Eventos
import Calendario from "./Calendario.jsx";
import RecentActivities from "./RecentActivities.jsx";

export default function PageEventos() {
  
  const scrollToAgenda = () => {
    const element = document.getElementById("agenda-focus");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="page-eventos-wrapper">
      {/* Hero Section: Título e Apresentação */}
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
        
        {/* Seção do Calendário */}
        <section id="agenda-focus" className="eventos-section">
          <div className="section-label">
            <FaCalendarAlt className="icon-label" />
            <h2>Calendário Mensal</h2>
          </div>
          <div className="glass-container">
            <Calendario />
          </div>
        </section>

        {/* Separador */}
        <div className="section-spacer"></div>

        {/* Seção de Atividades Recentes */}
        <section className="eventos-section">
          <div className="section-label">
            <FaBullhorn className="icon-label" />
            <h2>Feed de Atualizações</h2>
          </div>
          <div className="glass-container feed-container">
            <RecentActivities />
          </div>
        </section>

      </div>
    </main>
  );
}