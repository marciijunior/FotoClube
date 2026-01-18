import React from "react";
import { Link } from "react-router-dom";
import {
  FaImages,
  FaCalendarAlt,
  FaTrophy,
  FaUsers,
  FaNewspaper,
  FaChartLine,
} from "react-icons/fa";
import "./AdminInicio.css";

export default function AdminHome() {
  const quickActions = [
    {
      title: "Carrossel",
      description: "Gerencie slides da página inicial",
      link: "/admin/carousel",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: <FaImages />,
      count: "Slides",
    },
    {
      title: "Eventos",
      description: "Adicione e edite eventos do clube",
      link: "/admin/events",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      icon: <FaCalendarAlt />,
      count: "Calendário",
    },
    {
      title: "Foto do Mês",
      description: "Gerencie concurso e vencedores",
      link: "/admin/winners",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: <FaTrophy />,
      count: "Concurso",
    },
    {
      title: "Membros",
      description: "Administre membros do FotoClube",
      link: "/admin/members",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      icon: <FaUsers />,
      count: "Comunidade",
    },
    {
      title: "Posts",
      description: "Crie e edite notícias e artigos",
      link: "/admin/posts",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      icon: <FaNewspaper />,
      count: "Blog",
    },
  ];

  return (
    <div className="admin-home-wrapper">
      {/* Header Section */}
      <div className="admin-home-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="admin-title">Painel Administrativo</h1>
            <p className="admin-subtitle">
              Gerencie todo o conteúdo do site FotoClube em um só lugar
            </p>
          </div>
          <div className="header-stats">
            <div className="admin-stat-item">
              <FaChartLine className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">5</span>
                <span className="stat-label">Seções</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="admin-actions-container">
        <h2 className="section-title">Acesso Rápido</h2>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="action-card"
              style={{ "--card-gradient": action.gradient }}
            >
              <div className="card-gradient-bg"></div>
              <div className="card-content">
                <div className="card-icon">{action.icon}</div>
                <div className="card-info">
                  <h3 className="card-title">{action.title}</h3>
                  <p className="card-description">{action.description}</p>
                </div>
                <div className="card-badge">{action.count}</div>
                <div className="card-arrow">→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Tips Section */}
      <div className="admin-tips-section">
        <div className="tip-card">
          <div className="tip-icon">💡</div>
          <div className="tip-content">
            <h3 className="tip-title">Dica Rápida</h3>
            <p className="tip-text">
              Use as seções acima para gerenciar o conteúdo do site. Todas as
              alterações são salvas automaticamente no banco de dados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
