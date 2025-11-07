// src/features/home/RecentActivities.jsx
import { recentActivitiesData } from '../../data/recentActivitiesData';
import './RecentActivities.css';

function RecentActivities() {
  // MUDANÇA: Seleciona APENAS as 8 atividades mais recentes
  const activities = recentActivitiesData.slice(0, 8);

  const placeholderUrl = "https://picsum.photos/300/180?grayscale&blur=1";

  return (
    <section className="recent-activities-section">
      <div className="activities-container">
        <h2 className="activities-title">Atividades Recentes</h2>
        {/* MUDANÇA: Renomeado para 'activities-grid' para clareza */}
        <div className="activities-grid">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-card">
              <a href={activity.link} className="activity-link">
                <img
                  src={activity.image || placeholderUrl}
                  alt={activity.title}
                  className="activity-image"
                  onError={(e) => { e.target.onerror = null; e.target.src=placeholderUrl; }}
                />
                <div className="activity-content">
                  <span className="activity-category">{activity.category}</span>
                  <h5 className="activity-card-title">{activity.title}</h5>
                  <p className="activity-description">{activity.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentActivities;