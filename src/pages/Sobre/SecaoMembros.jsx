import React from "react";
import "./SecaoMembros.css";
import { FaLink } from "react-icons/fa";

import dricoCoelho from "../../assets/DricoCoelho.jpeg";
import gersonFortes from "../../assets/GersonFortes.jpeg";
import luizHirose from "../../assets/LuizHirose.jpeg";
import devairMuchiutti from "../../assets/DevairMuchiutti.jpeg";

function MemberCard({ name, image, portfolioUrl }) {
  const backgroundStyle = image
    ? { backgroundImage: `url(${image})` }
    : { backgroundColor: "#f5f5f5" };

  return (
    <div className="member-card">
      <div className="member-card-image" style={backgroundStyle}></div>
      <div className="member-card-info">
        <h3>{name}</h3>
        {portfolioUrl ? (
          <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
            <FaLink /> Ver Portfólio
          </a>
        ) : (
          <span>Associado</span>
        )}
      </div>
    </div>
  );
}

function MembersSection() {
  return (
    <section className="members-section">
      <div className="members-container">
        <div className="members-header">
          <h2>Nossos Fundadores</h2>
          <p>
            Conheça os visionários que deram vida ao FotoClube e transformaram
            uma paixão em comunidade.
          </p>
        </div>
        <div className="members-grid">
          <MemberCard
            name="Adriano 'Drico' Coelho"
            image={dricoCoelho}
            portfolioUrl="#"
          />
          <MemberCard
            name="Gerson Fortes"
            image={gersonFortes}
            portfolioUrl="#"
          />
          <MemberCard name="Luiz Hirose" image={luizHirose} portfolioUrl="#" />
          <MemberCard
            name="Devair Muchiutti"
            image={devairMuchiutti}
            portfolioUrl="#"
          />
        </div>
      </div>
    </section>
  );
}

export default MembersSection;
