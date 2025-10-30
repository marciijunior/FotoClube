// src/pages/PhotoOfTheMonthPage/RulesSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import './RulesSection.css';

// MUDANÇA: 'export' removido daqui
function RulesSection() {
  return (
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
  );
}

// MUDANÇA: Adicionado 'export default' aqui
export default RulesSection;