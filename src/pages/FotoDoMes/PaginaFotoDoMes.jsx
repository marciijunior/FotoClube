// src/pages/FotoDoMes/PaginaFotoDoMes.jsx
import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Loader } from "@mantine/core";
import "./PaginaFotoDoMes.css";
import SecaoHero from "./SecaoHero";
import SecaoFilmstrip from "./SecaoFilmstrip";
import SecaoArquivo from "./SecaoArquivo";
import SecaoRegras from "./SecaoRegras";

const GET_WINNERS = gql`
  query GetWinners {
    allWinners {
      id
      title
      author
      image
      monthWon
      judgesNotes
      isWinner
      position
      isCurrent
    }
  }
`;

function PaginaFotoDoMes() {
  const { data, loading, error } = useQuery(GET_WINNERS);
  const placeholderImage = "/src/assets/images/placeholder-winner.png";

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Loader size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Erro ao carregar vencedores: {error.message}</p>
      </div>
    );
  }

  const winners = data?.allWinners || [];

  // Verificar se existe algum concurso marcado como atual
  const hasCurrentContest = winners.some((w) => w.isCurrent);

  // Filtrar apenas os vencedores do concurso atual
  const currentContestWinners = winners.filter((w) => w.isCurrent);

  // Se houver concurso atual, mostrar apenas ele. Senão, pegar o mais recente
  let displayWinners;
  if (currentContestWinners.length > 0) {
    displayWinners = currentContestWinners;
  } else {
    // Pegar o concurso mais recente (por createdAt ou primeiro na lista)
    const latestMonth = winners.length > 0 ? winners[0].monthWon : null;
    displayWinners = latestMonth
      ? winners.filter((w) => w.monthWon === latestMonth)
      : [];
  }

  // Ordenar por posição
  const sortedWinners = [...displayWinners].sort(
    (a, b) => a.position - b.position,
  );

  // Vencedor principal (SEMPRE position 1)
  const mainWinner = sortedWinners.find((w) => w.position === 1) ||
    sortedWinners[0] || {
      title: "Em breve",
      author: "Aguardando",
      image: placeholderImage,
      monthWon: "Próximo concurso",
    };

  // Finalistas (positions 2-9)
  const runnersUp = sortedWinners.filter((w) => w.position !== 1).slice(0, 8);

  // Arquivo: Agrupar vencedores por mês e pegar apenas 1º lugar de cada mês
  const monthsMap = new Map();
  winners.forEach((w) => {
    // Só adicionar se for position === 1 (primeiro lugar)
    if (w.position === 1) {
      // Só adicionar se NÃO for do concurso atual
      const isFromCurrentContest = hasCurrentContest
        ? w.isCurrent
        : w.monthWon === mainWinner.monthWon;
      if (!isFromCurrentContest) {
        if (!monthsMap.has(w.monthWon)) {
          monthsMap.set(w.monthWon, w);
        }
      }
    }
  });

  // Função para converter "Mês Ano" em data para ordenação
  const parseMonthYear = (monthYearStr) => {
    const months = {
      Janeiro: 0,
      Fevereiro: 1,
      Março: 2,
      Abril: 3,
      Maio: 4,
      Junho: 5,
      Julho: 6,
      Agosto: 7,
      Setembro: 8,
      Outubro: 9,
      Novembro: 10,
      Dezembro: 11,
    };

    const parts = monthYearStr.split(" ");
    if (parts.length === 2) {
      const month = months[parts[0]] ?? 0;
      const year = parseInt(parts[1]) || 2024;
      return new Date(year, month, 1);
    }
    return new Date(2024, 0, 1); // fallback
  };

  const pastWinners = Array.from(monthsMap.values())
    .map((w) => ({
      ...w,
      photographer: w.author,
    }))
    .sort((a, b) => {
      // Ordenar do mais recente para o mais antigo
      return parseMonthYear(b.monthWon) - parseMonthYear(a.monthWon);
    });

  return (
    <div className="potm-container">
      <SecaoHero winner={mainWinner} placeholderImage={placeholderImage} />

      <SecaoFilmstrip
        runnersUp={runnersUp}
        placeholderImage={placeholderImage}
      />

      <div className="section-spacer"></div>

      <SecaoArquivo
        pastWinners={pastWinners}
        placeholderImage={placeholderImage}
      />

      <div className="section-spacer"></div>

      <SecaoRegras />
    </div>
  );
}

export default PaginaFotoDoMes;
