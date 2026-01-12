// src/pages/PhotoOfTheMonthPage/FilmstripSection.jsx
import React, { useState, useRef } from "react";
import "./FilmstripSection.css";

function FilmstripSection({ runnersUp, placeholderImage }) {
  const filmstripRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });

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

  const handleMouseDown = (e) => {
    if (!filmstripRef.current) return;
    e.preventDefault();
    const slider = filmstripRef.current;
    setIsDragging(true);
    dragState.current.startX = e.pageX - slider.offsetLeft;
    dragState.current.scrollLeft = slider.scrollLeft;
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !filmstripRef.current) return;
    e.preventDefault();
    const slider = filmstripRef.current;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.5;
    slider.scrollLeft = dragState.current.scrollLeft - walk;
  };

  return (
    <section className="potm-filmstrip-section">
      {/* Classe de título clara */}
      <h2 className="section-title-light">Finalistas</h2>

      <div
        className={`filmstrip-track-wrapper ${isDragging ? "dragging" : ""}`}
        ref={filmstripRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="filmstrip-track">
          {runnersUp.map((winner, index) => (
            <div key={winner.id || index} className="filmstrip-card">
              <img
                src={normalizeImage(winner.image) ?? placeholderImage}
                alt={winner.title}
                className="filmstrip-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholderImage;
                }}
                loading="lazy"
              />
              <div className="filmstrip-info">
                <span className="filmstrip-rank">{index + 2}º</span>
                <p className="filmstrip-author">{winner.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FilmstripSection;
