import { useState } from "react";
import { motion } from "motion/react";

const PILLARS = [
  {
    id: "software",
    tabLabel: "Software",
    title: "Software & Web Engineering",
    desc: "Building reactive, high-performance web platforms with modern React, clean component architecture, and minimal bundle sizes.",
    tags: ["React 19", "JavaScript", "Modern CSS", "Vite", "Node.js", "REST APIs"],
  },
  {
    id: "hardware",
    tabLabel: "Embedded IoT",
    title: "Embedded Systems & IoT",
    desc: "Writing interrupt-driven C++ firmware for ESP32 & Arduino microcontrollers, physical sensors, and serial communication buses.",
    tags: ["ESP32", "Arduino", "Embedded C++", "I2C / SPI / UART", "Sensors", "Relays"],
  },
  {
    id: "robotics",
    tabLabel: "Robotics",
    title: "Robotics & Automation",
    desc: "Developing ROS 2 control nodes, 2D LiDAR distance processing, and autonomous SLAM mapping on Linux Mint.",
    tags: ["ROS 2", "Python", "LiDAR", "SLAM", "Linux Mint"],
  },
  {
    id: "workflow",
    tabLabel: "Workflow",
    title: "Dual-Boot Engineering",
    desc: "Dual-boot workflow utilizing Linux Mint for terminal agility and ROS, paired with Windows 11 for hardware flashing toolchains.",
    tags: ["Linux Mint", "Windows 11", "Bash & Git", "PlatformIO", "VS Code"],
  },
];

function About() {
  const [activeTab, setActiveTab] = useState("software");
  const activePillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* Header with scroll animation */}
        <motion.div
          className="section-header-block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-kicker">01 // FOCUS</span>
          <h2 className="section-heading">
            Technical Architecture &amp; <span>Capabilities.</span>
          </h2>
        </motion.div>

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

        {/* Tab Content Window with scroll animation */}
        <motion.div
          className="neo-window about-window"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="neo-titlebar">
            <div className="neo-titlebar-left">
              <span className="neo-titlebar-dot"></span>
              <span className="neo-titlebar-text">{activePillar.title}</span>
            </div>
          </div>

          <div className="about-window-content">
            <p className="about-focus-desc">{activePillar.desc}</p>
            <div className="about-tags-row">
              {activePillar.tags.map((tag) => (
                <span key={tag} className="neo-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
