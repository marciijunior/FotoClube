// src/features/home/JoinUsSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './JoinUsSection.css'; // O CSS que você já aprovou

function JoinUsSection() {
  // A imagem de fundo (parallax)
  const imageUrl = "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto-format&fit=crop";

  return (
    <section 
      className="join-us-section-parallax-light-card"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* O container agora centralizará o card */}
      <div className="join-us-container-light-card">
        
        {/* O Card de Conteúdo Flutuante com fundo claro */}
        <div className="join-us-card-light-card">
          
          {/* --- NOVO TEXTO ABAIXO --- */}
          
          <h2 className="join-us-title-light-card">A SUA PAIXÃO NOS CONECTA</h2>
          <p className="join-us-text-light-card">
            O FotoClube de Araçatuba é o lugar onde amantes da fotografia se identificam. 
            Se você busca inspiração, técnica ou um grupo para compartilhar 
            suas melhores capturas, aqui você encontrará seu espaço.
          </p>
          
          {/* --- FIM DO NOVO TEXTO --- */}

          <Link to="/login" className="join-us-button-light-card">
            QUERO SER ASSOCIADO
          </Link>
        </div>

      </div>
    </section>
  );
}

export default JoinUsSection;