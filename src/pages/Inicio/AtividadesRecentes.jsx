import React from "react";
import { useNavigate } from "react-router-dom";
import { recentActivitiesData } from "../../data/recentActivitiesData";
import { FaArrowRight, FaBullhorn, FaImage, FaNewspaper } from "react-icons/fa";
import "./AtividadesRecentes.css";

function RecentActivities({ limit = 8 }) {
  // MUDANÇA: Limite agora é 8 (4x2)
  const navigate = useNavigate();

  const activities = recentActivitiesData.slice(0, limit);
  const placeholderUrl = "https://picsum.photos/300/180?grayscale&blur=1";

  const handleOpen = (activity) => {
    if (
      activity.category === "NOVO EVENTO" ||
      activity.link.includes("/eventos/")
    ) {
      const d = new Date(activity.timestamp);
      const eventId = activity.id;
      navigate(
        `/eventos?ano=${d.getFullYear()}&mes=${d.getMonth()}&dia=${d.getDate()}&eventId=${eventId}`
      );
    } else {
      window.location.href = activity.link;
    }
  };

  const getIcon = (cat) => {
    if (cat.includes("EVENTO")) return <FaBullhorn />;
    if (cat.includes("GALERIA")) return <FaImage />;
    return <FaNewspaper />;
  };

  return (
    <section className="recent-activities-section">
      <div className="activities-container">
        <h2 className="activities-title">Novidades Recentes</h2>
        <div className="recent-grid">
          {activities.map((activity) => (
            <article
              key={activity.id}
              className="recent-card"
              onClick={() => handleOpen(activity)}
            >
              <div className="recent-thumb-wrap">
                <img
                  src={activity.image || placeholderUrl}
                  alt={activity.title}
                  className="recent-thumb"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderUrl;
                  }}
                />
              </div>

              <div className="recent-body">
                <div className="recent-meta">
                  <span className="recent-meta-item">
                    {getIcon(activity.category)} {activity.category}
                  </span>
                </div>
                <h4 className="recent-title">{activity.title}</h4>
                <p className="recent-card-desc">{activity.description}</p>
              </div>

              <div className="recent-actions">
                <button className="recent-btn" tabIndex="-1">
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

export default RecentActivities;
