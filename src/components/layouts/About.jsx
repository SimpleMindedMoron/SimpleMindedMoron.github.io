import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const PILLARS = [
  {
    id: "software",
    tabLabel: "TAB 1: SOFTWARE",
    colorClass: "tab-teal",
    num: "01",
    title: "Software & Web Engineering",
    subtitle: "Frontend, Async APIs & Reactive UI",
    summary:
      "I develop fast, minimalist, and responsive web platforms. My approach prioritizes high performance, zero superfluous bloat, and polished user interactions using modern React, vanilla CSS, and JavaScript. I care deeply about how digital tools feel when used.",
    tags: ["React 19", "JavaScript", "Modern CSS", "Vite", "Node.js", "REST APIs"],
    specs: [
      { label: "Frontend Paradigm", value: "Component-driven, reactive UI & state" },
      { label: "Data Telemetry", value: "Async REST APIs & event streaming" },
      { label: "Design System", value: "Neo-Brutalist & Windows 98 Vintage Architecture" },
      { label: "Tooling Stack", value: "Vite, Git, ESLint, npm packages" },
    ],
  },
  {
    id: "hardware",
    tabLabel: "TAB 2: HARDWARE",
    colorClass: "tab-yellow",
    num: "02",
    title: "Embedded Systems & IoT",
    subtitle: "ESP32, Microcontrollers & Circuit Logic",
    summary:
      "Hands-on with microcontrollers, circuit schematics, and sensor peripherals. I write interrupt-driven firmware in C++ for ESP32 and Arduino boards, building physical laser security tripwires, automated relay controls, and wireless telemetry streams.",
    tags: ["ESP32", "Arduino", "Embedded C++", "Sensors", "Relays", "I2C / SPI / UART"],
    specs: [
      { label: "Primary SoC", value: "ESP-WROOM-32 (Dual Core 240MHz Xtensa)" },
      { label: "Firmware Toolchain", value: "PlatformIO & Arduino C++" },
      { label: "Bus Protocols", value: "I2C, SPI, UART serial feeds" },
      { label: "Circuit Prototyping", value: "Breadboard circuits, optocouplers, relays" },
    ],
  },
  {
    id: "robotics",
    tabLabel: "TAB 3: ROBOTICS",
    colorClass: "tab-magenta",
    num: "03",
    title: "Robotics & Physical Automation",
    subtitle: "Kinematics, SLAM & Sensor Streams",
    summary:
      "Developing robotics architectures on Linux Mint using ROS 2. Integrating LiDAR distance feeds, differential-drive wheel odometry, and automated spatial mapping for autonomous robotic navigation and obstacle avoidance.",
    tags: ["ROS 2", "Python", "LiDAR", "Kinematics", "SLAM", "FreeRTOS"],
    specs: [
      { label: "Robotics Framework", value: "ROS 2 Humble / Iron" },
      { label: "Sensory Pipeline", value: "LiDAR Point Clouds + Sonar Distance" },
      { label: "Locomotion", value: "Differential Drive Kinematics & PWM" },
      { label: "Embedded OS", value: "FreeRTOS deterministic multitasking" },
    ],
  },
  {
    id: "environment",
    tabLabel: "TAB 4: WORKFLOW",
    colorClass: "tab-lime",
    num: "04",
    title: "Dual-Boot Engineering Workflow",
    subtitle: "Linux Mint & Windows 11",
    summary:
      "Running a dual-boot setup across Linux Mint and Windows 11. I leverage Linux for terminal agility, ROS nodes, and C++ compiling, while utilizing Windows for specialized hardware flashing utilities and CAD software.",
    tags: ["Linux Mint", "Windows 11", "Bash & Zsh", "Git / GitHub", "VS Code"],
    specs: [
      { label: "Primary OS", value: "Linux Mint 21.3 (Terminal Agility & ROS)" },
      { label: "Secondary OS", value: "Windows 11 (Hardware Toolchains & Flashing)" },
      { label: "Shell & Automation", value: "Zsh, Bash scripting, Git versioning" },
      { label: "Editor & IDE", value: "VS Code, PlatformIO, NeoVim" },
    ],
  },
];

