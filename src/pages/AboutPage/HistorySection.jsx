// src/pages/AboutPage/HistorySection.jsx (MODELO 3: A SEDE)
import React from 'react';
import './HistorySection.css'; // O CSS do Modelo 3
import { FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';

// Importa a imagem do Estúdio 4K (ou uma genérica)
import studioImage from '../../assets/imagemCarrossel3.png'; // Substitua pela foto do estúdio

function HistorySection() {
  return (
    <section className="history-section-hq">
      <div className="hq-container">
        
        {/* Coluna 1: O Texto da História */}
        <div className="hq-text-content">
          <h1 className="history-page-main-title">O Nosso Ponto de Encontro</h1>
          <p className="hq-subtitle">
            A nossa história evoluiu de encontros digitais para um espaço físico.
          </p>
          <p>
            O que começou como um grupo de WhatsApp para partilhar ideias e marcar saídas, amadureceu. Vimos que para crescer, precisávamos de uma casa. Um lugar para debates, workshops e para receber novos membros.
          </p>
          <p>
            Hoje, o <strong>Estúdio 4K Fotografia</strong> não é apenas a nossa sede; é o coração da nossa comunidade. É onde a troca de experiências acontece, onde incentivamos a prática e onde a nossa história continua a ser escrita.
          </p>
        </div>

        {/* Coluna 2: O "Cartão de Visita" da Sede */}
        <div className="hq-card">
          <div className="hq-card-image">
            <img src={studioImage} alt="Sede do FotoClube" />
          </div>
          <div className="hq-card-info">
            <h2>Nossa Sede</h2>
            <h3>Estúdio 4K Fotografia</h3>
            
            <div className="hq-info-item">
              <FaMapMarkerAlt />
              <span>Rua José Bonifácio 114, Araçatuba - 16010-380</span>
            </div>
            <div className="hq-info-item">
              <FaInstagram />
              <span>@fotoclube_aracatuba</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HistorySection;