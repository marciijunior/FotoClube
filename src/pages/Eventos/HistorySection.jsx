import React from "react";
import "./HistorySection.css";

export default function HistorySection() {
  console.log("HistorySection montado");
  return (
    <section className="events-history" aria-labelledby="history-title">
      <div className="history-inner">
        <div className="history-content">
          <h3 id="history-title">Nossa História</h3>
          <p className="history-lead">
            O FotoClube nasceu da paixão pela imagem e pelo encontro entre
            pessoas que buscam aprender e compartilhar técnicas, críticas e
            projetos fotográficos. Desde então promovemos saídas fotográficas,
            oficinas e palestras abertas à comunidade.
          </p>
          <ul className="history-list">
            <li>
              <strong>Fundação:</strong> Reuniões mensais desde 2016.
            </li>
            <li>
              <strong>Atividades:</strong> Saídas, oficinas, exposições e
              concursos.
            </li>
            <li>
              <strong>Missão:</strong> Aproximar pessoas pela fotografia.
            </li>
          </ul>
          <div className="history-cta">
            <button className="history-btn" type="button">
              Saiba mais
            </button>
          </div>
        </div>

        <div
          className="history-media"
          role="img"
          aria-label="Imagem do estúdio"
        >
          {/* substitua o background via CSS ou coloque uma <img> aqui se preferir */}
        </div>
      </div>
    </section>
  );
}
