import React, { useState, useMemo, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaFilter, FaCalendarCheck } from "react-icons/fa";
import { useSearchParams } from "react-router-dom"; 
import "./Calendario.css";
import InformacoesCalendario from "./InformacoesCalendario.jsx";
import ModalInformacoes from "./ModalInformacoes.jsx";
import { eventsData } from "../../data/eventsData";

const CATEGORIES = [
  { id: 'all', label: 'Todos', color: '#ccc' },
  { id: 'Workshop', label: 'Workshops', color: '#8e44ad' },
  { id: 'Passeio', label: 'Passeios', color: '#27ae60' },
  { id: 'Exposição', label: 'Exposições', color: '#e67e22' },
  { id: 'Reunião', label: 'Reuniões', color: '#2980b9' },
];

const getEventMeta = (event) => {
  const title = event.title.toLowerCase();
  let category = 'Outros';
  let color = 'var(--color-primary)';

  if (title.includes('workshop') || title.includes('curso')) { category = 'Workshop'; color = '#8e44ad'; }
  else if (title.includes('passeio') || title.includes('saída')) { category = 'Passeio'; color = '#27ae60'; }
  else if (title.includes('exposição') || title.includes('galeria')) { category = 'Exposição'; color = 'var(--color-accent)'; } // Laranja do tema
  else if (title.includes('encontro') || title.includes('reunião')) { category = 'Reunião'; color = '#2980b9'; }

  return { category, color };
};

const imageModules = import.meta.glob(
  "../../assets/images/*.{jpg,jpeg,png,webp}",
  { eager: true, as: "url" }
);
const imageUrls = Object.values(imageModules);
const getRandomImage = () => imageUrls.length ? imageUrls[Math.floor(Math.random() * imageUrls.length)] : "";

export default function Calendario() {
  const [searchParams] = useSearchParams();

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); 
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState(null);

  useEffect(() => {
    const dia = searchParams.get('dia');
    const mes = searchParams.get('mes');
    const ano = searchParams.get('ano');
    if (dia && mes && ano) {
      setCurrentYear(parseInt(ano));
      setCurrentMonth(parseInt(mes));
      setSelectedDay(parseInt(dia));
      const el = document.getElementById('calendario-anchor');
      if(el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [searchParams]);

  const eventsByDay = useMemo(() => {
    const map = {};
    eventsData.forEach(event => {
       try {
         const [dayStr, rest] = event.date.split(', ');
         const [monthStr, yearStr] = rest.split('-');
         const monthsMap = { 'Jan':0, 'Fev':1, 'Mar':2, 'Abr':3, 'Mai':4, 'Jun':5, 'Jul':6, 'Ago':7, 'Set':8, 'Out':9, 'Nov':10, 'Dez':11 };
         
         const evtDay = parseInt(dayStr);
         const evtMonth = monthsMap[monthStr];
         const evtYear = parseInt(yearStr);
         const { category, color } = getEventMeta(event);
         const matchesFilter = activeFilter === 'all' || category === activeFilter;

         if (evtMonth === currentMonth && evtYear === currentYear && matchesFilter) {
            if (!map[evtDay]) map[evtDay] = [];
            map[evtDay].push({ ...event, image: event.image || getRandomImage(), category, color });
         }
       } catch (e) { console.error("Erro data:", e); }
    });
    return map;
  }, [currentMonth, currentYear, activeFilter]);

  const changeMonth = (offset) => {
    let newMonth = currentMonth + offset;
    let newYear = currentYear;
    if (newMonth < 0) { newMonth = 11; newYear -= 1; }
    else if (newMonth > 11) { newMonth = 0; newYear += 1; }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDay(null);
  };

  const goToToday = () => {
    const hoje = new Date();
    setCurrentMonth(hoje.getMonth());
    setCurrentYear(hoje.getFullYear());
    setSelectedDay(hoje.getDate());
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarCells.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  
  for (let d = 1; d <= daysInMonth; d++) {
    const dayEvents = eventsByDay[d] || [];
    const isSelected = d === selectedDay;
    const today = new Date();
    const isToday = d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

    let classes = `calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`;

    calendarCells.push(
      <div key={d} className={classes} onClick={() => setSelectedDay(d)}>
        <span className="day-number">{d}</span>
        <div className="day-dots">
          {dayEvents.slice(0, 4).map((ev, idx) => (
            <span key={idx} className="dot" style={{ backgroundColor: ev.color }} title={ev.title} />
          ))}
          {dayEvents.length > 4 && <span className="dot plus" style={{backgroundColor: '#555'}}></span>}
        </div>
      </div>
    );
  }

  return (
    <section className="pagina-eventos-calendario" id="calendario-anchor">
      <div className="eventos-container-calendario">
        <div className="calendar-main-panel">
          <header className="calendar-header">
            <div className="calendar-nav-controls">
              <button className="nav-btn" onClick={() => changeMonth(-1)}><FaChevronLeft /></button>
              <h2 className="month-title">{monthNames[currentMonth]} <span>{currentYear}</span></h2>
              <button className="nav-btn" onClick={() => changeMonth(1)}><FaChevronRight /></button>
            </div>
            <button className="btn-today" onClick={goToToday}>
              <FaCalendarCheck /> Hoje
            </button>
          </header>

          <div className="filter-bar">
            <div className="filter-label"><FaFilter /> Filtrar:</div>
            <div className="filter-options">
               {CATEGORIES.map(cat => (
                 <button 
                    key={cat.id}
                    className={`filter-chip ${activeFilter === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveFilter(cat.id)}
                 >
                   <span className="chip-dot" style={{ backgroundColor: cat.color }}></span> 
                   {cat.label}
                 </button>
               ))}
            </div>
          </div>

          <div className="calendar-grid-wrapper">
            <div className="weekdays-row">
              {weekDays.map(d => <div key={d} className="weekday">{d}</div>)}
            </div>
            <div className="days-grid">{calendarCells}</div>
          </div>
        </div>

        <InformacoesCalendario
          selectedEvents={selectedDay ? (eventsByDay[selectedDay] || []) : []}
          selectedDay={selectedDay}
          monthName={monthNames[currentMonth]}
          openModal={(evt) => { setModalEvent(evt); setModalOpen(true); }}
        />
      </div>

      <ModalInformacoes
        modalOpen={modalOpen}
        modalEvent={modalEvent}
        closeModal={() => setModalOpen(false)}
      />
    </section>
  );
}