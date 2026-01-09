/* src/features/home/RecentActivities.jsx */
import React, { useMemo, useState, useEffect } from "react";
// 1. IMPORTAR useNavigate
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import "./RecentActivities.css";
import {
  FaMapMarkerAlt,
  FaClock,
  FaBullhorn,
  FaImage,
  FaNewspaper,
  FaArrowRight,
} from "react-icons/fa";

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

/* ... (MANTENHA TODO O CÓDIGO DE IMPORTS DE IMAGENS E DADOS IGUAL) ... */
const imageModules = import.meta.glob(
  "../../assets/images/*.{jpg,jpeg,png,webp}",
  { eager: true, as: "url" }
);
const imageUrls = Object.values(imageModules || {});
const getRandomImage = () =>
  imageUrls && imageUrls.length
    ? imageUrls[Math.floor(Math.random() * imageUrls.length)]
    : "/src/assets/images/event-placeholder-1.jpg";

const dataModules = import.meta.glob("../../data/*.{js,ts,json}", {
  eager: true,
  as: "default",
});

const findExport = (exportName, fileBase) => {
  for (const path in dataModules) {
    if (!Object.prototype.hasOwnProperty.call(dataModules, path)) continue;
    const mod = dataModules[path] ?? {};
    if (mod && mod[exportName]) return mod[exportName];
    if (mod && mod.default && mod.default[exportName])
      return mod.default[exportName];
    if (
      path.endsWith(`/${fileBase}.js`) ||
      path.endsWith(`/${fileBase}.ts`) ||
      path.endsWith(`/${fileBase}.json`)
    ) {
      const candidate = mod.default ?? mod;
      if (candidate && candidate[exportName]) return candidate[exportName];
    }
  }
  return [];
};

// REMOVIDO: Dados estáticos não devem ser usados - apenas dados do GraphQL
// let eventsData = findExport("eventsData", "eventsData") || [];
// let announcementsData = findExport("announcementsData", "announcementsData") || [];
// let postsData = findExport("postsData", "postsData") || [];
// let galleryData = findExport("galleryData", "galleryData") || [];

/* ... (MANTENHA AS FUNÇÕES DE MAP (mapEvents, mapAnnouncements, etc.) IGUAIS) ... */
const mapEvents = (arr = []) =>
  arr.map((it) => {
    let imageUrl = getRandomImage();
    if (it.image) {
      // Se já tem o caminho completo, usa direto; senão, adiciona o prefixo
      imageUrl = it.image.startsWith("http")
        ? it.image
        : `${import.meta.env.VITE_UPLOADS_URL}/${it.image}`;
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

const mapAnnouncements = (arr = []) =>
  arr.map((it) => ({
    id: `announcement-${it.id ?? it.title}`,
    type: "announcement",
    title: it.title,
    dateObj: it.createdAt
      ? new Date(it.createdAt)
      : (it.dateObj ?? (it.date ? new Date(it.date) : new Date())),
    image: it.image ?? getRandomImage(),
    excerpt: it.excerpt ?? it.summary ?? "",
    meta: {},
    original: it,
  }));

const mapPosts = (arr = []) =>
  arr.map((it) => ({
    id: `post-${it.id}`,
    type: "post",
    title: it.title,
    dateObj: it.createdAt ? new Date(Number(it.createdAt)) : new Date(),
    image: it.image ?? getRandomImage(),
    excerpt:
      it.content.substring(0, 120) + (it.content.length > 120 ? "..." : ""),
    meta: { author: it.author, category: it.category },
    original: it,
  }));

const mapGallery = (arr = []) =>
  arr.map((it) => ({
    id: `gallery-${it.id ?? Math.random()}`,
    type: "gallery",
    title: it.title ?? it.filename ?? "Nova imagem",
    dateObj: it.createdAt
      ? new Date(Number(it.createdAt))
      : (it.dateObj ?? (it.uploadedAt ? new Date(it.uploadedAt) : new Date())),
    image: it.url ?? it.src ?? getRandomImage(),
    excerpt: it.caption ?? "",
    meta: {},
    original: it,
  }));

const mapWinners = (arr = []) =>
  arr.map((it) => {
    let imageUrl = getRandomImage();
    if (it.image) {
      // Se já tem o caminho completo, usa direto; senão, adiciona o prefixo
      imageUrl = it.image.startsWith("http")
        ? it.image
        : `${import.meta.env.VITE_UPLOADS_URL}/${it.image}`;
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

function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

export default function RecentActivities({
  limit = 8,
  onOpen,
  showTitle = true,
}) {
  const isMobile = useIsMobile(600);

  const { data: eventsDataQL, refetch: refetchEvents } = useQuery(
    GET_ALL_EVENTS,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-and-network",
    }
  );

  const { data: winnersDataQL, refetch: refetchWinners } = useQuery(
    GET_ALL_WINNERS,
    {
      fetchPolicy: "network-only", // Forçar buscar do servidor sem cache
      nextFetchPolicy: "network-only",
    }
  );

  const { data: postsDataQL, refetch: refetchPosts } = useQuery(GET_ALL_POSTS, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
  });

  const [injected, setInjected] = useState([]);

  // 2. INICIALIZAR O HOOK
  const navigate = useNavigate();

  // Usar dados do GraphQL
  const eventsData = eventsDataQL?.allEvents || [];
  const winnersData = winnersDataQL?.allWinners || [];
  const postsData = postsDataQL?.allPosts || [];

  // Debug: Log dos dados recebidos
  console.log("📊 Dados GraphQL:", {
    events: eventsData.length,
    winners: winnersData.length,
    posts: postsData.length,
  });

  // Refetch automaticamente a cada 10 segundos para pegar atualizações
  useEffect(() => {
    const interval = setInterval(() => {
      refetchEvents();
      refetchWinners();
      refetchPosts();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetchEvents, refetchWinners, refetchPosts]);

  useEffect(() => {
    // ... (MANTENHA A LÓGICA DE SIMULAÇÃO IGUAL) ...
    window.simulateUpdate = (opts = {}) => {
      const now = new Date();
      const mock = {
        id: `debug-${Date.now()}`,
        type: opts.type || "announcement",
        title: opts.title || "Atualização de teste",
        dateObj: opts.dateObj ? new Date(opts.dateObj) : now,
        image: opts.image ?? getRandomImage(),
        excerpt: opts.excerpt ?? "Descrição de teste gerada para simulação.",
        meta: opts.meta ?? {},
        original: opts.original ?? {},
      };
      setInjected((prev) => [mock, ...prev]);
      return mock;
    };

    // Removido: verificação de dados estáticos não é mais necessária
    // const hasSources = (eventsData && eventsData.length) || ...
    // Dados virão sempre do GraphQL

    return () => {
      if (window.simulateUpdate) delete window.simulateUpdate;
    };
  }, []);

  const unified = useMemo(() => {
    const list = [
      ...mapEvents(eventsData),
      ...mapWinners(winnersData),
      ...mapPosts(postsData),
      ...injected,
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
      (a, b) => b.dateObj - a.dateObj
    );

    return final.slice(0, isMobile ? 4 : limit);
  }, [limit, injected, eventsData, winnersData, postsData, isMobile]);

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
        `/eventos?ano=${d.getFullYear()}&mes=${d.getMonth()}&dia=${d.getDate()}&eventId=${originalId}`
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
                  Ver <FaArrowRight style={{ fontSize: "0.8em" }} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
