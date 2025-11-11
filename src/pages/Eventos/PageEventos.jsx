import React from "react";
import "./PageEventos.css";
import Calendario from "./Calendario.jsx";
import RecentActivities from "./RecentActivities.jsx";

export default function PageEventos() {
  return (
    <main className="page-eventos">
      <div className="page-eventos-container">
        <Calendario />
      </div>

      {/* Sessão centralizada de atualizações do site */}
      <RecentActivities />
    </main>
  );
}
