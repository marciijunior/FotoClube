import { useState, useEffect, useCallback, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaRegBookmark } from 'react-icons/fa';
import { slidesData } from '../../data/slidesData';
import './HeroCarousel.css';

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailsContainerRef = useRef(null);

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

  useEffect(() => {
    const timer = setInterval(() => goToNext(), 20000);
    return () => clearInterval(timer);
  }, [currentIndex, goToNext]);

  useEffect(() => {
    if (thumbnailsContainerRef.current) {
      const container = thumbnailsContainerRef.current;
      const activeThumbnail = container.children[currentIndex];
      if (activeThumbnail) {
        const containerCenter = container.offsetWidth / 2;
        const thumbnailCenter = activeThumbnail.offsetLeft + activeThumbnail.offsetWidth / 2;
        const scrollLeft = thumbnailCenter - containerCenter;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      <div className="slides-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
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
        <div className="slide-thumbnails" ref={thumbnailsContainerRef}>
          {slidesData.map((thumbSlide, slideIndex) => (
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