// src/features/home/PhotoOfTheMonth.jsx
import React, { useState } from 'react';
import { slidesData } from '../../data/slidesData';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './PhotoOfTheMonth.css'; // Certifique-se que está a usar o CSS da V6 - 2 Colunas + Rank

function PhotoOfTheMonth() {
  const winners = slidesData.slice(0, 9);
  const [expandedId, setExpandedId] = useState(winners.length > 0 ? winners[0].id : null);
  const placeholderImage = "/src/assets/images/placeholder-winner.png";

  const handleToggleExpand = (id) => {
    setExpandedId(currentExpandedId => currentExpandedId === id ? null : id);
  };

  return (
    <section className="photo-month-section-accordion">
      <div className="photo-month-container-accordion">
        <h2 className="photo-month-title-accordion">Fotos em Destaque</h2>
        <div className="photo-accordion-list">
          {winners.map((winner, index) => {
            const isExpanded = winner.id === expandedId;
            const rank = index + 1;

            return (
              <div
                key={winner.id}
                className={`accordion-item ${isExpanded ? 'expanded' : ''}`}
              >
                <div
                  className="accordion-header"
                  onClick={() => handleToggleExpand(winner.id)}
                  role="button"
                  aria-expanded={isExpanded}
                  aria-controls={`content-${winner.id}`}
                >
                  <span className="accordion-rank">{rank.toString().padStart(2, '0')}</span>
                  <img
                    src={winner.image}
                    alt={`Pré-visualização de ${winner.title}`}
                    className="accordion-thumbnail"
                    loading="lazy"
                  />
                  <h3 className="accordion-title">{winner.title}</h3>
                  <span className="accordion-icon">
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </div>
                <div
                  id={`content-${winner.id}`}
                  className="accordion-content"
                  aria-hidden={!isExpanded}
                >
                  <img
                    src={winner.image}
                    alt={`Foto de ${winner.author} - ${winner.title}`}
                    className="accordion-full-image"
                    onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                    loading="lazy"
                  />
                  <div className="accordion-info">
                    <p className="accordion-photographer">{winner.author}</p>
                    <p className="accordion-location">{winner.location}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PhotoOfTheMonth;