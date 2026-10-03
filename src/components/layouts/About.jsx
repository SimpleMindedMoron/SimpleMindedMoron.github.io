import { useState } from "react";
import { AnimatePresence } from "motion/react";

const PILLARS = [
  {
    id: "software",
    tabLabel: "Software",
    title: "Software & Web Engineering",
    summary:
      "Developing high-performance, responsive web architectures using modern React and JavaScript. Focused on minimal bundle footprints and polished interactions.",
    highlights: [
      "Reactive component architecture & clean state management",
      "Async REST APIs and live data streaming",
      "Tailored modern design systems without framework bloat",
    ],
    tags: ["React 19", "JavaScript", "Modern CSS", "Vite", "Node.js", "REST APIs"],
  },
  {
    id: "hardware",
    tabLabel: "Embedded IoT",
    title: "Embedded Systems & IoT",
    summary:
      "Writing interrupt-driven C++ firmware for ESP32 and Arduino microcontrollers. Prototyping physical circuit logic, sensor peripherals, and wireless telemetry.",
    highlights: [
      "ESP32 dual-core firmware in PlatformIO & Arduino C++",
      "I2C, SPI, and UART serial communication protocols",
      "Laser optical trips, relay switches, and sensor telemetry",
    ],
    tags: ["ESP32", "Arduino", "Embedded C++", "Sensors", "Relays", "PlatformIO"],
  },
  {
    id: "robotics",
    tabLabel: "Robotics",
    title: "Robotics & Physical Automation",
    summary:
      "Building differential-drive robotics platforms on Linux Mint with ROS 2. Processing LiDAR distance point clouds and SLAM mapping for autonomous navigation.",
    highlights: [
      "ROS 2 Humble / Iron sensor pipeline integration",
      "LiDAR point clouds, ultrasonic sonar, and odometry",
      "Kinematic motion models & deterministic motor control",
    ],
    tags: ["ROS 2", "Python", "LiDAR", "Kinematics", "SLAM", "FreeRTOS"],
  },
  {
    id: "environment",
    tabLabel: "Workflow",
    title: "Dual-Boot Engineering Workflow",
    summary:
      "Operating a dual-boot setup across Linux Mint and Windows 11. Leveraging Linux for terminal agility and ROS, while utilizing Windows for flashing utilities and CAD.",
    highlights: [
      "Linux Mint 21.3 primary environment for scripting & ROS",
      "Windows 11 workstation for specialized hardware tooling",
      "Automated terminal workflows with Zsh, Bash, and Git",
    ],
    tags: ["Linux Mint", "Windows 11", "Zsh & Bash", "Git", "VS Code", "PlatformIO"],
  },
];

function About() {
  const [activeTab, setActiveTab] = useState("software");
  const activePillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* Clean Header */}
        <div className="section-header-block">
          <span className="section-kicker">01 // FOCUS</span>
          <h2 className="section-heading">
            Technical Architecture &amp; <span>Capabilities.</span>
          </h2>
        </div>

        {/* Simplified Tabs */}
        <div className="neo-tabs-bar" role="tablist">
          {PILLARS.map((pillar) => {
            const isActive = pillar.id === activeTab;
            return (
              <button
                key={pillar.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`neo-tab-btn ${isActive ? "active" : ""}`}
                onClick={() => setActiveTab(pillar.id)}
              >
                <span>{pillar.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Window */}
        <div className="neo-window about-window">
          <div className="neo-titlebar">
            <div className="neo-titlebar-left">
              <span className="neo-titlebar-icon">📁</span>
              <span className="neo-titlebar-text">PROPERTIES // {activePillar.title}</span>
            </div>
            <div className="neo-titlebar-controls">
              <span className="neo-win-btn">_</span>
              <span className="neo-win-btn">□</span>
              <span className="neo-win-btn close">✕</span>
            </div>
          </div>

          <div className="about-window-content">
            <div className="about-details-wrap">
              <h3 className="about-content-heading">{activePillar.title}</h3>
              <p className="about-summary-text">{activePillar.summary}</p>

              {/* Concise Highlights */}
              <div className="about-highlights-list">
                {activePillar.highlights.map((item, idx) => (
                  <div key={idx} className="about-highlight-item">
                    <span className="highlight-bullet">▸</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="about-tags-section">
                <span className="about-tags-label">CORE TOOLKIT:</span>
                <div className="about-tags-wrap">
                  {activePillar.tags.map((tag) => (
                    <span key={tag} className="neo-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
