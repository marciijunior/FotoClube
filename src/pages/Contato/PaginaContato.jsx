import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { SEND_CONTACT_MESSAGE } from "../../graphql/mutations";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import "./PaginaContato.css";

function PaginaContato() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const [sendMessage, { loading }] = useMutation(SEND_CONTACT_MESSAGE);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      const { data } = await sendMessage({
        variables: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || null,
          message: formData.message,
        },
      });

      if (data.sendContactMessage.ok) {
        setStatus({
          type: "success",
          message: data.sendContactMessage.message,
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", message: data.sendContactMessage.message });
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setStatus({
        type: "error",
        message: "Erro ao enviar mensagem. Tente novamente.",
      });
    }
  };

  return (
    <div className="contact-page-wrapper">
      <section className="contact-hero">
        <h1>Fale Conosco</h1>
        <p>
          Tem dúvidas sobre como se associar, sugestões de eventos ou quer
          apenas bater um papo sobre fotografia? Estamos à disposição.
        </p>
      </section>

      <div className="contact-container">
        <div className="contact-info-column">
          <div className="contact-info-item">
            <div className="contact-icon-box">
              <FaMapMarkerAlt />
            </div>
            <div className="contact-details">
              <h3>Nossa Sede</h3>
              <p>Estúdio 4K Fotografia</p>
              <p>Rua José Bonifácio 114</p>
              <p>Araçatuba - SP, 16010-380</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon-box">
              <FaEnvelope />
            </div>
            <div className="contact-details">
              <h3>E-mail</h3>
              <a href="mailto:fotoclubearacatuba@gmail.com">
                fotoclubearacatuba@gmail.com
              </a>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon-box">
              <FaInstagram />
            </div>
            <div className="contact-details">
              <h3>Redes Sociais</h3>
              <a
                href="https://instagram.com/fotoclube_aracatuba"
                target="_blank"
                rel="noopener noreferrer"
              >
                @fotoclube_aracatuba
              </a>
              <p>Siga-nos para novidades diárias.</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon-box">
              <FaWhatsapp />
            </div>
            <div className="contact-details">
              <h3>WhatsApp</h3>
              <a
                href="https://wa.me/5518999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                (18) 99999-9999
              </a>
              <p>Atendimento comercial.</p>
            </div>
          </div>

          <div className="contact-map-small">
            <iframe
              title="Mapa FotoClube"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3714.976854503564!2d-50.43481692397757!3d-21.190054980499644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x949643ec3c6d6b9f%3A0x7b3647363587380!2sR.%20Jos%C3%A9%20Bonif%C3%A1cio%2C%20114%20-%20Vila%20Mendonca%2C%20Ara%C3%A7atuba%20-%20SP%2C%2016015-050!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="contact-form-column">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Seu Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Como gosta de ser chamado?"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Seu E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="exemplo@email.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                Assunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-input"
                placeholder="Sobre o que quer falar?"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="Escreva sua mensagem aqui..."
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Mensagem"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaginaContato;
