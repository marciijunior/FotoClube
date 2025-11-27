import React from 'react';
import './MembersSection.css';
import { FaLink } from 'react-icons/fa';

import member1 from '../../assets/imagemCarrossel1.png';
import member2 from '../../assets/imagemCarrossel2.png';
import member3 from '../../assets/imagemCarrossel3.png';
import member4 from '../../assets/imagemCarrossel4.png';

function MemberCard({ name, image, portfolioUrl }) {
  return (
    <div className="member-card">
      <div className="member-card-image" style={{ backgroundImage: `url(${image})` }}>
      </div>
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
            A força do nosso clube está nas pessoas. Conheça os membros 
            que fazem a comunidade acontecer.
          </p>
        </div>
        <div className="members-grid">
          <MemberCard 
            name="Adriano 'Drico' Coelho" 
            image={member1} 
            portfolioUrl="#" 
          />
          <MemberCard 
            name="Gerson Fortes" 
            image={member2} 
            portfolioUrl="#" 
          />
          <MemberCard 
            name="Luiz Hirose" 
            image={member3} 
            portfolioUrl="#" 
          />
          <MemberCard 
            name="Devair Muchiutti" 
            image={member4} 
            portfolioUrl="#" 
          />
        </div>
      </div>
    </section>
  );
}

export default MembersSection;