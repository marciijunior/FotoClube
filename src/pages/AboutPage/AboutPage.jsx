// src/pages/AboutPage/AboutPage.jsx

import React from 'react';

// 1. Importa a seção de Introdução (Quem Somos + Como Surgimos)
// Caminho correto: './IntroSection' (pois está na mesma pasta)
import IntroSection from './IntroSection';

// 2. Importa a seção de Membros (Integrantes)
// Caminho correto: './MembersSection' (pois está na mesma pasta)
import MembersSection from './MembersSection';

// 3. Importa a seção da Sede (O "Modelo 3" que você gostou)
// Caminho correto: './HistorySection' (este é o nome do seu arquivo)
import HistorySection from './HistorySection';

// CSS geral para a página
import './AboutPage.css'; 

function AboutPage() {
  return (
    <div className="about-page-wrapper">
      
      {/* 1. QUEM SOMOS e COMO SURGIMOS */}
      <IntroSection />

      {/* 2. CADA INTEGRANTE */}
      <MembersSection />

      {/* 3. NOSSA SEDE (O estilo que você gostou) */}
      <HistorySection />

    </div>
  );
}

export default AboutPage;