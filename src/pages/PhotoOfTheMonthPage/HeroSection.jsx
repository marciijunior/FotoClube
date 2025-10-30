// src/pages/PhotoOfTheMonthPage/HeroSection.jsx
import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import './HeroSection.css';

// MUDANÇA: 'export' removido daqui
function HeroSection({ winner, placeholderImage }) {
  return (
    <section className="potm-dark-hero">
      <div className="potm-dark-hero-text">
        <span className="hero-eyebrow"><FaTrophy /> VENCEDOR DO MÊS</span>
        <h1 className="hero-photo-title">{winner.title}</h1>
        <p className="hero-author">{winner.author}</p>
        <p className="hero-description">
          Esta impressionante captura foi escolhida como a grande vencedora.
          Veja abaixo os outros finalistas e saiba como participar.
        </p>
      </div>
      <div className="potm-dark-hero-image-wrapper">
        <img
          src={winner.image}
          alt={winner.title}
          className="potm-dark-hero-image"
          onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
        />
      </div>
    </section>
  );
}

// MUDANÇA: Adicionado 'export default' aqui
export default HeroSection;