import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight, FaCamera, FaCalendarCheck, FaUserCheck } from "react-icons/fa";
import "./RulesSection.css";

function RulesSection() {
  return (
    <section className="potm-rules-section">
      <div className="potm-rules-container">
        
        <h2 className="section-title-light">Como Participar</h2>
        
        <div className="rules-grid">
          {/* Card 1: Tema */}
          <div className="rule-card">
            <div className="rule-icon-wrapper">
              <FaCamera />
            </div>
            <div className="rule-content">
              <h4>Tema do Próximo Mês</h4>
              <p className="rules-highlight">"Fotografia de Rua"</p>
              <span className="rule-detail">Capture a vida urbana espontânea.</span>
            </div>
          </div>

          {/* Card 2: Prazo */}
          <div className="rule-card">
            <div className="rule-icon-wrapper">
              <FaCalendarCheck />
            </div>
            <div className="rule-content">
              <h4>Limite de Submissão</h4>
              <p className="rules-highlight">Dia 25 deste Mês</p>
              <span className="rule-detail">Envie até às 23:59.</span>
            </div>
          </div>

          {/* Card 3: Elegibilidade */}
          <div className="rule-card">
            <div className="rule-icon-wrapper">
              <FaUserCheck />
            </div>
            <div className="rule-content">
              <h4>Quem Pode</h4>
              <p className="rules-highlight">Exclusivo Associados</p>
              <span className="rule-detail">Necessário estar com a anuidade em dia.</span>
            </div>
          </div>
        </div>

        <div className="rules-cta-wrapper">
          <Link to="/contatos" className="rules-cta-button">
            Ainda não é associado? Junte-se a nós <FaChevronRight />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default RulesSection;