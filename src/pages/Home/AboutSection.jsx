import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import imgOverlap1 from '../../assets/images/past-winner-3.png';
import imgOverlap2 from '../../assets/images/past-winner-4.png';

import './AboutSection.css';

function AboutSection() {
  return (
    <section className="about-section-magazine">
      <div className="magazine-container">
        <div className="magazine-image-stack">
          <img 
            src={imgOverlap1} 
            alt="Foto do clube 1" 
            className="magazine-image image-back" 
          />
          <img 
            src={imgOverlap2} 
            alt="Foto do clube 2" 
            className="magazine-image image-front" 
          />
        </div>

        <div className="magazine-text-box">
          <span className="magazine-eyebrow">SOBRE NÓS</span>
          <h2 className="magazine-title">Nossa História, Nossas Lentes</h2>
          <p className="magazine-text">
            Fundado em 2015, o FotoClube nasceu da paixão compartilhada de um 
            pequeno grupo de fotógrafos. O que começou como encontros informais 
            para discutir técnicas rapidamente cresceu.
          </p>
          <p className="magazine-text">
            Hoje, somos uma comunidade vibrante dedicada a aprender, praticar e 
            celebrar a arte da fotografia em Araçatuba.
          </p>
          <Link to="/sobre" className="magazine-link">
            Conheça nossa história completa <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;