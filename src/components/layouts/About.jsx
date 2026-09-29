import { useState } from "react";

const PILLARS = [
  {
    id: "software",
    title: "Software & Web Engineering",
    subtitle: "Frontend, APIs & Reactive UI",
    summary:
      "I build clean, responsive, and tactile web applications. I focus on performance, intuitive user experience, and zero-bloat code using modern React, modern CSS, and JavaScript. I care deeply about how software feels when interacted with.",
    tags: ["React 19", "JavaScript", "Modern CSS", "Vite", "Node.js", "APIs"],
  },
  {
    id: "hardware",
    title: "Embedded Systems & IoT",
    subtitle: "ESP32, Arduino & Circuit Logic",
    summary:
      "Hands-on with microcontrollers, breadboards, and electronic components. I program interrupt-driven firmware in C++ for ESP32 and Arduino boards, building physical security tripwires, sensor arrays, and wireless telemetry feeds.",
    tags: ["ESP32", "Arduino", "Embedded C++", "Sensors", "Relays", "I2C / SPI / UART"],
  },
  {
    id: "robotics",
    title: "Robotics & Physical Automation",
    subtitle: "Kinematics, SLAM & Telemetry",
    summary:
      "Exploring mobile robotics using ROS 2 on Linux Mint. Working with LiDAR sensor streams, differential drive odometry, and automated spatial mapping for autonomous robotic navigation.",
    tags: ["ROS 2", "Python", "LiDAR", "Kinematics", "SLAM", "FreeRTOS"],
  },
  {
    id: "environment",
    title: "Dual-Boot Environment",
    subtitle: "Linux Mint & Windows 11",
    summary:
      "Dual-booting Linux Mint and Windows 11. I leverage Linux for terminal agility, package compiling, and ROS nodes, switching to Windows for specialized hardware flashers and toolchains.",
    tags: ["Linux Mint", "Windows 11", "Bash & Zsh", "Git / GitHub", "VS Code"],
  },
];

const FAST_FACTS = [
  { label: "Moniker", val: "Simplicity (Simple Minded Moron)", note: "Keeping systems straightforward and efficient" },
  { label: "Daily Operating Systems", val: "Dual Boot: Linux Mint + Windows 11", note: "Balancing open-source terminal power and hardware tooling" },
  { label: "Preferred Chipset", val: "ESP-WROOM-32", note: "Dual cores, FreeRTOS, Wi-Fi and Bluetooth" },
  { label: "Philosophy", val: "Clean, Tactile, No Clutter", note: "Hardware and software that gets straight to work" },
];

function About() {
  const [activePillarId, setActivePillarId] = useState("software");
  const activePillar = PILLARS.find((p) => p.id === activePillarId) || PILLARS[0];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-pill">
            <span className="pill-dot minimal"></span>
            <span>OVERVIEW & BACKGROUND</span>
          </div>
          <h2 className="section-heading">
            Background & <br />
            <span>Focus Areas.</span>
          </h2>
          <p className="section-subtext">
            I'm a developer who bridges software engineering and physical hardware.
            I build both the logic running on the microcontroller and the interface displayed on the screen.
          </p>
        </div>

        {/* Interactive Dual-Brain Showcase */}
        <div className="about-interactive-layout">
          {/* Pillar Selector Buttons */}
          <div className="about-pillars-nav">
            {PILLARS.map((pillar, idx) => (
              <button
                key={pillar.id}
                type="button"
                className={`about-pillar-btn ${activePillarId === pillar.id ? "active" : ""}`}
                onClick={() => setActivePillarId(pillar.id)}
              >
                <span className="pillar-num">{String(idx + 1).padStart(2, "0")}</span>
                <div className="pillar-btn-text">
                  <span className="pillar-title">{pillar.title}</span>
                  <span className="pillar-sub">{pillar.subtitle}</span>
                </div>
                <span className="pillar-arrow">→</span>
              </button>
            ))}
          </div>

          {/* Active Pillar Card */}
          <div className="about-pillar-display">
            <div className="display-card-top">
              <div>
                <span className="display-kicker">FOCUS</span>
                <h3 className="display-title">{activePillar.title}</h3>
                <span className="display-subtitle">{activePillar.subtitle}</span>
              </div>
            </div>

            <p className="display-summary">{activePillar.summary}</p>

            <div className="display-tags-group">
              <span className="display-tags-label">CORE TECHNOLOGIES:</span>
              <div className="display-tags">
                {activePillar.tags.map((tag) => (
                  <span key={tag} className="display-tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fast Facts Grid */}
        <div className="fast-facts-row">
          {FAST_FACTS.map((fact, idx) => (
            <div key={idx} className="fact-card">
              <span className="fact-label">{fact.label}</span>
              <span className="fact-val">{fact.val}</span>
              <span className="fact-note">{fact.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
