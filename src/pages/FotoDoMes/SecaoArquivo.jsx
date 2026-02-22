// src/pages/PhotoOfTheMonthPage/ArchiveSection.jsx
import React, { useState, useMemo, useEffect } from "react";
import { FaTimes, FaFilter } from "react-icons/fa";
import "./SecaoArquivo.css";

function ArchiveSection({ pastWinners, placeholderImage }) {
  const [selectedWinnerId, setSelectedWinnerId] = useState(
    pastWinners[0]?.id || null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [timerProgress, setTimerProgress] = useState(0);

  const normalizeImage = (img) => {
    if (!img) return null;
    if (
      img.startsWith("http://localhost") ||
      img.startsWith("https://localhost")
    ) {
      const filename = img.split("/").pop();
      return `${import.meta.env.VITE_UPLOADS_URL}/${filename}`;
    }
    if (img.startsWith("http")) return img;
    return `${import.meta.env.VITE_UPLOADS_URL}/${img}`;
  };

  // Extrai meses e anos únicos dos vencedores
  const availableMonths = useMemo(() => {
    const months = new Set();
    pastWinners.forEach((winner) => {
      const parts = winner.monthWon?.split(" ");
      if (parts && parts.length === 2) {
        months.add(parts[0]);
      }
    });
    return Array.from(months);
  }, [pastWinners]);

  const availableYears = useMemo(() => {
    const years = new Set();
    pastWinners.forEach((winner) => {
      const parts = winner.monthWon?.split(" ");
      if (parts && parts.length === 2) {
        years.add(parts[1]);
      }
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [pastWinners]);

  // Filtra vencedores por mês e ano selecionados
  const filteredWinners = useMemo(() => {
    return pastWinners.filter((winner) => {
      const parts = winner.monthWon?.split(" ");
      if (!parts || parts.length !== 2) return true;

      const [month, year] = parts;
      const monthMatch = !selectedMonth || month === selectedMonth;
      const yearMatch = !selectedYear || year === selectedYear;

      return monthMatch && yearMatch;
    });
  }, [pastWinners, selectedMonth, selectedYear]);

  const selectedWinner = useMemo(() => {
    return filteredWinners.find((w) => w.id === selectedWinnerId);
  }, [selectedWinnerId, filteredWinners]);

  // Garante que, ao filtrar, sempre haja um vencedor selecionado visível
  useEffect(() => {
    if (!filteredWinners.length) return;
    const exists = filteredWinners.some((w) => w.id === selectedWinnerId);
    if (!exists) {
      setSelectedWinnerId(filteredWinners[0].id);
    }
  }, [filteredWinners, selectedWinnerId]);

  // Animação do progresso do timer
  useEffect(() => {
    if (filteredWinners.length <= 1 || isModalOpen) return;

    setTimerProgress(0);
    const progressInterval = setInterval(() => {
      setTimerProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1.25; // Incrementa 1.25% a cada 100ms = 8 segundos total
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [selectedWinnerId, filteredWinners, isModalOpen]);

  // Alternância aleatória automática entre vencedores
  useEffect(() => {
    if (filteredWinners.length <= 1 || isModalOpen) return;

    const interval = setInterval(() => {
      const currentIndex = filteredWinners.findIndex(
        (w) => w.id === selectedWinnerId,
      );
      let nextIndex;

      // Garante que o próximo seja diferente do atual
      do {
        nextIndex = Math.floor(Math.random() * filteredWinners.length);
      } while (nextIndex === currentIndex && filteredWinners.length > 1);

      setSelectedWinnerId(filteredWinners[nextIndex].id);
    }, 8000); // Muda a cada 8 segundos

    return () => clearInterval(interval);
  }, [filteredWinners, selectedWinnerId, isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className="potm-archive-menu-section">
        {/* Título Claro */}
        <h2 className="section-title-light">Arquivo de Vencedores</h2>
        <div className="archive-menu-container">
          <div className="archive-menu-list">
            <div className="archive-filters">
              <div className="archive-filter-icon">
                <FaFilter />
              </div>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="archive-filter-select"
              >
                <option value="">Todos os Meses</option>
                {availableMonths.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="archive-filter-select"
              >
                <option value="">Todos os Anos</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {filteredWinners.length > 1 && (
              <div className="archive-timer-container">
                <div
                  className="archive-timer-bar"
                  style={{ width: `${timerProgress}%` }}
                />
              </div>
            )}

            <div className="archive-menu-list-scroll">
              {filteredWinners.map((winner) => (
                <button
                  key={winner.id}
                  className={`archive-menu-button ${winner.id === selectedWinnerId ? "active" : ""}`}
                  onClick={() => setSelectedWinnerId(winner.id)}
                >
                  <span className="archive-menu-month">{winner.monthWon}</span>
                  <span className="archive-menu-photographer">
                    {winner.photographer}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="archive-menu-display">
            {selectedWinner ? (
              <>
                <div
                  className="archive-menu-display-image-wrapper"
                  onClick={openModal}
                >
                  <img
                    src={
                      normalizeImage(selectedWinner.image) ?? placeholderImage
                    }
                    alt={selectedWinner.title}
                    className="archive-menu-display-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = placeholderImage;
                    }}
                  />
                </div>
                <div className="archive-menu-display-info">
                  <h3>{selectedWinner.title}</h3>
                  <p className="archive-menu-display-author">
                    {selectedWinner.photographer}
                  </p>
                  <p className="archive-menu-display-notes">
                    <strong>Nota dos Jurados:</strong> "
                    {selectedWinner.judgesNotes}"
                  </p>
                </div>
              </>
            ) : (
              <p>Nenhum vencedor selecionado.</p>
            )}
          </div>
        </div>
      </section>

      {isModalOpen && selectedWinner && (
        <div className="archive-modal-backdrop" onClick={closeModal}>
          <div
            className="archive-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="archive-modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            <img
              src={normalizeImage(selectedWinner.image) ?? placeholderImage}
              alt={selectedWinner.title}
              className="archive-modal-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderImage;
              }}
            />
            <div className="archive-modal-info">
              <span className="archive-modal-month">
                {selectedWinner.monthWon}
              </span>
              <h3 className="archive-modal-title">{selectedWinner.title}</h3>
              <p className="archive-modal-author">
                {selectedWinner.photographer}
              </p>
              <p className="archive-modal-notes">
                <strong>Nota dos Jurados:</strong> "{selectedWinner.judgesNotes}
                "
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ArchiveSection;
