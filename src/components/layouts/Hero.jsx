import { useState, useEffect } from "react";

const ROLES = [
  "Full-Stack Web Developer",
  "Hardware & Embedded Systems Hacker",
  "Microcontroller & IoT Developer",
  "Robotics & Sensor Systems Explorer",
  "Dual-Boot: Linux Mint + Windows 11",
];

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isNameHovered, setIsNameHovered] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const speed = isDeleting ? 25 : 50;

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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="hero-section" id="hero">
      <div className="hero-container">
        {/* Windows 98 / Retro Window */}
        <div className="neo-window hero-window">
          {/* Titlebar: main.exe without window controls */}
          <div className="neo-titlebar">
            <div className="neo-titlebar-left">
              <span className="neo-titlebar-icon">💻</span>
              <span className="neo-titlebar-text">main.exe</span>
            </div>
          </div>

          <div className="hero-window-inner">
            <div className="hero-content">
              {/* Front and Center Name with GitHub Hover Transformation */}
              <h1 className="hero-headline hero-name-heading">
                Hi! I am{" "}
                <a
                  href="https://github.com/Simplemindedmoron"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-name-link"
                  onMouseEnter={() => setIsNameHovered(true)}
                  onMouseLeave={() => setIsNameHovered(false)}
                  title="Visit GitHub @Simplemindedmoron"
                >
                  <span className="hero-name-text">
                    {isNameHovered ? "Simplemindedmoron" : "Arjun Sanesh"}
                  </span>
                  <span className="hero-name-arrow">↗</span>
                </a>
              </h1>

              {/* Short Bio */}
              <p className="hero-lead-text">
                Building responsive web platforms, microcontroller firmware (ESP32/Arduino), and robotics.
              </p>

              {/* Compact Typing Prompt */}
              <div className="neo-prompt-box">
                <span className="role-prefix">&gt; </span>
                <span className="role-typed-text">{displayText}</span>
                <span className="cursor-blink">_</span>
              </div>

              {/* Clean Action Buttons */}
              <div className="hero-actions">
                <button
                  type="button"
                  className="neo-btn neo-btn-teal"
                  onClick={() => scrollTo("work")}
                >
                  <span>Projects</span>
                  <span className="btn-arrow">→</span>
                </button>

                <button
                  type="button"
                  className="neo-btn neo-btn-amber"
                  onClick={() => scrollTo("terminal")}
                >
                  <span>Terminal CLI</span>
                  <span className="btn-arrow">&gt;_</span>
                </button>
              </div>

              {/* Proportional Metrics Bar */}
              <div className="hero-metrics-bar">
                <div className="hero-metric-item">
                  <span className="metric-val">3+</span>
                  <span className="metric-lbl">Years Building</span>
                </div>
                <div className="hero-metric-item">
                  <span className="metric-val">10+</span>
                  <span className="metric-lbl">Systems Built</span>
                </div>
                <div className="hero-metric-item">
                  <span className="metric-val">IoT &amp; Web</span>
                  <span className="metric-lbl">Core Focus</span>
                </div>
                <div className="hero-metric-item social-metric-item">
                  <span className="metric-lbl">Links</span>
                  <div className="hero-social-strip">
                    <a
                      href="https://github.com/Simplemindedmoron"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-social-pill"
                      title="GitHub: @Simplemindedmoron"
                      aria-label="GitHub Profile"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/arjun-sanesh/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-social-pill"
                      title="LinkedIn: Arjun Sanesh"
                      aria-label="LinkedIn Profile"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;

