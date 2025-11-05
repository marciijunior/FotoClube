// src/pages/AboutPage/AboutPage.jsx (Arquivo Principal Agregador)
import React from 'react';
import './AboutPage.css'; // O CSS principal (agora limpo)

// --- (MODIFICAÇÃO) ---
// Importa as secções SEM chaves (default imports)
import HistorySection from './HistorySection';
import MissionSection from './MissionSection';
import TeamSection from './TeamSection';
import CTASection from './CTASection'; // O arquivo do erro
// --- (FIM DA MODIFICAÇÃO) ---

function AboutPage() {
  return (
    // O container principal que envolve todas as partes
    <div className="about-page-content"> 
      
      {/* Renderiza as secções em ordem */}
      <HistorySection />
      <MissionSection />
      <TeamSection />
      <CTASection />

    </div>
  );
}

export default AboutPage;