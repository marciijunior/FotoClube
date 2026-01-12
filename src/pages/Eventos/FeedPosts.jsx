import React, { useState, useMemo } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import {
  FaNewspaper,
  FaClock,
  FaUser,
  FaFolder,
  FaFilter,
} from "react-icons/fa";
import "./FeedPosts.css";

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
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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
              {post.image && (
                <div className="feed-post-image">
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

              <div className="feed-post-content">
                <h3 className="feed-post-title">{post.title}</h3>

                <div className="feed-post-meta">
                  <span className="feed-meta-item">
                    <FaUser /> {post.author}
                  </span>
                  <span className="feed-meta-item">
                    <FaClock /> {formatDate(post.createdAt)}
                  </span>
                  {!post.image && (
                    <span className="feed-meta-item">
                      <FaFolder /> {post.category}
                    </span>
                  )}
                </div>

                <p className="feed-post-excerpt">{post.content}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
