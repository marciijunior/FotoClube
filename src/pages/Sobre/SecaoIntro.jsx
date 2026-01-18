import React from "react";
import "./SecaoIntro.css";

function IntroSection() {
  // Imagem local removida; usar URL do backend quando disponível
  const originImage = null;
  return (
    <section className="intro-section">
      <div className="intro-container">
        <div className="intro-column">
          <span className="intro-eyebrow">Nosso Propósito</span>
          <h2>Quem Somos</h2>
          <p>
            Somos uma associação sem fins lucrativos dedicada a conectar
            apaixonados por fotografia, sejam profissionais, amadores ou
            entusiastas.
          </p>
          <p>
            Nosso objetivo é promover o debate, aprimorar o olhar fotográfico e
            incentivar a troca contínua de conhecimento, valorizando os
            fotógrafos locais e registrando nossa cultura.
          </p>
        </div>
        <div className="intro-column">
          <span className="intro-eyebrow">Nossa Origem</span>
          <h2>Como Surgimos</h2>
          <p>
            O Fotoclube nasceu da visão de{" "}
            <strong>Adriano "Drico" Coelho</strong>, junto a{" "}
            <strong>Gerson Fortes</strong>, <strong>Luiz Hirose</strong> e{" "}
            <strong>Devair Muchiutti</strong>. O que era um grupo de WhatsApp
            para saídas e debates evoluiu.
          </p>
          <p>
            Em 2023, sentimos a vontade de crescer e existir juridicamente.
            Convidamos membros-chave e fundamos a associação para
            profissionalizar nossa paixão.
          </p>
        </div>
      </div>
      <div className="intro-image-banner">
        {originImage ? (
          <img
            src={originImage}
            alt="Membros do Fotoclube em saída fotográfica"
          />
        ) : (
          <div
            className="intro-image-placeholder"
            aria-label="Membros do Fotoclube em saída fotográfica"
          />
        )}
      </div>
    </section>
  );
}
export default IntroSection;
