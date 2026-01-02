import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { FaNewspaper, FaClock, FaUser, FaFolder } from "react-icons/fa";
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
  const { data, loading } = useQuery(GET_ALL_POSTS, {
    fetchPolicy: "network-only",
  });

  const posts = data?.allPosts || [];
  const displayPosts = limit ? posts.slice(0, limit) : posts;

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

  if (displayPosts.length === 0) {
    return (
      <div className="feed-empty">
        <FaNewspaper size={48} />
        <p>Nenhuma postagem ainda</p>
        <span>As novidades do FotoClube aparecerão aqui</span>
      </div>
    );
  }

  return (
    <div className="feed-posts-container">
      <div className="feed-header">
        <h2>
          <FaNewspaper /> Feed do FotoClube
        </h2>
        <p>Fique por dentro das novidades e acontecimentos</p>
      </div>

      <div className="feed-posts-list">
        {displayPosts.map((post) => (
          <article key={post.id} className="feed-post-card">
            {post.image && (
              <div className="feed-post-image">
                <img src={post.image} alt={post.title} />
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
    </div>
  );
}
