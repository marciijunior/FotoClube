import { useState, useEffect, useCallback, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { slidesData } from "../../data/slidesData";
import "./HeroCarousel.css";

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

  useEffect(() => {
    const timer = setInterval(() => goToNext(), 8000);
    return () => clearInterval(timer);
  }, [currentIndex, goToNext]); 

  useEffect(() => {
    const updateTimeout = setTimeout(() => {
      const newVisibleOrder = [];
      for (let i = 0; i < NUM_VISIBLE_THUMBNAILS; i++) {
        const dataIndex =
          (currentIndex + i + slidesData.length) % slidesData.length;
        newVisibleOrder.push({
          ...slidesData[dataIndex],
          originalIndex: dataIndex,
        });
      }
      setVisibleThumbnails(newVisibleOrder);
    }, 100);

    return () => clearTimeout(updateTimeout);
  }, [currentIndex]);

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
            className={`slide ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <p className="location">{slide.location}</p>
              <h2 className="title">{slide.title}</h2>
              <p className="author">{slide.author}</p>
              <div className="actions">
                <button className="bookmark-button">
                  <FaRegBookmark />
                </button>
                <Link
                  to={`/detalhes-foto/${slide.id}`}
                  className="read-more-button"
                >
                  Ler Mais
                </Link>
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
              className={`thumbnail ${displayIndex === 0 ? "active-thumbnail" : ""}`}
              onClick={() => goToSlide(thumbData.originalIndex)}
            >
              <img src={thumbData.image} alt={`Thumbnail ${thumbData.title}`} />
            </div>
          ))}
        </div>
        <div className="navigation-controls">
          <div className="counter">
            {(currentIndex + 1).toString().padStart(2, "0")}
          </div>
          <div className="navigation">
            <button onClick={goToPrevious} className="arrow">
              <FaChevronLeft />
            </button>
            <button onClick={goToNext} className="arrow">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;
