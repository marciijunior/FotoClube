// src/pages/eventos_calendario/PaginaEventosCalendario.jsx

import React, { useState, useMemo, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// CSS específico do calendário (grade / dias)
import "./Calendario.css";

// Componentes separados
import InformacoesCalendario from "./InformacoesCalendario.jsx";
import ModalInformacoes from "./ModalInformacoes.jsx";
import { eventsData } from "../../data/eventsData";

// carrega todas as imagens de src/assets/images (Vite / import.meta.glob)
const imageModules = import.meta.glob(
  "../../assets/images/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    as: "url",
  }
);
const imageUrls = Object.values(imageModules);

// utilitário para pegar imagem aleatória (fallback caso vazio)
const getRandomImage = () => {
  if (!imageUrls || imageUrls.length === 0) {
    // fallback antigo se não houver imagens no diretório
    return `/src/assets/images/event-placeholder-1.jpg`;
  }
  return imageUrls[Math.floor(Math.random() * imageUrls.length)];
};

// --- DADOS MOCK (inclui dias passados e futuros) ---
const EVENTS_COUNT = 1000;
const MAX_DAYS_WITH_EVENTS = 60; // dias distintos com eventos
const MAX_EVENTS_PER_DAY = 6;
const PAST_DAYS = 90;   // quantos dias no passado podem ter eventos
const FUTURE_DAYS = 180; // quantos dias no futuro podem ter eventos

const SPAN_DAYS = PAST_DAYS + FUTURE_DAYS + 1; // janela total

const mockEvents = (() => {
  const start = new Date(); // referência (hoje)
  const arr = [];
  const titles = [
    "Encontro Aberto",
    "Saída Fotográfica",
    "Palestra Técnica",
    "Oficina Prática",
    "Exibição de Fotos",
    "Concurso Mensal",
    "Sessão de Crítica",
    "Tarde de Revelação",
  ];

  // escolhe dias distintos dentro da janela passada+futura
  const dayOffsets = new Set();
  while (dayOffsets.size < Math.min(MAX_DAYS_WITH_EVENTS, SPAN_DAYS)) {
    // offset em [-PAST_DAYS, FUTURE_DAYS]
    const off = Math.floor(Math.random() * SPAN_DAYS) - PAST_DAYS;
    dayOffsets.add(off);
  }
  const eventDays = Array.from(dayOffsets);

  const countsByOffset = {};
  for (const off of eventDays) countsByOffset[off] = 0;

  let created = 0;
  let attempt = 0;
  const maxAttempts = EVENTS_COUNT * 5;

  while (created < EVENTS_COUNT && attempt < maxAttempts) {
    attempt++;
    const off = eventDays[Math.floor(Math.random() * eventDays.length)];
    if (countsByOffset[off] >= MAX_EVENTS_PER_DAY) continue;

    const dateObj = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() + off
    );

    const hour = String(9 + Math.floor(Math.random() * 10)).padStart(2, "0");
    const minute = ["00", "15", "30", "45"][Math.floor(Math.random() * 4)];
    const id = `mock-${created}-${dateObj.getTime()}`;

    arr.push({
      id,
      title: titles[created % titles.length] + (created % 5 === 0 ? " — Especial" : ""),
      dateObj,
      time: `${hour}:${minute}`,
      location: ["Estúdio", "Parque", "Museu", "Praça"][created % 4],
      image: getRandomImage(),
      description: `Descrição do evento ${created + 1} — detalhes e informações importantes.`,
    });

    countsByOffset[off] += 1;
    created += 1;
  }

  return arr;
})();
// --- FIM DOS DADOS MOCK ---

export default function PaginaEventosCalendario() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1));
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState(null);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const openModal = (event) => {
    setModalEvent(event);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalEvent(null);
  };

  const { monthName, year, daysInMonth, firstDayOfWeek } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = new Date(year, month).toLocaleString("pt-BR", {
      month: "long",
    });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    return { monthName, year, daysInMonth, firstDayOfWeek };
  }, [currentDate]);

  const calendarCells = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarCells.push(
      <div key={`pad-start-${i}`} className="calendar-day empty" />
    );
  }

  const handleDayClick = (day, events) => {
    setSelectedDay(day);
    setSelectedEvents(events);
  };

  for (let day = 1; day <= daysInMonth; day++) {
    const eventsOnThisDay = mockEvents.filter(
      (e) =>
        e.dateObj.getDate() === day &&
        e.dateObj.getMonth() === currentDate.getMonth() &&
        e.dateObj.getFullYear() === currentDate.getFullYear()
    );

    calendarCells.push(
      <div
        key={`day-${day}`}
        className={`calendar-day ${
          eventsOnThisDay.length > 0 ? "has-events" : ""
        } ${selectedDay === day ? "selected" : ""}`}
        onClick={() => handleDayClick(day, eventsOnThisDay)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ")
            handleDayClick(day, eventsOnThisDay);
        }}
        role={eventsOnThisDay.length > 0 ? "button" : undefined}
        tabIndex={0}
        aria-label={`${day} - ${eventsOnThisDay.length} evento(s)`}
        title={
          eventsOnThisDay.length > 0
            ? `${eventsOnThisDay.length} evento(s)`
            : undefined
        }
      >
        <div className="day-top">
          <span className="day-number">{day}</span>

          {eventsOnThisDay.length > 0 && (
            <div className="event-count" aria-hidden="true">
              {eventsOnThisDay.length}
            </div>
          )}
        </div>

        {/* NOVO: lista compacta (até 2) com títulos dos eventos */}
        {eventsOnThisDay.length > 0 && (
          <div className="day-events" aria-hidden="true">
            {eventsOnThisDay.slice(0, 2).map((e) => (
              <div key={e.id} className="day-event-item" title={e.title}>
                {e.title}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const changeMonth = (offset) => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1)
    );
    setSelectedDay(null);
    setSelectedEvents([]);
  };

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // exemplo: pegar os 6 eventos mais recentes
  const recentFromData = (eventsData || [])
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);
  console.log("recentFromData:", recentFromData); // remove em produção

  return (
    <div className="pagina-eventos-calendario">
      <div className="eventos-container-calendario">
        <div className="calendar-main-content">
          <header className="calendar-header">
            <h1 className="calendar-title">Nossos Encontros</h1>
            <div className="calendar-nav">
              <button
                className="nav-button prev"
                onClick={() => changeMonth(-1)}
                aria-label="Mês Anterior"
              >
                <FaChevronLeft className="nav-icon" />
                <span className="nav-label"></span>
              </button>

              <h2 className="calendar-month-year">{`${monthName} ${year}`}</h2>

              <button
                className="nav-button next"
                onClick={() => changeMonth(1)}
                aria-label="Próximo Mês"
              >
                <span className="nav-label"></span>
                <FaChevronRight className="nav-icon" />
              </button>
            </div>
          </header>

          <div className="calendar-weekdays">
            {weekDays.map((d) => (
              <div key={d} className="weekday-header">
                {d}
              </div>
            ))}
          </div>

          <div className="calendar-grid">{calendarCells}</div>
        </div>

        {/* Sidebar separado */}
        <InformacoesCalendario
          selectedEvents={selectedEvents}
          selectedDay={selectedDay}
          monthName={monthName}
          openModal={openModal}
        />
      </div>

      {/* Modal separado */}
      <ModalInformacoes
        modalOpen={modalOpen}
        modalEvent={modalEvent}
        closeModal={closeModal}
      />
    </div>
  );
}
