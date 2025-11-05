// src/pages/AboutPage/HistorySection.jsx (MODELO: SCRAPBOOK URBANO)
import React from 'react';
import './HistorySection.css'; // O CSS do Modelo novo

// 1. A imagem "colada" (como no modelo Diário)
import journalImage from '../../assets/fotoGrupo.jpg'; 

// 2. Imagem de fundo de Araçatuba (dos seus assets)
import aracatubaBackground from '../../assets/fotoAracatuba.jpeg'; 

function HistorySection() {
  return (
    // A secção agora tem o fundo parallax
    <section 
      className="history-section-scrapbook"
      style={{ backgroundImage: `url(${aracatubaBackground})` }}
    >
      {/* Overlay para legibilidade */}
      <div className="scrapbook-overlay"></div>

      <div className="scrapbook-container">
        
        {/* Título principal (agora usando a fonte do site) */}
        <h1 className="history-page-main-title">Onde tudo começou...</h1>

        <div className="scrapbook-grid">
          
          {/* O Texto (agora usando a fonte do site) */}
          <div className="scrapbook-text-card">
            <span className="journal-date">Outubro de 2015</span>
            <p>
              Ainda somos poucos, mas a paixão é grande.
              O que começou como encontros informais em cafés 
              finalmente tomou forma.
            </p>
            <p>
              Hoje, fundamos oficialmente o FotoClube Araçatuba. 
              Não é só sobre câmeras ou lentes; é sobre ver. 
              É sobre partilhar essa visão.
            </p>
            <p>
              - R.G. (Fundador)
            </p>
          </div>

          {/* A Imagem "colada" */}
          <div className="scrapbook-image-card">
            <img src={journalImage} alt="Lembrança do clube" />
          </div>

        </div>
      </div>
    </section>
  );
}

export default HistorySection;