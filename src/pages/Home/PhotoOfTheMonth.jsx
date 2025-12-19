import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Loader } from "@mantine/core";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./PhotoOfTheMonth.css";

const GET_WINNERS = gql`
  query GetWinners {
    allWinners {
      id
      title
      author
      image
      monthWon
      judgesNotes
    }
  }
`;

function PhotoOfTheMonth() {
  const { data, loading } = useQuery(GET_WINNERS);
  const winners = data?.allWinners?.slice(0, 9) || [];
  const [expandedId, setExpandedId] = useState(
    winners.length > 0 ? winners[0].id : null
  );
  const placeholderImage = "/src/assets/images/placeholder-winner.png";

  const handleToggleExpand = (id) => {
    setExpandedId((currentExpandedId) =>
      currentExpandedId === id ? null : id
    );
  };

  if (loading) {
    return (
      <section className="photo-month-section-accordion">
        <div className="photo-month-container-accordion">
          <h2 className="photo-month-title-accordion">Fotos em Destaque</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "3rem",
            }}
          >
            <Loader size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (winners.length === 0) {
    return (
      <section className="photo-month-section-accordion">
        <div className="photo-month-container-accordion">
          <h2 className="photo-month-title-accordion">Fotos em Destaque</h2>
          <p style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
            Nenhuma foto cadastrada ainda.
          </p>
        </div>
      </section>
    );
  }

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
                className={`accordion-item ${isExpanded ? "expanded" : ""}`}
              >
                <div
                  className="accordion-header"
                  onClick={() => handleToggleExpand(winner.id)}
                  role="button"
                  aria-expanded={isExpanded}
                  aria-controls={`content-${winner.id}`}
                >
                  <span className="accordion-rank">
                    {rank.toString().padStart(2, "0")}
                  </span>
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
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = placeholderImage;
                    }}
                    loading="lazy"
                  />
                  <div className="accordion-info">
                    <p className="accordion-photographer">{winner.author}</p>
                    <p className="accordion-location">{winner.monthWon}</p>
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
