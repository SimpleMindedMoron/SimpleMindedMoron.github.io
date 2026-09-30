import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const PILLARS = [
  {
    id: "software",
    num: "01",
    title: "Software & Web Engineering",
    subtitle: "Frontend, Async APIs & Reactive UI",
    summary:
      "I develop fast, minimalist, and responsive web platforms. My approach prioritizes high performance, zero superfluous bloat, and polished user interactions using modern React, vanilla CSS, and JavaScript. I care deeply about how digital tools feel when used.",
    tags: ["React 19", "JavaScript", "Modern CSS", "Vite", "Node.js", "REST APIs"],
    specs: [
      { label: "Frontend Paradigm", value: "Component-driven, reactive UI" },
      { label: "State & Data", value: "Async telemetry & API sync" },
      { label: "Design System", value: "Borderless obsidian & glassmorphism" },
    ],
  },
  {
    id: "hardware",
    num: "02",
    title: "Embedded Systems & IoT",
    subtitle: "ESP32, Microcontrollers & Circuit Logic",
    summary:
      "Hands-on with microcontrollers, circuit schematics, and sensor peripherals. I write interrupt-driven firmware in C++ for ESP32 and Arduino boards, building physical laser security tripwires, automated relay controls, and wireless telemetry streams.",
    tags: ["ESP32", "Arduino", "Embedded C++", "Sensors", "Relays", "I2C / SPI / UART"],
    specs: [
      { label: "Primary SoC", value: "ESP-WROOM-32 (Dual Core 240MHz)" },
      { label: "Firmware Toolchain", value: "PlatformIO & Arduino C++" },
      { label: "Bus Protocols", value: "I2C, SPI, UART serial feeds" },
    ],
  },
  {
    id: "robotics",
    num: "03",
    title: "Robotics & Physical Automation",
    subtitle: "Kinematics, SLAM & Sensor Streams",
    summary:
      "Developing robotics architectures on Linux Mint using ROS 2. Integrating LiDAR distance feeds, differential-drive wheel odometry, and automated spatial mapping for autonomous robotic navigation and obstacle avoidance.",
    tags: ["ROS 2", "Python", "LiDAR", "Kinematics", "SLAM", "FreeRTOS"],
    specs: [
      { label: "Robotics Framework", value: "ROS 2 Humble / Iron" },
      { label: "Sensory Pipeline", value: "LiDAR Point Clouds + Sonar" },
      { label: "Locomotion", value: "Differential Drive Kinematics" },
    ],
  },
  {
    id: "environment",
    num: "04",
    title: "Dual-Boot Engineering Workflow",
    subtitle: "Linux Mint & Windows 11",
    summary:
      "Running a dual-boot setup across Linux Mint and Windows 11. I leverage Linux for terminal agility, ROS nodes, and C++ compiling, while utilizing Windows for specialized hardware flashing utilities and CAD software.",
    tags: ["Linux Mint", "Windows 11", "Bash & Zsh", "Git / GitHub", "VS Code"],
    specs: [
      { label: "Primary OS", value: "Linux Mint 21.3 (Terminal Agility)" },
      { label: "Secondary OS", value: "Windows 11 (Hardware Toolchains)" },
      { label: "Shell & Shellcraft", value: "Zsh, Bash automation, Git" },
    ],
  },
];

const poshEase = [0.16, 1, 0.3, 1];

function About() {
  const [activeTab, setActiveTab] = useState(PILLARS[0].id);
  const activePillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* Section Header with Staggered Text Reveals */}
        <div className="section-header-block">
          <motion.div
            className="section-pill"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: poshEase }}
          >
            <span className="pill-dot minimal"></span>
            <span>OVERVIEW & BACKGROUND</span>
          </motion.div>
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08, ease: poshEase }}
          >
            Background & <br />
            <span>Focus Areas.</span>
          </motion.h2>
          <motion.p
            className="section-subtext"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.16, ease: poshEase }}
          >
            Bridging hardware and software engineering. I build the physical circuitry, write the low-level firmware, and design the interactive interface.
          </motion.p>
        </div>

        {/* Unified Segmented Pillar Tabs */}
        <motion.div
          className="about-segmented-tabs"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.22, ease: poshEase }}
        >
          {PILLARS.map((pillar) => {
            const isActive = activeTab === pillar.id;
            return (
              <button
                key={pillar.id}
                type="button"
                className={`about-segment-tab ${isActive ? "active" : ""}`}
                onClick={() => setActiveTab(pillar.id)}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePillarGlider"
                    className="segment-tab-glider"
                    transition={{ duration: 0.26, ease: poshEase }}
                  />
                )}
                <span className="tab-num">{pillar.num}</span>
                <span className="tab-title">{pillar.title.split("&")[0].trim()}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Unified Architectural Showcase Card */}
        <motion.div
          className="about-showcase-card"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.28, ease: poshEase }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: poshEase }}
              className="showcase-content-body"
            >
              {/* Header inside card */}
              <div className="showcase-header">
                <div>
                  <div className="showcase-kicker">
                    <span>FOCUS AREA {activePillar.num}</span>
                    <span className="kicker-sep">•</span>
                    <span>{activePillar.subtitle}</span>
                  </div>
                  <h3 className="showcase-title">{activePillar.title}</h3>
                </div>
              </div>

              {/* Narrative Summary */}
              <p className="showcase-summary">{activePillar.summary}</p>

              {/* Technologies row */}
              <div className="showcase-tech-row">
                <span className="showcase-tech-label">CORE TECHNOLOGIES</span>
                <div className="showcase-tags">
                  {activePillar.tags.map((tag) => (
                    <span key={tag} className="showcase-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Telemetry / Technical Specs */}
              <div className="showcase-specs-grid">
                {activePillar.specs.map((spec, idx) => (
                  <div key={idx} className="spec-item">
                    <span className="spec-label">{spec.label}</span>
                    <span className="spec-val">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
