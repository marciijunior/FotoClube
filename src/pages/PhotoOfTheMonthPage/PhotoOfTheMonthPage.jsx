// src/pages/PhotoOfTheMonthPage/PhotoOfTheMonthPage.jsx
import React from 'react';

// Importa os dados
import { slidesData } from '../../data/slidesData';
import { pastWinnersData } from '../../data/pastWinnersData';

// --- MUDANÇA AQUI ---
// O CSS agora está na mesma pasta, então './PhotoOfTheMonthPage.css' está correto.
import './PhotoOfTheMonthPage.css';

// --- MUDANÇA AQUI ---
// As seções agora estão na mesma pasta (removido o './PhotoOfTheMonthPage/')
import HeroSection from './HeroSection';
import FilmstripSection from './FilmstripSection';
import ArchiveSection from './ArchiveSection';
import RulesSection from './RulesSection';
// --- FIM DA MUDANÇA ---

function PhotoOfTheMonthPage() {
  // Prepara os dados
  const mainWinner = slidesData[0];
  const runnersUp = slidesData.slice(1, 9);
  const placeholderImage = "/src/assets/images/placeholder-winner.png";

  return (
    <div className="potm-dark-container">
      
      {/* 1. Secção do Vencedor */}
      <HeroSection 
        winner={mainWinner} 
        placeholderImage={placeholderImage} 
      />

      {/* 2. Secção Finalistas */}
      <FilmstripSection 
        runnersUp={runnersUp} 
        placeholderImage={placeholderImage} 
      />
      
      {/* 3. Secção Arquivo */}
      <ArchiveSection 
        pastWinners={pastWinnersData} 
        placeholderImage={placeholderImage}
      />
      
      {/* 4. Secção de Regras */ }
      <RulesSection />

    </div>
  );
}

export default PhotoOfTheMonthPage;