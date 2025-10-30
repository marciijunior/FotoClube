// src/pages/PhotoOfTheMonthPage.jsx
import React from 'react';

// Importa os dados
import { slidesData } from '../data/slidesData';
import { pastWinnersData } from '../data/pastWinnersData';

// Importa o CSS principal
import './PhotoOfTheMonthPage.css';

// MUDANÇA: Importações de 'default' (sem chavetas)
import HeroSection from './PhotoOfTheMonthPage/HeroSection';
import FilmstripSection from './PhotoOfTheMonthPage/FilmstripSection';
import ArchiveSection from './PhotoOfTheMonthPage/ArchiveSection';
import RulesSection from './PhotoOfTheMonthPage/RulesSection';

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

      {/* 4. Secção Regras */}
      <RulesSection />

    </div>
  );
}

export default PhotoOfTheMonthPage;