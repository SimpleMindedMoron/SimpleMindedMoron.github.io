import { useEffect } from "react";
import { motion } from "motion/react";

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      className="modal-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div
        className="neo-window modal-window"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Titlebar */}
        <div className="neo-titlebar">
          <div className="neo-titlebar-left">
            <span className="neo-titlebar-dot"></span>
            <span className="neo-titlebar-text">inspector.exe // {project.title}</span>
          </div>
          <div className="neo-titlebar-controls">
            <button
              type="button"
              className="neo-win-btn close"
              onClick={onClose}
              aria-label="Close dialog"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Banner Image */}
        <div className="modal-banner-wrap">
          <img
            src={project.image}
            alt={project.title}
            className="modal-banner-img"
          />
          <div className="modal-banner-overlay">
            <span className="neo-badge neo-badge-yellow">{project.category?.toUpperCase()}</span>
            <span className="neo-badge neo-badge-teal">{project.year || "2024"}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body-content">
          <div className="modal-header-row">
            <h2 id="modal-title" className="modal-title-text">{project.title}</h2>
            <div className="modal-kicker-tag">SYSTEM ID: #SIMP-{project.id?.toUpperCase()}</div>
          </div>

          <p className="modal-description-text">{project.description}</p>

          {/* Technical Specifications Table */}
          {project.specs && (
            <div className="modal-specs-block">
              <span className="specs-section-title">TECHNICAL ARCHITECTURE SPECIFICATIONS:</span>
              <div className="neo-table-wrapper">
                <div className="neo-table-body">
                  {Object.entries(project.specs).map(([key, val], idx) => (
                    <div key={key} className={`neo-table-row ${idx % 2 === 0 ? "even" : "odd"}`}>
                      <span className="table-col-label">{key.toUpperCase()}</span>
                      <span className="table-col-val">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* All Tags */}
          {project.tags && (
            <div className="modal-tags-block">
              <span className="specs-section-title">DEPLOYED PROTOCOLS & TOOLCHAINS:</span>
              <div className="modal-tags-flex">
                {project.tags.map((tag, idx) => {
                  const colors = ["neo-tag-teal", "neo-tag-yellow", "neo-tag-magenta", "neo-tag-lime"];
                  return (
                    <span key={tag} className={`neo-tag ${colors[idx % colors.length]}`}>
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Modal Action Links */}
          <div className="modal-actions-bar">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn neo-btn-teal"
              >
                <span>OPEN LIVE PROTOCOL</span>
                <span className="btn-arrow">↗</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn neo-btn-yellow"
              >
                <span>VIEW SOURCE (GITHUB)</span>
                <span className="btn-arrow">&lt;/&gt;</span>
              </a>
            )}
            <button
              type="button"
              className="neo-btn neo-btn-outline"
              onClick={onClose}
            >
              CLOSE WINDOW
            </button>
          </div>
        </div>

        {/* Modal Status Bar */}
        <div className="neo-statusbar">
          <span className="statusbar-item">DIALOG: MODAL_CONFIRM</span>
          <span className="statusbar-item">PRESS ESC TO CLOSE</span>
          <span className="statusbar-item statusbar-fill">FOCUS ALWAYS VISIBLE</span>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectModal;
