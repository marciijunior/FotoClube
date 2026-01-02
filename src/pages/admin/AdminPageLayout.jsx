// src/pages/admin/AdminPageLayout.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./AdminPageLayout.css";

export default function AdminPageLayout({
  title,
  subtitle,
  icon,
  gradient,
  actionButton,
  children,
  backLink = "/admin",
}) {
  return (
    <div className="admin-page-wrapper">
      {/* Header with back button */}
      <div className="admin-page-header">
        <Link to={backLink} className="admin-back-button">
          <FaArrowLeft /> Voltar
        </Link>
      </div>

      {/* Title Section */}
      <div
        className="admin-page-title-section"
        style={{ "--title-gradient": gradient }}
      >
        <div className="title-content">
          <div className="title-icon">{icon}</div>
          <div className="title-text">
            <h1 className="admin-page-title">{title}</h1>
            {subtitle && <p className="admin-page-subtitle">{subtitle}</p>}
          </div>
        </div>
        {actionButton && <div className="title-action">{actionButton}</div>}
      </div>

      {/* Content */}
      <div className="admin-page-content">{children}</div>
    </div>
  );
}
