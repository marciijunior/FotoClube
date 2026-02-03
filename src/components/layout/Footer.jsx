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

// Usa logo do bundle para evitar corromper em build/cache
import logoSrc from "../../assets/logo-fotoclube-azul.png";
import logoMarcioJunior from "../../assets/logoMarcioJunior.png";
import logoMarcioJunior3 from "../../assets/logoMarcioJunior3.png";
import logoEstudio4k from "../../assets/logoEstudio4k.png";
import brasaoPrefeitura from "../../assets/BrasaoPrefeitura.png";

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
              <FaMapMarkerAlt />{" "}
              <span> R. José Bonifácio, 114 - Centro, Araçatuba - SP</span>
            </li>
            <li>
              <FaPhone /> <span>18 98807-9910</span>
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
            <a
              href="https://aracatuba.sp.gov.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={brasaoPrefeitura}
                alt="Logo Prefeitura de Araçatuba"
                style={{
                  height: 70,
                  marginRight: 12,
                  border: "2px solid #0800382d",
                  borderRadius: 6,
                  background: "#fff",
                }}
              />
            </a>
            <a
              href="https://marciojunior.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logoMarcioJunior3}
                alt="Logo Marcio Junior Web Desenvolvedor"
                style={{
                  height: 70,
                  marginRight: 12,
                  border: "2px solid #ff5e002f",
                  borderRadius: 6,
                  background: "#fff",
                }}
              />
            </a>
            <a
              href="https://www.instagram.com/estudio4kfotografia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logoEstudio4k}
                alt="Logo Estúdio 4K Fotografia"
                style={{
                  height: 70,
                  marginRight: 12,
                  border: "2px solid #ff5e002f",
                  borderRadius: 6,
                  background: "#fff",
                }}
              />
            </a>
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
              width="100%"
              height="100%"
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
          <a href="#" aria-label="Pinterest">
            <FaPinterestP />
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
          direitos reservados. Desenvolvido por
          <a
            href="https://marciojunior.dev"
            target="blank"
            rel="noopener noreferrer"
          > Marcio Junior
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
