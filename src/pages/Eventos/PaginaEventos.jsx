// src/pages/eventos/PaginaEventos.jsx

import React, { useState } from 'react';
import {
  FaHeart,
  FaShareAlt,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { eventsData } from '../../data/eventsData';
import './PaginaEventos.css'; // Importa o novo CSS

// --- COMPONENTE: Banner do Evento em Destaque ---
function BannerDestaque({ evento }) {
  if (!evento) return null;

  return (
    <div
      className="evento-destaque-banner"
      style={{ backgroundImage: `url(${evento.image})` }}
    >
      <div className="evento-destaque-conteudo">
        <h2>{evento.title}</h2>
        <p>{evento.description}</p>
        <span>{evento.location}</span>
      </div>
    </div>
  );
}

// --- COMPONENTE: Card de Evento da Lista ---
function CardEvento({ evento }) {
  return (
    <div className="evento-card">
      <img src={evento.image} alt={evento.title} className="evento-imagem" />
      <div className="evento-detalhes">
        <div className="evento-meta">
          <span>{evento.date}</span>
          <span>{evento.time}</span>
        </div>
        <h3>{evento.title}</h3>
        <p className="evento-descricao">{evento.description}</p>
        <p className="evento-local">{evento.location}</p>
      </div>
      <div className="evento-acoes">
        <div className="evento-prompt">
          <span>Tem interesse?</span>
          <button className="evento-botao-saiba-mais">Saiba mais!</button>
        </div>
        <div className="evento-social-botoes">
          <button>
            <FaHeart /> {evento.likes || 0}
          </button>
          <button>
            <FaShareAlt />
          </button>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL DA PÁGINA ---
function PaginaEventos() {
  const [filtro, setFiltro] = useState('proximos'); // 'proximos' ou 'passados'

  // Lógica de filtragem (exemplo)
  const eventoDestaque = eventsData.find((evento) => evento.isFeatured);
  const outrosEventos = eventsData.filter((evento) => !evento.isFeatured);

  return (
    <div className="pagina-eventos">
      <div className="eventos-container">
        <header className="eventos-header">
          <h1>Eventos</h1>
          <div className="filtro-botoes">
            <button
              className={`filtro-botao ${
                filtro === 'proximos' ? 'ativo' : ''
              }`}
              onClick={() => setFiltro('proximos')}
            >
              Próximos Eventos
            </button>
            <button
              className={`filtro-botao ${
                filtro === 'passados' ? 'ativo' : ''
              }`}
              onClick={() => setFiltro('passados')}
            >
              Eventos Passados
            </button>
          </div>
        </header>

        {/* Banner de Destaque (só aparece nos "próximos") */}
        {filtro === 'proximos' && <BannerDestaque evento={eventoDestaque} />}

        {/* Lista de Eventos */}
        <div className="lista-eventos">
          {outrosEventos.map((evento) => (
            <CardEvento key={evento.id} evento={evento} />
          ))}
        </div>

        {/* Paginação (Exemplo) */}
        <div className="paginacao">
          <button>
            <FaChevronLeft />
          </button>
          <button className="ativo">1</button>
          <button>2</button>
          <button>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaginaEventos;