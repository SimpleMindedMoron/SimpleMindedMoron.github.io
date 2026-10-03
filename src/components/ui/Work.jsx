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
        {/* Section Header */}
        <div className="section-header-block">
          <div className="neo-badge neo-badge-teal">
            <span className="badge-bullet">■</span>
            <span>DATA DISPLAY // 02</span>
          </div>
          <h2 className="section-heading">
            Selected Works & <br />
            <span>Hardware Builds.</span>
          </h2>
          <p className="section-subtext">
            Physical electronics, embedded firmware, and full-stack software applications. Click any card to inspect system schematics and architecture.
          </p>
        </div>

        {/* Windows 98 / Neo-Brutalist Controls Bar */}
        <div className="neo-window work-controls-window">
          <div className="neo-titlebar">
            <div className="neo-titlebar-left">
              <span className="neo-titlebar-icon">💾</span>
              <span className="neo-titlebar-text">FILE_EXPLORER.EXE // FILTER_CONTROLS</span>
            </div>
            <div className="neo-titlebar-controls">
              <span className="neo-win-btn">_</span>
              <span className="neo-win-btn">□</span>
              <span className="neo-win-btn close">✕</span>
            </div>
          </div>

          <div className="work-controls-content">
            {/* Filter Tabs */}
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
                    {isActive && <span className="filter-active-dot">●</span>}
                  </button>
                );
              })}
            </div>

            {/* Search Input Box */}
            <div className="work-search-wrapper">
              <span className="search-icon-prefix">🔍</span>
              <input
                type="text"
                className="neo-input work-search-input"
                placeholder="SEARCH_PROJECTS.LOG..."
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

            {/* Item Count Badge */}
            <div className="work-count-badge">
              <span>FOUND: {filteredProjects.length} OF {projects.length}</span>
            </div>
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
              <h3 className="empty-title">NO MATCHING SYSTEMS FOUND</h3>
              <p className="empty-desc">
                No records matching query "{searchQuery}". Try clearing filters or entering a different keyword.
              </p>
              <button
                type="button"
                className="neo-btn neo-btn-teal"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                RESET FILTERS
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
