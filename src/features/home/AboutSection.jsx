// src/features/home/AboutSection.jsx
import { useState } from 'react'; // 1. Importa useState
import './AboutSection.css';

function AboutSection() {
  // 2. Estado para controlar a expansão
  const [isExpanded, setIsExpanded] = useState(false);

  // 3. Função para alternar a expansão
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // 4. Define a URL da imagem (ou placeholder se não for encontrada)
  //    Assumindo que a imagem estará em public/images/about-image.jpg
  //    Se a imagem não carregar, o CSS pode tratar o erro ou usar um fallback
  const imageUrl = "/images/about-image.jpg"; // Mantenha o caminho correto
  // Fallback (se a imagem não existir): pode ser feito com CSS ou <picture>
  const placeholderUrl = "https://picsum.photos/400/300?grayscale"; // Imagem P&B para diferenciar

  return (
    // 5. Adiciona a classe 'expanded' à secção quando expandido
    <section className={`about-section ${isExpanded ? 'expanded' : ''}`}>
      <div className="about-container">
        <div className="about-content">
          <h2 className="about-title">Sobre Nós</h2>
          <p className="about-text">
            Somos um grupo apaixonado por fotografia, dedicado a explorar o mundo
            através das lentes. Reunimo-nos regularmente para partilhar
            conhecimentos, inspirarmo-nos mutuamente e capturar momentos únicos.
            Junte-se a nós nesta jornada visual!
          </p>
          {/* 6. Botão agora chama toggleExpand e muda o texto */}
          <button
            className="about-button"
            onClick={toggleExpand}
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Ver Menos' : 'Saber Mais'}
          </button>
          {/* 7. Conteúdo Extra que aparece quando expandido */}
          <div className="about-extra-content">
            <h5>Nossa Missão</h5>
            <p>Fomentar a arte fotográfica na comunidade, oferecendo um espaço para aprendizado, colaboração e exposição de trabalhos.</p>
            <h5>Junte-se a Nós</h5>
            <p>Se você compartilha da nossa paixão, entre em contacto! Realizamos workshops, passeios fotográficos e encontros mensais.</p>
            {/* Adicione mais conteúdo conforme necessário */}
          </div>
        </div>
        <div className="about-image-container">
          {/* 8. Usando onError para fallback simples */}
          <img
            src={imageUrl}
            alt="Membros do FotoClube"
            className="about-image"
            onError={(e) => { e.target.onerror = null; e.target.src=placeholderUrl; }} // Fallback simples
          />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;