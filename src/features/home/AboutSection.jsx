// src/features/home/AboutSection.jsx
import { useState } from 'react';
import './AboutSection.css';

function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const imageUrl = "/images/about-image.jpg";
  const placeholderUrl = "https://picsum.photos/400/300?grayscale";

  return (
    // 1. A section continua igual
    <section className={`about-section ${isExpanded ? 'expanded' : ''}`}>
      {/* 2. ADICIONA O POLAROID CONTAINER AQUI */}
      <div className="polaroid-container">
        {/* 3. A div que antes era 'about-container' agora está DENTRO do polaroid */}
        <div className="about-flex-wrapper"> {/* Renomeado para clareza */}
          <div className="about-content">
            <h2 className="about-title">Sobre Nós</h2>
            <p className="about-text">
              Somos um grupo apaixonado por fotografia, dedicado a explorar o mundo
              através das lentes. Reunimo-nos regularmente para partilhar
              conhecimentos, inspirarmo-nos mutuamente e capturar momentos únicos.
              Junte-se a nós nesta jornada visual!
            </p>
            <button
              className="about-button"
              onClick={toggleExpand}
              aria-expanded={isExpanded}
            >
              {isExpanded ? 'Ver Menos' : 'Saber Mais'}
            </button>
            <div className="about-extra-content">
              <h5>Nossa Missão</h5>
              <p>Fomentar a arte fotográfica na comunidade, oferecendo um espaço para aprendizado, colaboração e exposição de trabalhos.</p>
              <h5>Junte-se a Nós</h5>
              <p>Se você compartilha da nossa paixão, entre em contacto! Realizamos workshops, passeios fotográficos e encontros mensais.</p>
            </div>
          </div>
          <div className="about-image-container">
            <img
              src={imageUrl}
              alt="Membros do FotoClube"
              className="about-image"
              onError={(e) => { e.target.onerror = null; e.target.src=placeholderUrl; }}
            />
          </div>
        </div>
      </div> {/* Fim do polaroid-container */}
    </section>
  );
}

export default AboutSection;