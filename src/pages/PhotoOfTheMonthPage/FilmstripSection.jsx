// src/pages/PhotoOfTheMonthPage/FilmstripSection.jsx
import React, { useState, useRef } from 'react';
import './FilmstripSection.css';

// MUDANÇA: 'export' removido daqui
function FilmstripSection({ runnersUp, placeholderImage }) {
  
  // Lógica "Clicar e Arrastar"
  const filmstripRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({
    startX: 0,
    scrollLeft: 0,
  });

  const handleMouseDown = (e) => {
    if (!filmstripRef.current) return;
    e.preventDefault();
    const slider = filmstripRef.current;
    
    setIsDragging(true);
    
    dragState.current.startX = e.pageX - slider.offsetLeft;
    dragState.current.scrollLeft = slider.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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
      <h2 className="dark-section-title">Finalistas</h2>
      
      <div 
        className={`filmstrip-track-wrapper ${isDragging ? 'dragging' : ''}`}
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
                src={winner.image}
                alt={winner.title}
                className="filmstrip-image"
                onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
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

// MUDANÇA: Adicionado 'export default' aqui
export default FilmstripSection;