function About() {
  const [activeTab, setActiveTab] = useState("software");
  const activePillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="neo-badge neo-badge-yellow">
            <span className="badge-bullet">■</span>
            <span>FOUNDATIONS // 01</span>
          </div>
          <h2 className="section-heading">
            System Specifications & <br />
            <span>Core Capabilities.</span>
          </h2>
          <p className="section-subtext">
            Architectural overview of software engineering, embedded hardware builds, and development environment.
          </p>
        </div>

        {/* Windows 98 / Neo-Brutalist Tabs Bar (directly styled like the reference sheet) */}
        <div className="neo-tabs-bar" role="tablist">
          {PILLARS.map((pillar) => {
            const isActive = pillar.id === activeTab;
            return (
              <button
                key={pillar.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`neo-tab-btn ${pillar.colorClass} ${isActive ? "active" : ""}`}
                onClick={() => setActiveTab(pillar.id)}
              >
                <span className="tab-pill-indicator">{isActive ? "●" : "○"}</span>
                <span>{pillar.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab System Window */}
        <div className="neo-window about-window">
          {/* Window Titlebar */}
          <div className="neo-titlebar">
            <div className="neo-titlebar-left">
              <span className="neo-titlebar-icon">📁</span>
              <span className="neo-titlebar-text">SYSTEM_PROPERTIES.CPL // {activePillar.title}</span>
            </div>
            <div className="neo-titlebar-controls">
              <span className="neo-win-btn">_</span>
              <span className="neo-win-btn">□</span>
              <span className="neo-win-btn close">✕</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              className="about-window-content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {/* Top Banner / Description */}
              <div className="about-overview-grid">
                <div className="about-desc-col">
                  <div className="about-card-badge-row">
                    <span className="neo-tag neo-tag-teal">{activePillar.num}</span>
                    <span className="about-subtitle">{activePillar.subtitle}</span>
                  </div>
                  <h3 className="about-content-heading">{activePillar.title}</h3>
                  <p className="about-summary-text">{activePillar.summary}</p>

                  {/* Skills / Tech Badges (Solid Accent Blocks per reference sheet) */}
                  <div className="about-tags-section">
                    <span className="about-tags-label">ACTIVE TOOLKIT & TECHNOLOGIES:</span>
                    <div className="about-tags-wrap">
                      {activePillar.tags.map((tag, idx) => {
                        const colors = ["neo-tag-yellow", "neo-tag-teal", "neo-tag-magenta", "neo-tag-lime"];
                        const colorClass = colors[idx % colors.length];
                        return (
                          <span key={tag} className={`neo-tag ${colorClass}`}>
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Neo-Brutalist Specifications Table (Directly following image table structure) */}
                <div className="about-table-col">
                  <div className="neo-table-wrapper">
                    <div className="neo-table-header">
                      <span>SYSTEM PARAMETER</span>
                      <span>ARCHITECTURE SPECIFICATION</span>
                    </div>
                    <div className="neo-table-body">
                      {activePillar.specs.map((spec, i) => (
                        <div key={spec.label} className={`neo-table-row ${i % 2 === 0 ? "even" : "odd"}`}>
                          <span className="table-col-label">{spec.label}</span>
                          <span className="table-col-val">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="about-status-box">
                    <span className="status-box-title">VALIDATION METRIC:</span>
                    <span className="status-box-desc">Strict adherence to zero bloat, high signal-to-noise ratio, and maximum hardware utility.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Window Footer Statusbar */}
          <div className="neo-statusbar">
            <span className="statusbar-item">MODULE: {activePillar.id.toUpperCase()}.DLL</span>
            <span className="statusbar-item">INTEGRITY: 100%</span>
            <span className="statusbar-item statusbar-fill">FOCUS ALWAYS VISIBLE</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
