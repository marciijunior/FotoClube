// src/pages/PhotoOfTheMonthPage/HeroSection.jsx
import React, { useState } from "react";
import { FaTrophy, FaArrowRight } from "react-icons/fa";
import "./SecaoHero.css";
import ModalDetalhesFoto from "./ModalDetalhesFoto";

function HeroSection({ winner, placeholderImage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const normalizeImage = (img) => {
    if (!img) return null;
    if (
      img.startsWith("http://localhost") ||
      img.startsWith("https://localhost")
    ) {
      const filename = img.split("/").pop();
      return `${import.meta.env.VITE_UPLOADS_URL}/${filename}`;
    }
    if (img.startsWith("http")) return img;
    return `${import.meta.env.VITE_UPLOADS_URL}/${img}`;
  };

  return (
    <>
      <section className="potm-hero">
        <div className="potm-hero-text">
          <span className="hero-eyebrow">
            <FaTrophy /> VENCEDOR DO MÊS
          </span>
          <h1 className="hero-photo-title">{winner.title}</h1>
          <p className="hero-author">{winner.author}</p>
          <p className="hero-description">
            Esta impressionante captura foi escolhida como a grande vencedora.
            Veja abaixo os outros finalistas e saiba como participar.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="hero-cta-button"
          >
            Ver Detalhes da Foto <FaArrowRight />
          </button>
        </div>
        <div className="potm-hero-image-wrapper">
          <img
            src={normalizeImage(winner.image) ?? placeholderImage}
            alt={winner.title}
            className="potm-hero-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholderImage;
            }}
          />
        </div>
      </section>

      {isModalOpen && (
        <ModalDetalhesFoto
          winner={winner}
          placeholderImage={placeholderImage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default HeroSection;
