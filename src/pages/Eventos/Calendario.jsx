import React, { useState, useMemo, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaCalendarDay } from "react-icons/fa";

import "./Calendario.css";

// Imports locais da mesma pasta
import InformacoesCalendario from "./InformacoesCalendario.jsx";
import ModalInformacoes from "./ModalInformacoes.jsx";

// Importação de Imagens (Vite Glob) - Caminho corrigido baseado na sua árvore
const imageModules = import.meta.glob(
  "../../assets/images/*.{jpg,jpeg,png,webp}",
  { eager: true, as: "url" }
);
const imageUrls = Object.values(imageModules);

// Fallback seguro
const getRandomImage = () => {
  if (!imageUrls.length) return "";
  return imageUrls[Math.floor(Math.random() * imageUrls.length)];
};

/* --- DADOS DE EXEMPLO --- 
   Nota: Futuramente, pode substituir isto por: 
   import { eventsData } from "../../data/eventsData"; 
*/
const generateMockEvents = () => {
  const events = [];
  const today = new Date();
  const titles = ["Workshop Luz", "Saída Urbana", "Reunião Mensal", "Edição Criativa", "Exposição"];
  
  for (let i = 0; i < 40; i++) {
    const offset = Math.floor(Math.random() * 60) - 15;
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
    events.push({
      id: i,
      title: titles[i % titles.length],
      dateObj: d,
      time: "14:00",
      location: "Sede FotoClube",
      image: getRandomImage(),
      description: "Evento exclusivo para sócios e convidados.",
      type: "normal"
    });
  }
  return events;
};

const cachedEvents = generateMockEvents();

export default function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedEvents, setSelectedEvents] = useState([]);
  
  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState(null);

  // Cálculos de Data
  const { monthName, year, daysInMonth, firstDayOfWeek } = useMemo(() => {
    const y = currentDate.getFullYear();
    const m = currentDate.getMonth();
    return {
      monthName: new Date(y, m).toLocaleString("pt-PT", { month: "long" }),
      year: y,
      daysInMonth: new Date(y, m + 1, 0).getDate(),
      firstDayOfWeek: new Date(y, m, 1).getDay(),
    };
  }, [currentDate]);

  useEffect(() => {
    if (!selectedDay) {
      setSelectedEvents([]);
      return;
    }
    const evts = cachedEvents.filter(e => 
      e.dateObj.getDate() === selectedDay &&
      e.dateObj.getMonth() === currentDate.getMonth() &&
      e.dateObj.getFullYear() === currentDate.getFullYear()
    );
    setSelectedEvents(evts);
  }, [selectedDay, currentDate]);

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    setSelectedDay(null);
  };

  const jumpToToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDay(now.getDate());
  };

  const openModal = (evt) => { setModalEvent(evt); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setModalEvent(null); };

  // Render Grid
  const renderGrid = () => {
    const cells = [];
    const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
    
    weekDays.forEach((d, i) => cells.push(<div key={`h-${i}`} className="cal-header-day">{d}</div>));
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push(<div key={`empty-${i}`} className="cal-day empty" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = cachedEvents.filter(e => 
        e.dateObj.getDate() === day &&
        e.dateObj.getMonth() === currentDate.getMonth() &&
        e.dateObj.getFullYear() === currentDate.getFullYear()
      );
      
      const isSelected = selectedDay === day;
      const isToday = day === new Date().getDate() && 
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear();

      cells.push(
        <div 
          key={day} 
          className={`cal-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${dayEvents.length ? 'has-event' : ''}`}
          onClick={() => setSelectedDay(day)}
        >
          <span className="cal-day-num">{day}</span>
          {dayEvents.length > 0 && (
            <div className="cal-dots">
              {dayEvents.slice(0, 3).map((_, i) => <span key={i} className="cal-dot"/>)}
            </div>
          )}
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="calendario-wrapper">
      <div className="calendario-main">
        <header className="cal-header">
          <div>
            <h2 className="cal-month-title">{monthName} <span>{year}</span></h2>
          </div>
          <div className="cal-controls">
            <button onClick={jumpToToday} className="btn-mini-today" title="Hoje"><FaCalendarDay/></button>
            <div className="nav-arrows">
              <button onClick={() => changeMonth(-1)}><FaChevronLeft/></button>
              <button onClick={() => changeMonth(1)}><FaChevronRight/></button>
            </div>
          </div>
        </header>
        
        <div className="cal-grid">
          {renderGrid()}
        </div>
      </div>

      <div className="calendario-sidebar-wrapper">
        <InformacoesCalendario 
          selectedEvents={selectedEvents}
          selectedDay={selectedDay}
          monthName={monthName}
          openModal={openModal}
        />
      </div>

      <ModalInformacoes 
        modalOpen={modalOpen} 
        modalEvent={modalEvent} 
        closeModal={closeModal} 
      />
    </div>
  );
}