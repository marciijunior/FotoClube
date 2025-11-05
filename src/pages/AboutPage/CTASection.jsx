// src/pages/AboutPage/CTASection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CTASection.css'; // Importa o seu próprio CSS

// --- (MODIFICAÇÃO) 'export' REMOVIDO daqui ---
function CTASection() {
  return (
    <section className="cta-section">
      <h2>Pronto para focar no seu talento?</h2>
      <p>Faça parte da nossa história e comece a compartilhar seu olhar com o mundo.</p>
      <Link to="/login" className="cta-button">
        Junte-se a Nós
      </Link>
    </section>
  );
}

// --- (MODIFICAÇÃO) Adicionado 'export default' no final ---
export default CTASection;