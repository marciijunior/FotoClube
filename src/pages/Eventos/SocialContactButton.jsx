import React, { useState, useRef, useEffect } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
  FaTwitter,
} from "react-icons/fa";
import "./InformacoesCalendario.css"; // usa estilos já existentes (.sidebar-event-button)

export default function SocialContactButton({
  networks = [
    {
      id: "instagram",
      label: "Instagram",
      href: "https://instagram.com/seu_perfil",
      icon: <FaInstagram />,
    },
    {
      id: "facebook",
      label: "Facebook",
      href: "https://facebook.com/seu_perfil",
      icon: <FaFacebookF />,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/5511999999999",
      icon: <FaWhatsapp />,
    },
    {
      id: "email",
      label: "E-mail",
      href: "mailto:contato@seudominio.com",
      icon: <FaEnvelope />,
    },
    {
      id: "twitter",
      label: "X / Twitter",
      href: "https://twitter.com/seu_perfil",
      icon: <FaTwitter />,
    },
  ],
  label = "Contato",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, []);

  return (
    <div className="social-contact" ref={ref}>
      <button
        className="sidebar-event-button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
      >
        {label}
      </button>

      {open && (
        <div
          className="contact-dropdown"
          role="menu"
          aria-label="Opções de contato"
        >
          {networks.map((n) => (
            <a
              key={n.id}
              className="contact-item"
              role="menuitem"
              href={n.href}
              target={n.href.startsWith("mailto:") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <span className="contact-icon" aria-hidden="true">
                {n.icon}
              </span>
              <span className="contact-label">{n.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
