import React from "react";
import "./PageEventos.css";
import Calendario from "./Calendario.jsx";

/*
  PageEventos atua como "main" da área de Eventos.
  Ele agrega o Calendário (que por sua vez importa InformacoesCalendario e ModalInformacoes)
  e fornece um wrapper consistente para a rota / página de eventos.
*/
export default function PageEventos() {
  return (
    <main className="page-eventos">
      <div className="page-eventos-container">
        <Calendario />
      </div>
    </main>
  );
}
