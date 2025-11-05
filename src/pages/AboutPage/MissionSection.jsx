// src/pages/AboutPage/MissionSection.jsx
import React from 'react';
import './MissionSection.css'; // Importa o seu próprio CSS

// --- (MODIFICAÇÃO) 'export' REMOVIDO daqui ---
function MissionSection() {
  return (
    <section className="mission-section">
      <h2>Nossos Pilares</h2>
      <div className="mission-grid">
        <div className="mission-item">
          <h3>INSPIRAR</h3>
          <p>Fomentar a criatividade através de desafios, exposições e passeios fotográficos que exploram novas perspectivas.</p>
        </div>
        <div className="mission-item">
          <h3>CONECTAR</h3>
          <p>Criar laços duradouros entre fotógrafos, promovendo um ambiente de networking, amizade e colaboração.</p>
        </div>
        <div className="mission-item">
          <h3>ENSINAR</h3>
          <p>Oferecer workshops, palestras e sessões de crítica construtiva para todos os níveis de habilidade.</p>
        </div>
      </div>
    </section>
  );
}

// --- (MODIFICAÇÃO) Adicionado 'export default' no final ---
export default MissionSection;