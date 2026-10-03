function ProjectCard({ project, index, onSelect }) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <div
      className="neo-window interactive-project-card"
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
      {/* Titlebar */}
      <div className="neo-titlebar">
        <div className="neo-titlebar-left">
          <span className="neo-titlebar-icon">💾</span>
          <span className="neo-titlebar-text">SYS_{formattedIndex} // {project.title}</span>
        </div>
        <div className="neo-titlebar-controls">
          <span className="neo-win-btn">↗</span>
        </div>
      </div>

      {/* Card Image Thumbnail */}
      <div className="card-image-wrap">
        <img
          src={project.image}
          alt={project.title}
          className="card-project-img"
          loading="lazy"
        />
        <span className="card-cat-badge">{project.category}</span>
      </div>

      {/* Card Content Body */}
      <div className="card-content-body">
        <h3 className="card-heading">{project.title}</h3>
        <p className="card-summary">{project.description}</p>

        {/* Clean Tech Badges */}
        {project.tags && (
          <div className="card-tags-list">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="neo-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="card-action-bar">
          <span className="card-cta-label">Inspect Architecture</span>
          <span className="card-cta-arrow">→</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
