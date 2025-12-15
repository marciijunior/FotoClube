/* src/features/home/RecentActivities.jsx */
import React, { useMemo, useState, useEffect } from "react";
// 1. IMPORTAR useNavigate
import { useNavigate } from "react-router-dom"; 
import "./RecentActivities.css";
import {
  FaMapMarkerAlt,
  FaClock,
  FaBullhorn,
  FaImage,
  FaNewspaper,
  FaArrowRight,
} from "react-icons/fa";

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

let eventsData = findExport("eventsData", "eventsData") || [];
let announcementsData =
  findExport("announcementsData", "announcementsData") || [];
let postsData = findExport("postsData", "postsData") || [];
let galleryData = findExport("galleryData", "galleryData") || [];

/* ... (MANTENHA AS FUNÇÕES DE MAP (mapEvents, mapAnnouncements, etc.) IGUAIS) ... */
const mapEvents = (arr = []) =>
  arr.map((it) => ({
    id: `event-${it.id ?? it.title}`,
    type: "event",
    title: it.title,
    dateObj: it.dateObj ?? (it.date ? new Date(it.date) : new Date()),
    image: it.image ?? getRandomImage(),
    excerpt: it.description ?? "",
    meta: { location: it.location, time: it.time },
    original: it,
  }));

const mapAnnouncements = (arr = []) =>
  arr.map((it) => ({
    id: `announcement-${it.id ?? it.title}`,
    type: "announcement",
    title: it.title,
    dateObj: it.dateObj ?? (it.date ? new Date(it.date) : new Date()),
    image: it.image ?? getRandomImage(),
    excerpt: it.excerpt ?? it.summary ?? "",
    meta: {},
    original: it,
  }));

const mapPosts = (arr = []) =>
  arr.map((it) => ({
    id: `post-${it.id ?? it.slug ?? it.title}`,
    type: "post",
    title: it.title,
    dateObj: it.publishedAt
      ? new Date(it.publishedAt)
      : (it.dateObj ?? new Date()),
    image: it.coverImage ?? it.image ?? getRandomImage(),
    excerpt: it.excerpt ?? it.summary ?? "",
    meta: {},
    original: it,
  }));

const mapGallery = (arr = []) =>
  arr.map((it, idx) => ({
    id: `gallery-${it.id ?? idx}`,
    type: "gallery",
    title: it.title ?? it.filename ?? "Nova imagem",
    dateObj:
      it.dateObj ?? (it.uploadedAt ? new Date(it.uploadedAt) : new Date()),
    image: it.url ?? it.src ?? getRandomImage(),
    excerpt: it.caption ?? "",
    meta: {},
    original: it,
  }));

export default function RecentActivities({ limit = 2, onOpen }) {
  const [injected, setInjected] = useState([]);
  
  // 2. INICIALIZAR O HOOK
  const navigate = useNavigate();

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

    const hasSources =
      (eventsData && eventsData.length) ||
      (announcementsData && announcementsData.length) ||
      (postsData && postsData.length) ||
      (galleryData && galleryData.length);
    if (!hasSources) {
      const demo = {
        id: `demo-${Date.now()}`,
        type: "event",
        title: "Evento Demo: Saída Fotográfica",
        dateObj: new Date(),
        image: getRandomImage(),
        excerpt: "Evento demo adicionado automaticamente para visualização.",
        meta: { location: "Praça Central", time: "16:00" },
        original: { id: 999 }, // ID fictício para demo
      };
      setInjected((prev) => [demo, ...prev]);
    }

    return () => {
      if (window.simulateUpdate) delete window.simulateUpdate;
    };
  }, []);

  const unified = useMemo(() => {
    const list = [
      ...mapEvents(eventsData),
      ...mapAnnouncements(announcementsData),
      ...mapPosts(postsData),
      ...mapGallery(galleryData),
      ...injected,
    ];

    const byId = new Map();
    for (const item of list) {
      if (!item.dateObj || Number.isNaN(item.dateObj.getTime())) continue;
      if (!byId.has(item.id) || item.dateObj > byId.get(item.id).dateObj) {
        byId.set(item.id, item);
      }
    }
    const final = Array.from(byId.values()).sort(
      (a, b) => b.dateObj - a.dateObj
    );
    return final.slice(0, limit);
  }, [limit, injected]);

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
    if (type === "post") return <FaNewspaper />;
    if (type === "gallery") return <FaImage />;
    return <FaBullhorn />;
  };

  // 3. ALTERAR O HANDLE OPEN PARA REDIRECIONAR
  const handleOpen = (item) => {
    if (item.type === 'event') {
      const d = item.dateObj;
      // Pega o ID original do evento (crucial para o modal)
      const originalId = item.original?.id; 
      
      // Navega para o calendário com a data E o eventId
      navigate(`/eventos?ano=${d.getFullYear()}&mes=${d.getMonth()}&dia=${d.getDate()}&eventId=${originalId}`);
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
        <h3 id="recent-activities-title">Atualizações Recentes</h3>
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
                      : it.type === "post"
                      ? "Notícia"
                      : it.type === "gallery"
                      ? "Galeria"
                      : "Atualização"}
                  </span>

                  <span className="recent-meta-item">
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
                  Ver <FaArrowRight style={{ fontSize: '0.8em' }} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}