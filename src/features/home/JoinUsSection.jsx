// src/features/home/JoinUsSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaCamera, FaCoffee } from 'react-icons/fa';
import './JoinUsSection.css'; // O CSS atualizado

// 1. (CORREÇÃO DA IMAGEM): IMPORTE SUA IMAGEM AQUI
//    Substitua o caminho pela sua imagem de fundo desejada
import FundoParallax from '../../assets/imgJoinUs.jpg'; // Usei uma das suas imagens como exemplo

function JoinUsSection() {
  return (
    <section 
      className="join-us-stats-section"
      // 2. (CORREÇÃO DA IMAGEM): Usamos a variável importada aqui
      style={{ 
        backgroundImage: `url(${FundoParallax})` 
      }}
    >
      <div className="join-us-stats-container">
        
        {/* O card flutuante (que agora será mais largo) */}
        <div className="join-us-floating-card">

          <h2 className="join-us-stats-title">O Ponto de Encontro da Fotografia</h2>
          <p className="join-us-stats-intro">
            Mais do que um clube, somos uma comunidade vibrante que respira fotografia. 
            Nossa missão é conectar pessoas, inspirar a criatividade e celebrar 
            a arte de capturar momentos.
          </p>

          {/* Grid de Valores/Estatísticas (dentro do card) */}
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

          {/* Botão de Ação (dentro do card) */}
          <div className="join-us-stats-cta">
            <Link to="/login" className="stats-cta-button">
              Faça Parte Desta Comunidade
            </Link>
          </div>

        </div> 
        {/* Fim do card flutuante */}
      </div>
    </section>
  );
}

export default JoinUsSection;