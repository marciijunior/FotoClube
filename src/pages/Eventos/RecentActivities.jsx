/* eslint-disable import/no-unresolved */
import React, { useMemo, useState, useEffect } from "react";
import "./RecentActivities.css";
import {
  FaMapMarkerAlt,
  FaClock,
  FaBullhorn,
  FaImage,
  FaNewspaper,
} from "react-icons/fa";

/* carrega todas as imagens de assets para usar como fallback/aleatórias */
const imageModules = import.meta.glob(
  "../../assets/images/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    as: "url",
  }
);
const imageUrls = Object.values(imageModules || {});
const getRandomImage = () =>
  imageUrls && imageUrls.length
    ? imageUrls[Math.floor(Math.random() * imageUrls.length)]
    : "/src/assets/images/event-placeholder-1.jpg";

/* --- carregar dados de src/data sem usar require direto (compatível Vite/ESM) --- */
const dataModules = import.meta.glob("../../data/*.{js,ts,json}", {
  eager: true,
  as: "default",
});

const findExport = (exportName, fileBase) => {
  // 1) se houver módulo com nome de arquivo correspondente, tenta extrair export
  for (const path in dataModules) {
    if (!Object.prototype.hasOwnProperty.call(dataModules, path)) continue;
    const mod = dataModules[path] ?? {};
    // se módulo tiver export direto
    if (mod && mod[exportName]) return mod[exportName];
    // se for default export container
    if (mod && mod.default && mod.default[exportName])
      return mod.default[exportName];
    // tentar casar por nome de arquivo (eventsData.js etc.)
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

export default function RecentActivities({ limit = 8, onOpen }) {
  // state para atualizações simuladas (injetadas em runtime)
  const [injected, setInjected] = useState([]);

  // expõe função global para facilitar teste/simulação no console do navegador
  useEffect(() => {
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

    // INJETAR DEMO AUTOMÁTICO SE NÃO HOUVER FONTES REAIS
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
        original: {},
      };
      setInjected((prev) => [demo, ...prev]);
    }

    return () => {
      // cleanup
      if (window.simulateUpdate) delete window.simulateUpdate;
    };
  }, []);

  const unified = useMemo(() => {
    const list = [
      ...mapEvents(eventsData),
      ...mapAnnouncements(announcementsData),
      ...mapPosts(postsData),
      ...mapGallery(galleryData),
      ...injected, // injeta as atualizações simuladas
    ];

    // remove duplicados por id e filtra itens sem data
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

  const handleOpen = (item) => {
    if (onOpen) onOpen(item.original ?? item);
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
            <article key={it.id} className="recent-card">
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

                <div className="recent-actions">
                  <button
                    className="recent-btn"
                    onClick={() => handleOpen(it)}
                    aria-label={`Abrir ${it.title}`}
                  >
                    Ver
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// exemplo de simulação rápida via console (usa imagens do assets)
window.simulateUpdate &&
  window.simulateUpdate({
    type: "event",
    title: "Saída Fotográfica — Demo",
    dateObj: new Date(),
    image: getRandomImage(),
    excerpt:
      "Saída prática de testes — encontro às 08:30 na entrada principal.",
    meta: { location: "Praça Central", time: "08:30" },
  });
