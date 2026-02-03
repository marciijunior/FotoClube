// src/components/layout/Header.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import "./Header.css";

// Ambas as versões do logo vêm do bundle para evitar glitches
import logoBranco from "../../assets/logo-fotoclube.png";
import logoAzul from "../../assets/logo-fotoclube-azul.png";

function Header({ isHomePage }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Detectar se está no topo
      setIsAtTop(currentScrollY < 50);

      // Mostrar header ao rolar para cima, esconder ao rolar para baixo
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const headerClass = `header ${!isHomePage ? "header-solid" : ""} ${!isVisible ? "header-hidden" : ""} ${!isAtTop ? "header-scrolled" : ""}`;

  // Exibe logo branco apenas no topo da Home; demais casos usam logo azul
  const logoSrc = isHomePage && isAtTop ? logoBranco : logoAzul;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={headerClass}>
      <Link to="/" className="logo">
        <img src={logoSrc} alt="FotoClube Logo" />
      </Link>

      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={`nav ${isMobileMenuOpen ? "nav-mobile-open" : ""}`}>
        <Link to="/eventos" className="nav-link" onClick={closeMobileMenu}>
          Eventos
        </Link>

        <div className={`dropdown ${isDropdownOpen ? "dropdown-open" : ""}`}>
          <span className="nav-link dropdown-toggle" onClick={toggleDropdown}>
            Concursos
            <FaChevronDown className="dropdown-arrow" />
          </span>
          <div className="dropdown-menu">
            <Link
              to="/foto-do-mes"
              className="dropdown-item"
              onClick={closeMobileMenu}
            >
              Foto do Mês
            </Link>
          </div>
        </div>

        <Link to="/sobre" className="nav-link" onClick={closeMobileMenu}>
          Sobre Nós
        </Link>
        <Link to="/contatos" className="nav-link" onClick={closeMobileMenu}>
          Contatos
        </Link>

        {/* Botão Seja Associado mantido */}
        <Link
          to="/contatos"
          className="nav-link-highlight"
          onClick={closeMobileMenu}
        >
          Seja Associado
        </Link>
      </nav>
    </header>
  );
}

export default Header;
