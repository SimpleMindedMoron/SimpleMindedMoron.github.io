function ProjectCard({ project, index, onSelect }) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <div
      className="interactive-project-card"
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
    >
      {/* Card Image Thumbnail */}
      <div className="card-image-wrap">
        <img
          src={project.image}
          alt={project.title}
          className="card-project-img"
          loading="lazy"
        />
        <div className="card-image-gradient" />
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

        {/* Minimalist Tech Tags */}
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

        {/* Card Action Link */}
        <div className="card-action-bar">
          <span className="card-cta-label">Inspect Architecture</span>
          <span className="card-cta-arrow">→</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
