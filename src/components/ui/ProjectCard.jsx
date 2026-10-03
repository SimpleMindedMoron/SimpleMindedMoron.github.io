import { motion } from "motion/react";

function ProjectCard({ project, index }) {
  const prjNumber = `PRJ_${index + 1}`;
  const githubUrl = "https://github.com/Simplemindedmoron";

  return (
    <motion.a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="neo-window interactive-project-card project-card-link"
      title={`Inspect ${project.title} on GitHub`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Titlebar with automatic PRJ_ index */}
      <div className="neo-titlebar project-card-titlebar">
        <div className="neo-titlebar-left">
          <span className="neo-titlebar-dot"></span>
          <span className="neo-titlebar-text prj-index-text">{prjNumber}</span>
        </div>
        <span className="card-cat-badge-simple">{project.category}</span>
      </div>

      {/* Card Image Thumbnail */}
      <div className="card-image-wrap">
        <img
          src={project.image}
          alt={project.title}
          className="card-project-img"
          loading="lazy"
        />
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
          <span className="card-cta-arrow">↗</span>
        </div>
      </div>
    </motion.a>
  );
}

export default ProjectCard;
