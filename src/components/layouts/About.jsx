import { useState } from "react";
import { playSound } from "../../utils/audio";

const PILLARS = [
  {
    id: "software",
    icon: "💻",
    title: "Software & Web Craft",
    subtitle: "Frontend, APIs & Systems",
    summary:
      "I love building software that not only functions reliably but looks and feels exceptionally smooth. No boring templates—I craft bespoke reactive layouts, micro-interactions, and high-performance Web applications using modern React, Vite, and custom CSS.",
    tags: ["React 19", "JavaScript (ESNext)", "Modern CSS / Glassmorphism", "Vite", "Node.js", "Web Audio API"],
  },
  {
    id: "hardware",
    icon: "⚡",
    title: "Hardware & Physical Computing",
    subtitle: "Microcontrollers & Embedded C++",
    summary:
      "I'm hands-on with soldering irons, breadboards, and logic analyzers. I develop interrupt-driven firmware for ESP32 and Arduino microcontrollers, building real-world automation matrices, laser perimeter alarms, and ultrasonic guidance systems.",
    tags: ["ESP32 (FreeRTOS)", "Arduino Uno/Nano", "C/C++", "Sensors & Actuators", "Relays & Optocouplers", "I2C / SPI / UART"],
  },
  {
    id: "research",
    icon: "📐",
    title: "Computational Modeling & AI",
    subtitle: "Stochastic Branching & Optimization",
    summary:
      "Beyond web apps and breadboards, I conduct research in stochastic processes and spatial optimization. Using MATLAB and Python, I formulate mathematical models for misinformation decay across social graphs and cost-optimal startup hub distribution.",
    tags: ["MATLAB", "Python", "NumPy / SciPy", "Stochastic Modeling", "Graph Theory", "Optimization Algorithms"],
  },
  {
    id: "environment",
    icon: "🐧",
    title: "The Rig & Dual-Boot Setup",
    subtitle: "Linux Mint & Windows 11 Workflow",
    summary:
      "A proud dual-booter. I rely on Linux Mint for frictionless command-line tooling, ROS robotics nodes, and compile speed, seamlessly switching to Windows for specialized hardware flashing and CAD. Flexible, adaptable, and comfortable anywhere in the terminal.",
    tags: ["Linux Mint", "Windows 11", "Bash & Zsh", "Git / GitHub", "ROS 2 Humble", "VS Code"],
  },
];

const FAST_FACTS = [
  { label: "Moniker / Alias", val: "Simplicity (Simple Minded Moron)", note: "Keeping things minimal yet deeply capable" },
  { label: "Primary OS", val: "Dual Boot: Linux Mint + Windows 11", note: "The best of both open-source and hardware tooling" },
  { label: "Favorite Chip", val: "ESP-WROOM-32", note: "Dual cores, FreeRTOS, Wi-Fi and Bluetooth in a $4 package" },
  { label: "Design Creed", val: "Tactile & Clean", note: "Software should feel alive under your fingertips" },
];

function About() {
  const [activePillarId, setActivePillarId] = useState("software");
  const activePillar = PILLARS.find((p) => p.id === activePillarId) || PILLARS[0];

  const handleSelectPillar = (id) => {
    playSound("tab");
    setActivePillarId(id);
  };

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-pill">
            <span className="pill-dot blue"></span>
            <span>WHO & WHY &mdash; PHILOSOPHY</span>
          </div>
          <h2 className="section-heading">
            Meet Arjun Sanesh. <br />
            <span className="gradient-text-blue">The Dual-Mind Developer.</span>
          </h2>
          <p className="section-subtext">
            I don't have a formal degree in graphic design, but I am obsessed with making software feel effortless.
            I bridge the gap between physical electrical components and intuitive software experiences.
          </p>
        </div>

        {/* Interactive Dual-Brain Showcase */}
        <div className="about-interactive-layout">
          {/* Pillar Selector Buttons */}
          <div className="about-pillars-nav">
            {PILLARS.map((pillar) => (
              <button
                key={pillar.id}
                type="button"
                className={`about-pillar-btn ${activePillarId === pillar.id ? "active" : ""}`}
                onClick={() => handleSelectPillar(pillar.id)}
              >
                <span className="pillar-icon">{pillar.icon}</span>
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
              <span className="display-icon-large">{activePillar.icon}</span>
              <div>
                <span className="display-kicker">FOCUS AREA</span>
                <h3 className="display-title">{activePillar.title}</h3>
                <span className="display-subtitle">{activePillar.subtitle}</span>
              </div>
            </div>

            <p className="display-summary">{activePillar.summary}</p>

            <div className="display-tags-group">
              <span className="display-tags-label">CORE TOOLKIT & SKILLS:</span>
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
            <div
              key={idx}
              className="fact-card"
              onClick={() => playSound("hover")}
            >
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
