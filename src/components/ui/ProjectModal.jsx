import { useEffect } from "react";
import { playSound } from "../../utils/audio";

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    playSound("open");
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        playSound("click");
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={() => {
        playSound("click");
        onClose();
      }}
    >
      <div
        className="modal-window"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Top Bar */}
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="modal-cat-badge">{project.category?.toUpperCase() || "PROJECT"}</span>
            <span className="modal-year-badge">{project.year || "2024"}</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => {
              playSound("click");
              onClose();
            }}
            aria-label="Close project modal"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Modal Banner Image */}
        <div className="modal-banner">
          <img src={project.image} alt={project.title} className="modal-banner-img" />
          <div className="modal-banner-gradient"></div>
          <div className="modal-banner-text">
            <h2 id="modal-title" className="modal-title">{project.title}</h2>
            <p className="modal-subtitle">{project.subtitle || project.description}</p>
          </div>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="modal-body">
          {/* Key Metrics / Stats Bar */}
          {project.stats && (
            <div className="modal-stats-grid">
              {project.stats.map((s, idx) => (
                <div key={idx} className="modal-stat-card">
                  <span className="stat-val">{s.value}</span>
                  <span className="stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Deep Dive Description */}
          <div className="modal-section">
            <h3 className="modal-section-heading">Executive Overview</h3>
            <p className="modal-para">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Architecture & Implementation Highlights */}
          {project.architecture && (
            <div className="modal-section">
              <h3 className="modal-section-heading">Technical Highlights & Pipeline</h3>
              <ul className="modal-arch-list">
                {project.architecture.map((item, idx) => (
                  <li key={idx} className="modal-arch-item">
                    <span className="arch-bullet">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="modal-section">
            <h3 className="modal-section-heading">Technologies Utilized</h3>
            <div className="modal-tags-wrap">
              {project.tags.map((tag) => (
                <span key={tag} className="modal-tag-chip">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className="modal-footer">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-action-btn primary"
              onClick={() => playSound("click")}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.02 11.02 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
              </svg>
              <span>View Repository on GitHub</span>
            </a>
          )}
          <button
            type="button"
            className="modal-action-btn secondary"
            onClick={() => {
              playSound("click");
              onClose();
            }}
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
