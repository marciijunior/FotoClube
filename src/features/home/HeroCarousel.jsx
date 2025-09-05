import { useState, useEffect, useCallback, useRef } from 'react'; // Adicionado useRef
import { FaChevronLeft, FaChevronRight, FaRegBookmark } from 'react-icons/fa';
import './HeroCarousel.css';

function HeroCarousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // useRef para ter uma referência ao contêiner das miniaturas no DOM
  const thumbnailsContainerRef = useRef(null);

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

  // useEffect para o autoplay (sem alterações)
  useEffect(() => {
    const timer = setInterval(() => goToNext(), 20000);
    return () => clearInterval(timer);
  }, [currentIndex, goToNext]);

  // NOVO: useEffect para centralizar a miniatura ativa
  useEffect(() => {
    if (thumbnailsContainerRef.current) {
      const container = thumbnailsContainerRef.current;
      const activeThumbnail = container.children[currentIndex];

      if (activeThumbnail) {
        // Calcula o centro do contêiner
        const containerCenter = container.offsetWidth / 2;
        // Calcula o centro da miniatura ativa
        const thumbnailCenter = activeThumbnail.offsetLeft + activeThumbnail.offsetWidth / 2;
        
        // Calcula a posição de scroll para centralizar a miniatura
        const scrollLeft = thumbnailCenter - containerCenter;

        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        });
      }
    }
  }, [currentIndex]); // Este efeito executa sempre que o slide atual (currentIndex) muda

  return (
    <div className="carousel-container">
      <div className="slides-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
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
        {/* Adicionamos a ref ao contêiner das miniaturas */}
        <div className="slide-thumbnails" ref={thumbnailsContainerRef}>
          {slides.map((thumbSlide, slideIndex) => (
            <div 
              key={slideIndex} 
              className={`thumbnail ${slideIndex === currentIndex ? 'active-thumbnail' : ''}`}
              onClick={() => goToSlide(slideIndex)}
            >
              <img src={thumbSlide.image} alt={thumbSlide.title} />
            </div>
          ))}
        </div>
        <div className="navigation-controls">
          <div className="counter">
              0{currentIndex + 1}
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