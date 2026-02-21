import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import "./SecaoSobre.css";

import grupo1 from "../../assets/Grupo1.jpg";
import grupo2 from "../../assets/Grupo2.jpg";

function DraggableImage({ src, alt, className }) {
  const elRef = useRef(null);
  const dragRef = useRef(null);

  const onPointerDown = (e) => {
    e.preventDefault();
    const el = elRef.current;
    el.setPointerCapture(e.pointerId);
    el.style.transition = "none";
    el.style.cursor = "grabbing";
    el.style.zIndex = "20";
    dragRef.current = { startX: e.clientX, startY: e.clientY };
  };

  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    elRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onPointerUp = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    const el = elRef.current;
    el.style.transition =
      "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s";
    el.style.transform = "translate(0px, 0px)";
    el.style.cursor = "grab";
    const cleanup = (ev) => {
      if (ev.propertyName !== "transform") return;
      el.style.transform = "";
      el.style.transition = "";
      el.style.zIndex = "";
      el.removeEventListener("transitionend", cleanup);
    };
    el.addEventListener("transitionend", cleanup);
  };

  const sharedProps = {
    ref: elRef,
    className: `magazine-image ${className}`,
    draggable: false,
    style: { cursor: "grab", touchAction: "none", userSelect: "none" },
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
  };

  return src ? (
    <img {...sharedProps} src={src} alt={alt} />
  ) : (
    <div {...sharedProps} aria-label={alt} />
  );
}

function AboutSection() {
  return (
    <section className="about-section-magazine">
      <div className="magazine-container">
        <div className="magazine-image-stack">
          <DraggableImage
            src={grupo1}
            alt="Foto do clube 1"
            className="image-back"
          />
          <DraggableImage
            src={grupo2}
            alt="Foto do clube 2"
            className="image-front"
          />
        </div>

        <div className="magazine-text-box">
          <h2 className="magazine-title">Nossa História, Nossas Lentes</h2>
          <p className="magazine-text">
            Fundado em 2015, o FotoClube nasceu da paixão compartilhada de um
            pequeno grupo de fotógrafos. O que começou como encontros informais
            para discutir técnicas rapidamente cresceu.
          </p>
          <p className="magazine-text">
            Hoje, somos uma comunidade vibrante dedicada a aprender, praticar e
            celebrar a arte da fotografia em Araçatuba.
          </p>
          <Link to="/sobre" className="magazine-link">
            Conheça nossa história completa <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
