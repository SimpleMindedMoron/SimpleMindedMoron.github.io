import { useState, useMemo } from "react";
import { AnimatePresence } from "motion/react";
import { projects, categories } from "../../data/projectsData";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

function Work() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" || p.category === selectedCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="work-section" id="work">
      <div className="work-container">
        {/* Clean Header */}
        <div className="section-header-block">
          <span className="section-kicker">02 // WORKS</span>
          <h2 className="section-heading">
            Selected Builds &amp; <span>Systems.</span>
          </h2>
        </div>

        {/* Clean Controls Strip */}
        <div className="work-controls-strip">
          <div className="work-filter-tabs">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`neo-filter-btn ${isActive ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="work-search-wrapper">
            <input
              type="text"
              className="neo-input work-search-input"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter projects"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelect={setActiveModalProject}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="neo-window empty-results-window">
            <div className="empty-state-content">
              <span className="empty-icon">📦</span>
              <h3 className="empty-title">No matching projects</h3>
              <p className="empty-desc">
                No systems found matching "{searchQuery}".
              </p>
              <button
                type="button"
                className="neo-btn neo-btn-teal"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Modal Window */}
        <AnimatePresence>
          {activeModalProject && (
            <ProjectModal
              project={activeModalProject}
              onClose={() => setActiveModalProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Work;
