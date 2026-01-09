// src/components/layout/Footer.jsx

import React from "react";
// 1. Ícones da biblioteca 'fa' (Font Awesome 5)
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaWhatsapp,
} from "react-icons/fa";

// 2. Ícones da biblioteca 'fa6' (Font Awesome 6)
import { FaBehance, FaFlickr, Fa500Px, FaVimeoV } from "react-icons/fa6";

import { Link } from "react-router-dom";
import "./Footer.css"; // O CSS do Modo Claro (que você já tem) está correto

const logoSrc = "/logo-fotoclube-azul.png";

function Footer() {
  return (
    <footer className="footer-container">
      {/* --- Cabeçalho do Rodapé (APENAS O LOGO) --- */}
      <div className="footer-header">
        <img src={logoSrc} alt="FotoClube Logo" className="footer-logo" />
      </div>

      {/* --- Conteúdo Principal (Grid de 3 Colunas) --- */}
      <div className="footer-main">
        {/* --- Coluna 1: Contatos --- */}
        <div className="footer-column">
          <h3 className="footer-title">Contato</h3>
          <ul className="footer-contact-list">
            <li>
              <FaMapMarkerAlt /> <span>Rua Fictícia, 123 - Araçatuba, SP</span>
            </li>
            <li>
              <FaPhone /> <span>(18) 99999-9999</span>
            </li>
            <li>
              <FaEnvelope /> <span>contato@fotoclubearacatuba.com.br</span>
            </li>
          </ul>
        </div>

        {/* --- Coluna 2: Parceiros --- */}
        <div className="footer-column">
          <h3 className="footer-title">Nossos Parceiros</h3>
          <p className="footer-partners-text">
            Agradecemos aos parceiros que apoiam nossa paixão pela fotografia.
          </p>
          <div className="footer-partners-grid">
            <img
              // src removido: logo.clearbit.com/canon.com
              alt="Canon Logo"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <img
              // src removido: logo.clearbit.com/nikon.com
              alt="Nikon Logo"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <img
              // src removido: logo.clearbit.com/adobe.com
              alt="Adobe Logo"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <img
              // src removido: logo.clearbit.com/fujifilm.com
              alt="Fujifilm Logo"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        </div>

        {/* --- Coluna 3: Localização --- */}
        <div className="footer-column">
          <h3 className="footer-title">Nossa Sede</h3>
          <div className="footer-map-wrapper">
            {/* --- MUDANÇA IMPORTANTE AQUI --- */}
            <iframe
              /* ESTE É O LINK DE EMBED PÚBLICO E CORRETO */
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119185.00811867169!2d-50.49133282110756!3d-21.20576389718413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x949609a5b3185a73%3A0x44f9f74a00511e4e!2sAra%C3%A7atuba%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1729868822080!5m2!1spt-BR!2sbr"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Araçatuba"
            ></iframe>
            {/* --- FIM DA MUDANÇA --- */}
          </div>
        </div>
      </div>

      {/* --- Barra Social (Vem antes do Copyright) --- */}
      <div className="footer-social-bar">
        <h3 className="footer-title social-title">Siga-nos</h3>
        <div className="footer-social-links">
          <a href="#" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="#" aria-label="Behance">
            <FaBehance />
          </a>
          <a href="#" aria-label="Flickr">
            <FaFlickr />
          </a>
          <a href="#" aria-label="500px">
            <Fa500Px />
          </a>{" "}
          <a href="#" aria-label="Pinterest">
            <FaPinterestP />
          </a>
          <a href="#" aria-label="Vimeo">
            <FaVimeoV />
          </a>
          <a href="#" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* --- Barra de Copyright (Por último) --- */}
      <div className="footer-copyright">
        <p>
          © {new Date().getFullYear()} FotoClube de Araçatuba. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
