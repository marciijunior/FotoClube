import { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight, FaRegBookmark } from 'react-icons/fa';
import './HeroCarousel.css'; // MUDANÇA: Importação direta do CSS

// Componente para um único slide (sub-componente)
function CarouselSlide({ slide, isActive }) {
  // MUDANÇA: classes como strings
  const slideClasses = `slide ${isActive ? 'active' : ''}`;

  return (
    <div className={slideClasses} style={{ backgroundImage: `url(${slide.image})` }}>
      <div className="slide-content">
        <p className="location">{slide.location}</p>
        <h2 className="title">{slide.title}</h2>
        <p className="author">{slide.author}</p>
        <div className="actions">
          <button className="bookmark-button"><FaRegBookmark /></button>
          <button className="read-more-button">Ler Mais</button>
        </div>
      </div>
    </div>
  );
}

function HeroCarousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => goToNext(), 20000);
    return () => clearInterval(timer);
  }, [currentIndex, goToNext]);

  return (
    <div className="carousel-container">
      <div className="slides-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <CarouselSlide key={index} slide={slide} isActive={index === currentIndex} />
        ))}
      </div>

      <div className="controls-overlay">
        <div className="thumbnails">
          {slides.map((slide, slideIndex) => (
            <div 
              key={slideIndex} 
              // MUDANÇA: Lógica de classes direto na string
              className={`thumbnail ${slideIndex === currentIndex ? 'active-thumbnail' : ''}`}
              onClick={() => goToSlide(slideIndex)}
            >
              <img src={slide.image} alt={slide.title} />
            </div>
          ))}
        </div>
        <div className="navigation">
          <button onClick={goToPrevious} className="arrow"><FaChevronLeft /></button>
          <button onClick={goToNext} className="arrow"><FaChevronRight /></button>
        </div>
        <div className="counter">
          0{currentIndex + 1}
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;