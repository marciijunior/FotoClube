import React from "react";
import "./MembersSection.css";
import { FaLink } from "react-icons/fa";

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
          <h2>Nossos Associados</h2>
          <p>
            A força do nosso clube está nas pessoas. Conheça os membros que
            fazem a comunidade acontecer.
          </p>
        </div>
        <div className="members-grid">
          <MemberCard
            name="Adriano 'Drico' Coelho"
            image={null}
            portfolioUrl="#"
          />
          <MemberCard name="Gerson Fortes" image={null} portfolioUrl="#" />
          <MemberCard name="Luiz Hirose" image={null} portfolioUrl="#" />
          <MemberCard name="Devair Muchiutti" image={null} portfolioUrl="#" />
        </div>
      </div>
    </section>
  );
}

export default MembersSection;
