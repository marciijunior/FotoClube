import React, { useState, useMemo } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import {
  FaNewspaper,
  FaFilter,
  FaRegHeart,
  FaRegComment,
  FaRegPaperPlane,
  FaRegBookmark,
  FaEllipsisH,
} from "react-icons/fa";
import "./FeedPosts.css";
import logoFotoClube from "../../assets/logo_vertical_azul.png";

const INSTAGRAM_URL =
  "https://www.instagram.com/fotoclubearacatuba?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

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

export default function FeedPosts({ limit = 10 }) {
  const [selectedYear, setSelectedYear] = useState("todos");
  const [selectedMonth, setSelectedMonth] = useState("todos");

  const openInstagram = () => {
    window.open(INSTAGRAM_URL, "_blank");
  };

  const { data, loading } = useQuery(GET_ALL_POSTS, {
    fetchPolicy: "network-only",
  });

  const posts = data?.allPosts || [];

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

  // Extrair anos disponíveis dos posts
  const availableYears = useMemo(() => {
    const years = new Set();
    posts.forEach((post) => {
      if (post.createdAt) {
        const date = new Date(Number(post.createdAt));
        years.add(date.getFullYear());
      }
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [posts]);

  // Filtrar posts por ano e mês
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (selectedYear !== "todos") {
      filtered = filtered.filter((post) => {
        if (!post.createdAt) return false;
        const date = new Date(Number(post.createdAt));
        return date.getFullYear() === parseInt(selectedYear);
      });
    }

    if (selectedMonth !== "todos") {
      filtered = filtered.filter((post) => {
        if (!post.createdAt) return false;
        const date = new Date(Number(post.createdAt));
        return date.getMonth() === parseInt(selectedMonth);
      });
    }

    return filtered;
  }, [posts, selectedYear, selectedMonth]);

  const displayPosts = limit ? filteredPosts.slice(0, limit) : filteredPosts;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(Number(dateStr));
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Ontem";
    if (diffDays < 7) return `${diffDays} dias atrás`;

    return date
      .toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .toUpperCase();
  };

  const getCategoryColor = (category) => {
    const colors = {
      Notícia: "#2196F3",
      Evento: "#4CAF50",
      Destaque: "#FF9800",
      Comunicado: "#9C27B0",
      Tutorial: "#00BCD4",
    };
    return colors[category] || "#757575";
  };

  if (loading) {
    return (
      <div className="feed-loading">
        <div className="feed-skeleton"></div>
        <div className="feed-skeleton"></div>
        <div className="feed-skeleton"></div>
      </div>
    );
  }

  return (
    <div className="feed-posts-container">
      <div className="feed-filters">
        <div className="filter-icon">
          <FaFilter />
        </div>
        <select
          className="feed-filter-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="todos">Todos os Anos</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          className="feed-filter-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="todos">Todos os Meses</option>
          <option value="0">Janeiro</option>
          <option value="1">Fevereiro</option>
          <option value="2">Março</option>
          <option value="3">Abril</option>
          <option value="4">Maio</option>
          <option value="5">Junho</option>
          <option value="6">Julho</option>
          <option value="7">Agosto</option>
          <option value="8">Setembro</option>
          <option value="9">Outubro</option>
          <option value="10">Novembro</option>
          <option value="11">Dezembro</option>
        </select>
      </div>

      {displayPosts.length === 0 ? (
        <div className="feed-empty">
          <FaNewspaper size={48} />
          <p>Nenhuma postagem neste período</p>
          <span>Selecione outro ano ou mês para ver mais postagens</span>
        </div>
      ) : (
        <div className="feed-posts-list">
          {displayPosts.map((post) => (
            <article key={post.id} className="feed-post-card">
              {/* Header do post */}
              <div className="feed-post-header">
                <div className="feed-post-author-info">
                  <div className="feed-author-avatar">
                    <img
                      src={logoFotoClube}
                      alt="FotoClube"
                      className="feed-author-avatar-img"
                    />
                  </div>
                  <div className="feed-author-details">
                    <span className="feed-author-name">
                      {post.author || "FotoClube"}
                    </span>
                    <span className="feed-post-location">{post.category}</span>
                  </div>
                </div>
                <button className="feed-post-options">
                  <FaEllipsisH />
                </button>
              </div>

              {/* Imagem */}
              {post.image && (
                <div className="feed-post-image" onDoubleClick={openInstagram}>
                  <img
                    src={normalizeImage(post.image) || ""}
                    alt={post.title}
                  />
                  <div
                    className="feed-post-category-badge"
                    style={{ backgroundColor: getCategoryColor(post.category) }}
                  >
                    {post.category}
                  </div>
                </div>
              )}

              {/* Ações */}
              <div className="feed-post-actions">
                <div className="feed-actions-left">
                  <button
                    className="feed-action-btn"
                    onClick={openInstagram}
                    title="Curtir no Instagram"
                  >
                    <FaRegHeart />
                  </button>
                  <button
                    className="feed-action-btn"
                    onClick={openInstagram}
                    title="Comentar no Instagram"
                  >
                    <FaRegComment />
                  </button>
                  <button
                    className="feed-action-btn"
                    onClick={openInstagram}
                    title="Compartilhar no Instagram"
                  >
                    <FaRegPaperPlane />
                  </button>
                </div>
                <button
                  className="feed-bookmark-btn"
                  onClick={openInstagram}
                  title="Salvar no Instagram"
                >
                  <FaRegBookmark />
                </button>
              </div>

              {/* Likes */}
              <div
                className="feed-likes-count"
                onClick={openInstagram}
                style={{ cursor: "pointer" }}
              >
                Seja o primeiro a curtir
              </div>

              {/* Conteúdo */}
              <div className="feed-post-content">
                <p className="feed-post-title">
                  <strong>{post.author || "FotoClube"}</strong>
                  {post.title}
                </p>
                {post.content && (
                  <p className="feed-post-excerpt">{post.content}</p>
                )}
              </div>

              {/* Data */}
              <div className="feed-post-date">{formatDate(post.createdAt)}</div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
