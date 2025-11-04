// src/pages/AboutPage/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css'; 

// --- (MODIFICAÇÃO) ---
// 1. Imagem 'Hero' alterada para uma foto escura (noturna).
import heroImage from '../../assets/imagemCarrossel3.png'; 
// 2. Imagem da missão alterada para variar (imagem da costa).
import missionImage from '../../assets/imagemCarrossel5.png'; 
// --- (FIM DA MODIFICAÇÃO) ---

import founderImage from '../../assets/images/past-winner-1.png'; 
import coFounderImage from '../../assets/images/past-winner-2.png'; 

function AboutPage() {
  return (
    <div className="about-page-container">
      
      {/* --- Secção Hero --- */}
      <section 
        className="about-hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="about-hero-overlay">
          <h1 className="about-page-title">Nossa História</h1>
          <p className="about-page-subtitle">
            Mais que um clube, uma comunidade unida pela paixão de capturar o mundo.
          </p>
        </div>
      </section>

      {/* --- Secção Principal (Grid) --- */}
      <section className="about-content-grid">
        <div className="about-text-content">
          <h2>Fundado em 2015</h2>
          <p>
            O FotoClube Araçatuba nasceu da paixão compartilhada de um pequeno grupo de fotógrafos. O que começou como encontros informais em cafés para discutir técnicas e compartilhar fotos, rapidamente cresceu.
          </p>
          <p>
            Vimos a necessidade de um espaço formal onde entusiastas e profissionais pudessem aprender, praticar e expor seus trabalhos. Assim, em 2015, o FotoClube foi oficialmente fundado, com a missão de ser o ponto de encontro da fotografia na região.
          </p>
          <p>
            Hoje, contamos com dezenas de membros, de iniciantes a profissionais premiados, todos unidos pelo desejo de capturar o mundo através das lentes e celebrar a arte da fotografia.
          </p>
        </div>
        <div className="about-image-wrapper">
          <img src={missionImage} alt="Fotógrafo em ação" />
        </div>
      </section>

      {/* --- Secção Missão (3 Colunas) --- */}
      <section className="about-mission-section">
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

      {/* --- Secção Equipa (Opcional) --- */}
      <section className="about-team-section">
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

      {/* --- Secção CTA (Call to Action) --- */}
      <section className="about-cta-section">
        <h2>Pronto para focar no seu talento?</h2>
        <p>Faça parte da nossa história e comece a compartilhar seu olhar com o mundo.</p>
        <Link to="/login" className="about-cta-button">
          Junte-se a Nós
        </Link>
      </section>
    </div>
  );
}

export default AboutPage;