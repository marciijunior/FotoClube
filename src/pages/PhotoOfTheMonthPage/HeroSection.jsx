// src/pages/PhotoOfTheMonthPage/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrophy, FaArrowRight } from 'react-icons/fa';
import './HeroSection.css';

function HeroSection({ winner, placeholderImage }) {
  return (
    <section className="potm-hero">
      <div className="potm-hero-text">
        <span className="hero-eyebrow"><FaTrophy /> VENCEDOR DO MÊS</span>
        <h1 className="hero-photo-title">{winner.title}</h1>
        <p className="hero-author">{winner.author}</p>
        <p className="hero-description">
          Esta impressionante captura foi escolhida como a grande vencedora.
          Veja abaixo os outros finalistas e saiba como participar.
        </p>

        <Link to={`/detalhes-foto/${winner.id}`} className="hero-cta-button">
          Ver Detalhes da Foto <FaArrowRight />
        </Link>
      </div>
      <div className="potm-hero-image-wrapper">
        <img
          src={winner.image}
          alt={winner.title}
          className="potm-hero-image"
          onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
        />
      </div>
    </section>
  );
}

export default HeroSection;