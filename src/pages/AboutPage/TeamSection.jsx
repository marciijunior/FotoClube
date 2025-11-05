// src/pages/AboutPage/TeamSection.jsx
import React from 'react';
import './TeamSection.css'; // Importa o seu próprio CSS

import founderImage from '../../assets/images/past-winner-1.png'; 
import coFounderImage from '../../assets/images/past-winner-2.png'; 

// --- (MODIFICAÇÃO) 'export' REMOVIDO daqui ---
function TeamSection() {
  return (
    <section className="team-section">
      <h2>Conheça os Fundadores</h2>
      <div className="team-grid">
        <div className="team-member-card">
          <img src={founderImage} alt="Fundador 1" className="team-member-photo" />
          <h4 className="team-member-name">Ricardo Gomes</h4>
          <span className="team-member-role">Presidente & Fundador</span>
        </div>
        <div className="team-member-card">
          <img src={coFounderImage} alt="Fundador 2" className="team-member-photo" />
          <h4 className="team-member-name">Ana Clara</h4>
          <span className="team-member-role">Vice-Presidente & Co-Fundadora</span>
        </div>
      </div>
    </section>
  );
}

// --- (MODIFICAÇÃO) Adicionado 'export default' no final ---
export default TeamSection;