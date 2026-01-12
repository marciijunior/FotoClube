import React from "react";
import "./HistorySection.css";
import { FaMapMarkerAlt, FaInstagram } from "react-icons/fa";

function HistorySection() {
  // Imagem removida do bundle; usar placeholder neutro até receber do backend
  const studioImage = null;

  return (
    <section className="history-section-hq">
      <div className="hq-container">
        <div className="hq-text-content">
          <h1 className="history-page-main-title">O Nosso Ponto de Encontro</h1>
          <p className="hq-subtitle">
            A nossa história evoluiu de encontros digitais para um espaço
            físico.
          </p>
          <p>
            O que começou como um grupo de WhatsApp para partilhar ideias e
            marcar saídas, amadureceu. Vimos que para crescer, precisávamos de
            uma casa. Um lugar para debates, workshops e para receber novos
            membros.
          </p>
          <p>
            Hoje, o <strong>Estúdio 4K Fotografia</strong> não é apenas a nossa
            sede; é o coração da nossa comunidade. É onde a troca de
            experiências acontece, onde incentivamos a prática e onde a nossa
            história continua a ser escrita.
          </p>
        </div>
        <div className="hq-card">
          <div className="hq-card-image">
            {studioImage ? (
              <img src={studioImage} alt="Sede do FotoClube" />
            ) : (
              <div
                className="hq-card-image-placeholder"
                aria-label="Sede do FotoClube"
              />
            )}
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
