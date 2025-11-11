import React from "react";
import "./PageEventos.css";
import Calendario from "./Calendario.jsx";
import HistorySection from "./HistorySection.jsx";

export default function PageEventos() {
  console.log("PageEventos montado");
  return (
    <main className="page-eventos">
      <div className="page-eventos-container">
        <Calendario />
      </div>

      {/* DEBUG: caixa simples */}
      <div style={{ padding: 20, border: "2px dashed red", margin: "18px" }}>
        DEBUG — abaixo do calendário
      </div>

      <HistorySection />
    </main>
  );
}
