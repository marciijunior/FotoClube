import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaCamera, FaCoffee } from 'react-icons/fa';
import './JoinUsSection.css'; 

import FundoParallax from '../../assets/imgJoinUs.jpg'; 

function JoinUsSection() {
  return (
    <section 
      className="join-us-stats-section"
      style={{ 
        backgroundImage: `url(${FundoParallax})` 
      }}
    >
      <div className="join-us-stats-container">
        
        <div className="join-us-floating-card">

          <h2 className="join-us-stats-title">O Ponto de Encontro da Fotografia</h2>
          <p className="join-us-stats-intro">
            Mais do que um clube, somos uma comunidade vibrante que respira fotografia. 
            Nossa missão é conectar pessoas, inspirar a criatividade e celebrar 
            a arte de capturar momentos.
          </p>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <FaUsers />
              </div>
              <h3 className="stat-title">150+ Membros</h3>
              <p className="stat-description">
                Uma rede diversa de fotógrafos apaixonados.
              </p>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <FaCamera />
              </div>
              <h3 className="stat-title">Workshops Mensais</h3>
              <p className="stat-description">
                Do básico ao avançado, sempre há algo novo para aprender.
              </p>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <FaCoffee />
              </div>
              <h3 className="stat-title">Passeios e Encontros</h3>
              <p className="stat-description">
                Exploramos a região e fortalecemos nossos laços.
              </p>
            </div>
          </div>

          <div className="join-us-stats-cta">
            <Link to="/sobre" className="stats-cta-button">
              Quero participar!
            </Link>
          </div>

        </div> 
      </div>
    </section>
  );
}

export default JoinUsSection;