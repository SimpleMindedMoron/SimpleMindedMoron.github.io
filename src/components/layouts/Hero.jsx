import { useState, useEffect } from "react";
import { playSound } from "../../utils/audio";
import Socials from "../ui/Socials";
import linkedinIcon from "../../assets/images/linkedin.png";
import instagramIcon from "../../assets/images/instagram.png";

const ROLES = [
  "Full-Stack Web Developer",
  "Hardware & IoT Hacker (ESP32 / Arduino)",
  "Stochastic & Spatial Optimization Researcher",
  "Robotics & Sensor Fusion Explorer",
  "Dual-Boot Mindset (Linux Mint + Win11)",
];

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const speed = isDeleting ? 25 : 55;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const scrollTo = (id) => {
    playSound("click");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCopyEmail = () => {
    playSound("success");
    navigator.clipboard.writeText("arjunsanesh@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <main className="hero-section" id="hero">
      <div className="hero-container">
        {/* Minimal Meta Tags */}
        <div className="hero-badge-wrap">
          <div className="minimal-status-pill">
            <span className="minimal-live-dot"></span>
            <span>Available for innovative projects & research</span>
          </div>
          <div className="minimal-dual-pill">
            <span>Linux Mint</span>
            <span className="pill-dot-sep">/</span>
            <span>Windows 11</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="hero-content">
          <span className="hero-eyebrow">ARJUN SANESH &bull; SIMPLICITY</span>
          <h1 className="hero-headline">
            Engineering at the intersection of <br />
            <span className="hero-headline-highlight">Software, Hardware & Curiosity.</span>
          </h1>

          {/* Minimalist Dynamic Role Box */}
          <div className="dynamic-role-box">
            <span className="role-prefix">&gt; </span>
            <span className="role-typed-text">{displayText}</span>
            <span className="cursor-blink">_</span>
          </div>

          <p className="hero-description">
            I don't believe in artificial silos between physical hardware and cloud software.
            Whether it's formulating multi-objective optimization algorithms, wiring laser tripwire perimeters on ESP32s,
            or building fast reactive web interfaces—I focus on tactile systems that solve real problems.
          </p>

          {/* Clean Minimal Actions */}
          <div className="hero-actions">
            <button
              type="button"
              className="btn-minimal-primary"
              onClick={() => scrollTo("work")}
            >
              <span>Selected Works</span>
              <span className="btn-arrow">→</span>
            </button>

            <button
              type="button"
              className="btn-minimal-secondary"
              onClick={() => scrollTo("hardware")}
            >
              <span>Hardware Lab</span>
            </button>

            <button
              type="button"
              className="btn-minimal-secondary"
              onClick={() => scrollTo("terminal")}
            >
              <span>Terminal CLI</span>
            </button>

            <button
              type="button"
              className={`btn-minimal-copy ${copiedEmail ? "copied" : ""}`}
              onClick={handleCopyEmail}
            >
              <span>{copiedEmail ? "✓ Copied" : "Copy Email"}</span>
            </button>
          </div>

          {/* Minimal Metrics Row */}
          <div className="hero-metrics-bar">
            <div className="hero-metric-item">
              <span className="metric-val">3+</span>
              <span className="metric-lbl">Years Building</span>
            </div>
            <div className="metric-sep"></div>
            <div className="hero-metric-item">
              <span className="metric-val">10+</span>
              <span className="metric-lbl">Systems Built</span>
            </div>
            <div className="metric-sep"></div>
            <div className="hero-metric-item">
              <span className="metric-val">2</span>
              <span className="metric-lbl">Research Papers</span>
            </div>
            <div className="metric-sep"></div>
            <div className="hero-socials-inline">
              <span className="socials-label">Profiles:</span>
              <div className="socials-group">
                <Socials
                  link="https://www.linkedin.com/in/arjun-sanesh/"
                  imgURL={linkedinIcon}
                  alt="LinkedIn"
                />
                <Socials
                  link="https://github.com/Simplicity005"
                  imgURL="https://cdn.simpleicons.org/github/white"
                  alt="GitHub"
                />
                <Socials
                  link="https://www.instagram.com"
                  imgURL={instagramIcon}
                  alt="Instagram"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
