function ProjectCard({ project, index, onSelect }) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  const getCategoryColor = (cat) => {
    switch (cat?.toLowerCase()) {
      case "web":
        return "neo-badge-teal";
      case "hardware":
        return "neo-badge-yellow";
      case "robotics":
        return "neo-badge-magenta";
      default:
        return "neo-badge-lime";
    }
  };

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
      {/* Windows 98 Card Titlebar */}
      <div className="neo-titlebar">
        <div className="neo-titlebar-left">
          <span className="neo-titlebar-icon">💾</span>
          <span className="neo-titlebar-text">SYS_{formattedIndex}.DAT // {project.category?.toUpperCase()}</span>
        </div>
        <div className="neo-titlebar-controls">
          <span className="neo-win-btn">_</span>
          <span className="neo-win-btn">□</span>
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
        <div className="card-top-badges">
          <span className="neo-badge neo-badge-yellow">{formattedIndex}</span>
          <span className={`neo-badge ${getCategoryColor(project.category)}`}>
            {project.category}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="card-content-body">
        <div className="card-header-row">
          <h3 className="card-heading">{project.title}</h3>
          <span className="card-year-badge">{project.year || "2024"}</span>
        </div>

        <p className="card-summary">{project.description}</p>

        {/* Neo-Brutalist Tech Badges */}
        {project.tags && (
          <div className="card-tags-list">
            {project.tags.slice(0, 3).map((tag, i) => {
              const colors = ["neo-tag-teal", "neo-tag-yellow", "neo-tag-magenta"];
              return (
                <span key={tag} className={`neo-tag ${colors[i % colors.length]}`}>
                  {tag}
                </span>
              );
            })}
            {project.tags.length > 3 && (
              <span className="neo-tag neo-tag-outline">+{project.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Card Action Link Bar */}
        <div className="card-action-bar">
          <span className="card-cta-label">INSPECT ARCHITECTURE</span>
          <span className="card-cta-arrow">→</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
