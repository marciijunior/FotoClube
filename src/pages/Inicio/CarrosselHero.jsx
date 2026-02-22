import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { normalizeImage } from "../../lib/imageUtils";
import "./CarrosselHero.css";

const NUM_VISIBLE_THUMBNAILS = 5;

const GET_SLIDES = gql`
  query GetSlides {
    allSlides {
      id
      image
      title
      subtitle
      author
      order
    }
  }
`;

function HeroCarousel() {
  const { data, loading, error } = useQuery(GET_SLIDES, {
    fetchPolicy: "network-only",
  });

  const slidesData = useMemo(
    () => [...(data?.allSlides || [])].sort((a, b) => a.order - b.order),
    [data],
  );

  const normalizeImg = (img) => normalizeImage(img);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleThumbnails, setVisibleThumbnails] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favoriteSlides");
    return saved ? JSON.parse(saved) : [];
  });
  const slidesWrapperRef = useRef(null);

  const goToNext = useCallback(() => {
    if (slidesData.length === 0) return;
    const isLastSlide = currentIndex === slidesData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slidesData.length]);

  const goToPrevious = () => {
    if (slidesData.length === 0) return;
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slidesData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const toggleFavorite = (slideId) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(slideId)
        ? prev.filter((id) => id !== slideId)
        : [...prev, slideId];
      localStorage.setItem("favoriteSlides", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  useEffect(() => {
    if (slidesData.length === 0) return;
    const timer = setInterval(() => goToNext(), 8000);
    return () => clearInterval(timer);
  }, [currentIndex, goToNext, slidesData.length]);

  useEffect(() => {
    if (slidesData.length === 0) return;
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
  }, [currentIndex, slidesData]);

  useEffect(() => {
    if (slidesWrapperRef.current && slidesData.length > 0) {
      slidesWrapperRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex, slidesData.length]);

  // Se não houver slides, mostrar apenas fundo preto
  if (loading || error) {
    return (
      <div
        className="carousel-container"
        style={{ backgroundColor: "#000", minHeight: "600px" }}
      >
        {/* Carregando... */}
      </div>
    );
  }

  if (slidesData.length === 0) {
    return (
      <div
        className="carousel-container"
        style={{ backgroundColor: "#000", minHeight: "600px" }}
      >
        {/* Fundo preto sem conteúdo */}
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <div className="slides-wrapper" ref={slidesWrapperRef}>
        {slidesData.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentIndex ? "active" : ""}`}
            style={{
              backgroundImage: `url(${normalizeImg(slide.image) || ""})`,
            }}
          >
            <div className="slide-content">
              <p className="location">{slide.title}</p>
              <h2 className="title">{slide.subtitle}</h2>
              <p className="author">Por {slide.author}</p>
              <div className="actions">
                <button
                  className="bookmark-button"
                  onClick={() => toggleFavorite(slide.id)}
                  title={
                    favorites.includes(slide.id)
                      ? "Remover dos favoritos"
                      : "Adicionar aos favoritos"
                  }
                >
                  {favorites.includes(slide.id) ? <FaStar /> : <FaRegStar />}
                </button>
                <Link to={`/foto-do-mes`} className="read-more-button">
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
              key={`thumb-${thumbData.id}-pos${displayIndex}-idx${thumbData.originalIndex}`}
              className={`thumbnail ${displayIndex === 0 ? "active-thumbnail" : ""}`}
              onClick={() => goToSlide(thumbData.originalIndex)}
            >
              <img
                src={normalizeImg(thumbData.image) || ""}
                alt={`Thumbnail ${thumbData.title}`}
              />
            </div>
          ))}
        </div>
        <div className="navigation-controls">
          <div className="counter">
            {(currentIndex + 1).toString().padStart(2, "0")}
          </div>
          <div className="navigation">
            <button
              onClick={goToPrevious}
              className="arrow"
              aria-label="Slide anterior"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={goToNext}
              className="arrow"
              aria-label="Próximo slide"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;
