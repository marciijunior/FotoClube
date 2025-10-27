// src/features/home/HeroCarousel.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaRegBookmark } from 'react-icons/fa';
import { slidesData } from '../../data/slidesData';
import './HeroCarousel.css';

const NUM_VISIBLE_THUMBNAILS = 5;

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleThumbnails, setVisibleThumbnails] = useState([]);
  const slidesWrapperRef = useRef(null);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slidesData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slidesData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Efeito para o autoplay
  useEffect(() => {
    const timer = setInterval(() => goToNext(), 8000);
    return () => clearInterval(timer);
  }, [currentIndex, goToNext]); // Dependência do autoplay

  // Efeito para mover o slide principal
  useEffect(() => {
    if (slidesWrapperRef.current) {
      slidesWrapperRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  // --- OTIMIZAÇÃO DE PERFORMANCE APLICADA ---
  // A lógica das miniaturas (que é "pesada") é atrasada em 100ms
  // para não competir com a animação principal (transform)
  useEffect(() => {
    const updateThumbnails = setTimeout(() => {
      
      // --- SUA LÓGICA DE CENTRALIZAÇÃO ORIGINAL (MANTIDA) ---
      const half = Math.floor(NUM_VISIBLE_THUMBNAILS / 2);
      // Repete os slides 3x para permitir o "loop" infinito das miniaturas
      const repeatedSlides = [...slidesData, ...slidesData, ...slidesData];
      // Encontra o índice do slide atual no meio do array repetido
      const currentSlideInRepeatedArray = slidesData.length + currentIndex;

      // Corta o array para pegar as miniaturas corretas (centralizadas)
      const newThumbnailData = repeatedSlides.slice(
        currentSlideInRepeatedArray - half,
        currentSlideInRepeatedArray + half + 1
      ).map((slide, index) => ({
        ...slide,
        // Calcula o índice original correto para cada miniatura
        originalIndex: (currentIndex - half + index + slidesData.length) % slidesData.length,
      }));
      // --- FIM DA SUA LÓGICA DE CENTRALIZAÇÃO ---

      setVisibleThumbnails(newThumbnailData);
    }, 100); // ATRASO DE 100ms

    return () => clearTimeout(updateThumbnails);
  }, [currentIndex]);
  // --- FIM DA OTIMIZAÇÃO ---

  // Efeito para inicializar as miniaturas (Sua lógica original)
  useEffect(() => {
    const half = Math.floor(NUM_VISIBLE_THUMBNAILS / 2);
    const initialThumbnails = slidesData.slice(0, NUM_VISIBLE_THUMBNAILS).map((slide, index) => ({
      ...slide,
      originalIndex: (index - half + slidesData.length) % slidesData.length,
    }));
    setVisibleThumbnails(initialThumbnails);
  }, []); // Executa apenas uma vez

  return (
    <div className="carousel-container">
      <div
        ref={slidesWrapperRef}
        className="slides-wrapper"
      >
        {slidesData.map((slide, index) => (
          <div
            key={index}
            // Sua lógica de classe para a animação do conteúdo
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
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
        ))}
      </div>
      <div className="controls-overlay">
        <div className="slide-thumbnails">
          {/* Sua lógica de classe original para centralizar */}
          {visibleThumbnails.map((thumbData) => (
            <div
              key={thumbData.originalIndex}
              className={`thumbnail ${thumbData.originalIndex === currentIndex ? 'active-thumbnail' : ''}`}
              onClick={() => goToSlide(thumbData.originalIndex)}
            >
              <img src={thumbData.image} alt={`Thumbnail ${thumbData.title}`} />
            </div>
          ))}
        </div>
        <div className="navigation-controls">
          <div className="counter">
            {(currentIndex + 1).toString().padStart(2, '0')}
          </div>
          <div className="navigation">
            <button onClick={goToPrevious} className="arrow"><FaChevronLeft /></button>
            <button onClick={goToNext} className="arrow"><FaChevronRight /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;