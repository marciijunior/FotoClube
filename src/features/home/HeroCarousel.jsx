import { useState, useEffect, useCallback, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaRegBookmark } from 'react-icons/fa';
// Certifique-se que o caminho para slidesData está correto
import { slidesData } from '../../data/slidesData';
import './HeroCarousel.css';

// --- Constante para o número de miniaturas visíveis ---
const NUM_VISIBLE_THUMBNAILS = 5; // Pode ajustar, mas a lógica agora alinha à esquerda

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0); // Índice nos DADOS ORIGINAIS
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
  }, [currentIndex, goToNext]);

  // --- EFEITO PARA CALCULAR A ORDEM VISUAL (ATIVA NA ESQUERDA) ---
  useEffect(() => {
    // REMOVIDO: centerIndexVisual não é mais necessário para o cálculo principal
    const newVisibleOrder = [];

    for (let i = 0; i < NUM_VISIBLE_THUMBNAILS; i++) {
      // Calcula o índice nos dados originais correspondente a esta posição visual
      // Agora, a posição 0 (i=0) corresponde ao currentIndex
      const dataIndex = (currentIndex + i + slidesData.length) % slidesData.length;
      newVisibleOrder.push({
        ...slidesData[dataIndex],
        originalIndex: dataIndex
      });
    }
    setVisibleThumbnails(newVisibleOrder);

  }, [currentIndex]); // Recalcula sempre que o slide ativo (currentIndex) mudar

  // Efeito para mover o slide principal (sem alteração)
   useEffect(() => {
    if (slidesWrapperRef.current) {
      slidesWrapperRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);


  return (
    <div className="carousel-container">
      <div className="slides-wrapper" ref={slidesWrapperRef}>
        {slidesData.map((slide, index) => (
          <div
            key={index}
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
          {visibleThumbnails.map((thumbData, displayIndex) => (
            <div
              key={thumbData.originalIndex}
              // MUDANÇA: A miniatura ativa é agora a primeira (índice 0) do array visível
              className={`thumbnail ${displayIndex === 0 ? 'active-thumbnail' : ''}`}
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