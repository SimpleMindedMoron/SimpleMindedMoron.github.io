import { useState, useMemo } from "react";
import { projects, categories } from "../../data/projectsData";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { playSound } from "../../utils/audio";

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

  const handleCategoryChange = (catId) => {
    playSound("tab");
    setSelectedCategory(catId);
  };

  return (
    <section className="work-section" id="work">
      <div className="work-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-pill">
            <span className="pill-dot violet"></span>
            <span>PORTFOLIO & RESEARCH WORKS</span>
          </div>
          <h2 className="section-heading">
            Selected Works & <br />
            <span className="gradient-text-violet">Engineering Proofs.</span>
          </h2>
          <p className="section-subtext">
            From spatial optimization models in Bangalore to laser tripwire microcontrollers and ROS robotics.
            Click any card to inspect architecture blueprints and technical metrics.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="work-controls-bar">
          {/* Category Tabs */}
          <div className="category-tabs">
            {categories.map((cat) => {
              const count =
                cat.id === "all"
                  ? projects.length
                  : projects.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`category-tab-btn ${selectedCategory === cat.id ? "active" : ""}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="tab-count-badge">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="work-search-box">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech or keywords (e.g. ESP32, Python, SLAM)..."
              aria-label="Search projects by keyword"
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
        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelect={(proj) => setActiveModalProject(proj)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-projects-state">
            <div className="empty-icon">🔍</div>
            <h3>No matching projects found</h3>
            <p>Try clearing your search query or switching category filter.</p>
            <button
              type="button"
              className="reset-filter-btn"
              onClick={() => {
                playSound("click");
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}

export default Work;
