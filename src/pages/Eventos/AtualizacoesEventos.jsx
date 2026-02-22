/* src/pages/Eventos/EventUpdates.jsx */
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import "./AtualizacoesEventos.css";
import {
  FaMapMarkerAlt,
  FaClock,
  FaBullhorn,
  FaImage,
  FaNewspaper,
  FaArrowRight,
} from "react-icons/fa";
import { normalizeImage } from "../../lib/imageUtils";

const GET_ALL_EVENTS = gql`
  query GetAllEvents {
    allEvents {
      id
      title
      date
      time
      description
      location
      image
      category
      createdAt
    }
  }
`;

const GET_ALL_WINNERS = gql`
  query GetAllWinners {
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
      createdAt
    }
  }
`;

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    allPosts {
      id
      title
      content
      image
      author
      category
      createdAt
    }
  }
`;

// REMOVIDO: Dados estáticos não devem ser usados - apenas dados do GraphQL

const getRandomImage = () => "/logo-fotoclube-azul.png";

const mapEvents = (arr = []) =>
  arr.map((it) => {
    let imageUrl = getRandomImage();
    if (it.image) {
      imageUrl = normalizeImage(it.image) || imageUrl;
    }
    return {
      id: `event-${it.id ?? it.title}`,
      type: "event",
      title: it.title,
      dateObj: it.createdAt ? new Date(Number(it.createdAt)) : new Date(),
      image: imageUrl,
      excerpt: it.description ?? "",
      meta: { location: it.location, time: it.time },
      original: it,
    };
  });

const mapPosts = (arr = []) =>
  arr.map((it) => ({
    id: `post-${it.id}`,
    type: "post",
    title: it.title,
    dateObj: it.createdAt ? new Date(Number(it.createdAt)) : new Date(),
    image: normalizeImage(it.image) ?? getRandomImage(),
    excerpt:
      it.content.substring(0, 120) + (it.content.length > 120 ? "..." : ""),
    meta: { author: it.author, category: it.category },
    original: it,
  }));

const mapWinners = (arr = []) =>
  arr.map((it) => {
    let imageUrl = getRandomImage();
    if (it.image) {
      imageUrl = normalizeImage(it.image) || imageUrl;
    }
    return {
      id: `winner-${it.id}`,
      type: "contest",
      title: it.isCurrent
        ? `🏆 Foto do Mês: ${it.title}`
        : `Vencedor: ${it.title}`,
      dateObj: it.createdAt ? new Date(Number(it.createdAt)) : new Date(),
      image: imageUrl,
      excerpt: `Por ${it.author}${it.monthWon ? ` - ${it.monthWon}` : ""}`,
      meta: { author: it.author, monthWon: it.monthWon },
      original: it,
    };
  });

function useIsMobileLocal(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

export default function AtualizacoesEventos({
  limit = 8,
  onOpen,
  showTitle = true,
}) {
  const isMobile = useIsMobileLocal(600);

  const { data: eventsDataQL, refetch: refetchEvents } = useQuery(
    GET_ALL_EVENTS,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-and-network",
    },
  );

  const { data: winnersDataQL, refetch: refetchWinners } = useQuery(
    GET_ALL_WINNERS,
    {
      fetchPolicy: "network-only", // Forçar buscar do servidor sem cache
      nextFetchPolicy: "network-only",
    },
  );

  const { data: postsDataQL, refetch: refetchPosts } = useQuery(GET_ALL_POSTS, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
  });

  // 2. INICIALIZAR O HOOK
  const navigate = useNavigate();

  // Usar dados do GraphQL

  // Refetch automaticamente a cada 60 segundos para pegar atualizações
  useEffect(() => {
    const interval = setInterval(() => {
      refetchEvents();
      refetchWinners();
      refetchPosts();
    }, 60000);

    return () => clearInterval(interval);
  }, [refetchEvents, refetchWinners, refetchPosts]);

  const unified = useMemo(() => {
    const eventsData = eventsDataQL?.allEvents || [];
    const winnersData = winnersDataQL?.allWinners || [];
    const postsData = postsDataQL?.allPosts || [];

    const list = [
      ...mapEvents(eventsData),
      ...mapWinners(winnersData),
      ...mapPosts(postsData),
    ];

    const byId = new Map();
    for (const item of list) {
      if (!item.dateObj || Number.isNaN(item.dateObj.getTime())) {
        continue;
      }
      if (!byId.has(item.id) || item.dateObj > byId.get(item.id).dateObj) {
        byId.set(item.id, item);
      }
    }
    const final = Array.from(byId.values()).sort(
      (a, b) => b.dateObj - a.dateObj,
    );

    return final.slice(0, isMobile ? 4 : limit);
  }, [limit, eventsDataQL, winnersDataQL, postsDataQL, isMobile]);

  if (!unified || unified.length === 0) {
    return (
      <section className="recent-activities">
        <div className="recent-inner">
          <h3>Atualizações</h3>
          <div className="recent-empty">Nenhuma atualização encontrada.</div>
        </div>
      </section>
    );
  }

  const iconFor = (type) => {
    if (type === "event") return <FaBullhorn />;
    if (type === "contest") return <FaImage />;
    if (type === "post") return <FaNewspaper />;
    if (type === "gallery") return <FaImage />;
    return <FaBullhorn />;
  };

  // 3. ALTERAR O HANDLE OPEN PARA REDIRECIONAR
  const handleOpen = (item) => {
    if (item.type === "event") {
      const d = item.dateObj;
      // Pega o ID original do evento (crucial para o modal)
      const originalId = item.original?.id;

      // Navega para o calendário com a data E o eventId
      navigate(
        `/eventos?ano=${d.getFullYear()}&mes=${d.getMonth()}&dia=${d.getDate()}&eventId=${originalId}`,
      );
    } else if (item.type === "contest") {
      // Redireciona para a página de foto do mês
      navigate("/foto-do-mes");
    } else {
      // Para outros tipos (notícias, galeria), mantém o comportamento padrão ou abre em outra rota
      if (onOpen) onOpen(item.original ?? item);
    }
  };

  return (
    <section
      className="recent-activities"
      aria-labelledby="recent-activities-title"
    >
      <div className="recent-inner">
        {showTitle && (
          <h3 id="recent-activities-title">Atualizações Recentes</h3>
        )}
        <div className="recent-grid">
          {unified.map((it) => (
            <article
              key={it.id}
              className="recent-card"
              onClick={() => handleOpen(it)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpen(it);
                }
              }}
              tabIndex="0"
              role="button"
            >
              {/* ... (O RESTANTE DO JSX PERMANECE IGUAL) ... */}
              <div className="recent-thumb-wrap">
                {it.image ? (
                  <img
                    src={it.image}
                    alt={it.title}
                    className="recent-thumb"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="recent-thumb recent-thumb--placeholder" />
                )}
              </div>

              <div className="recent-body">
                <h4 className="recent-title" title={it.title}>
                  {it.title}
                </h4>

                <div className="recent-meta">
                  <span className="recent-meta-item" title={it.type}>
                    {iconFor(it.type)}{" "}
                    {it.type === "event"
                      ? "Evento"
                      : it.type === "contest"
                        ? "Concurso"
                        : it.type === "post"
                          ? "Notícia"
                          : it.type === "gallery"
                            ? "Galeria"
                            : "Atualização"}
                  </span>

                  <span className="recent-meta-item">
                    <FaClock />
                    {it.dateObj.toLocaleDateString("pt-BR")}{" "}
                    {it.meta && it.meta.time ? `· ${it.meta.time}` : ""}
                  </span>

                  {it.meta && it.meta.location && (
                    <span className="recent-meta-item">
                      <FaMapMarkerAlt /> {it.meta.location}
                    </span>
                  )}
                </div>
              </div>

              <div className="recent-actions">
                <button
                  className="recent-btn"
                  aria-label={`Abrir ${it.title}`}
                  tabIndex="-1"
                >
                  Saiba Mais <FaArrowRight style={{ fontSize: "0.8em" }} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
