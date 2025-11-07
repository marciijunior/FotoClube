// src/features/home/AboutSection.jsx (MODELO 3: REVISTA - VERSÃO 'SOBRE NÓS')
import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

// --- CORREÇÃO DE IMAGEM ---
// Importando imagens reais da sua pasta de assets
import imgOverlap1 from '../../assets/images/past-winner-3.png'; // Imagem de trás
import imgOverlap2 from '../../assets/images/past-winner-4.png'; // Imagem da frente

import './AboutSection.css'; // Usará o CSS do Modelo 3

function AboutSection() {
  return (
    <section className="about-section-magazine">
      <div className="magazine-container">
        
        {/* Coluna 1: Pilha de Imagens */}
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

        {/* Coluna 2: Caixa de Texto (com textos atualizados) */}
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