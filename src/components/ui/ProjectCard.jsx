import { useRef } from "react";

function ProjectCard({ project, index, onSelect }) {
  const cardRef = useRef(null);
  const rafId = useRef(null);
  const formattedIndex = String(index + 1).padStart(2, "0");

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      cardRef.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div
      ref={cardRef}
      className="interactive-project-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
    >
      {/* Card Image Thumbnail */}
      <div className="card-image-wrap">
        <img
          src={project.image}
          alt={project.title}
          className="card-project-img"
          loading="lazy"
        />
        <div className="card-image-gradient"></div>
        <div className="card-top-badges">
          <span className="card-index-badge">{formattedIndex}</span>
          <span className="card-category-badge">{project.category}</span>
        </div>
      </div>

      {/* Card Text Content */}
      <div className="card-content-body">
        <div className="card-header-row">
          <h3 className="card-heading">{project.title}</h3>
          <span className="card-year">{project.year}</span>
        </div>

        <p className="card-summary">{project.description}</p>

        {/* Minimalist Stats preview */}
        {project.stats && (
          <div className="card-stats-preview">
            {project.stats.slice(0, 2).map((s, idx) => (
              <div key={idx} className="card-stat-pill">
                <span className="stat-pill-val">{s.value}</span>
                <span className="stat-pill-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Minimalist Tech tags */}
        {project.tags && (
          <div className="card-tags-list">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tech-badge">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="tech-badge more">+{project.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Card Action footer */}
        <div className="card-action-bar">
          <span className="card-cta-label">Inspect Architecture</span>
          <span className="card-cta-arrow">→</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
