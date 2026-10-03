import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Socials from "../ui/Socials";
import linkedinIcon from "../../assets/images/linkedin.png";
import instagramIcon from "../../assets/images/instagram.png";

const ROLES = [
  "Full-Stack Web Developer",
  "Hardware & Embedded Systems Hacker",
  "Microcontroller & IoT Developer",
  "Robotics & Sensor Systems Explorer",
  "Dual-Boot Workflow (Linux Mint + Windows 11)",
];

const poshEase = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const textFadeUpVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: poshEase,
    },
  },
};

const headlineLineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: poshEase,
    },
  },
};

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("arjunsanesh@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <main className="hero-section" id="hero">
      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Windows 98 / Neo-Brutalist Main App Window */}
        <div className="neo-window hero-window">
          {/* Windows 98 Titlebar */}
          <div className="neo-titlebar">
            <div className="neo-titlebar-left">
              <span className="neo-titlebar-icon">💻</span>
              <span className="neo-titlebar-text">SIMPLICITY_OS // ARJUN_SANESH.EXE</span>
            </div>
            <div className="neo-titlebar-controls">
              <span className="neo-win-btn" title="Minimize">_</span>
              <span className="neo-win-btn" title="Maximize">□</span>
              <span className="neo-win-btn close" title="Close">✕</span>
            </div>
          </div>

          <div className="hero-window-inner">
            {/* Top Status & System Kicker */}
            <motion.div className="hero-badge-wrap" variants={textFadeUpVariants}>
              <div className="neo-badge neo-badge-yellow">
                <span className="badge-bullet">★</span>
                <span>SYSTEM VERSION 98.4 &bull; BOLD. LOUD. SYSTEMATIC. USABLE.</span>
              </div>
              <div className="neo-badge neo-badge-lime">
                <span className="status-live-dot"></span>
                <span>AVAILABLE FOR ENGINEERING ROLES</span>
              </div>
            </motion.div>

            {/* Hero Title & Lead with Staggered Line-by-Line Onload Text Reveals */}
            <div className="hero-content">
              <motion.div className="hero-eyebrow-chip" variants={textFadeUpVariants}>
                <span>ARJUN SANESH</span>
                <span className="chip-sep">//</span>
                <span>BANGALORE, INDIA</span>
              </motion.div>

              <h1 className="hero-headline">
                <motion.span className="headline-line" variants={headlineLineVariants}>
                  Engineering at the intersection of
                </motion.span>
                <motion.span className="headline-line hero-headline-highlight" variants={headlineLineVariants}>
                  Software, Hardware & Systems.
                </motion.span>
              </h1>

              <motion.p className="hero-lead-text" variants={textFadeUpVariants}>
                Developing ultra-fast web architectures, microcontroller firmware (ESP32/Arduino), and robotics pipelines. Dual-boot workflow on Linux Mint & Windows 11.
              </motion.p>

              {/* Neo-Brutalist Command Snippet Box with Typewriter Animation */}
              <motion.div className="neo-prompt-box" variants={textFadeUpVariants}>
                <div className="prompt-header">
                  <span className="prompt-title">C:\WIN98\SYSTEM&gt; role --active</span>
                  <span className="prompt-status">[RUNNING]</span>
                </div>
                <div className="prompt-body">
                  <span className="role-prefix">&gt; </span>
                  <span className="role-typed-text">{displayText}</span>
                  <span className="cursor-blink">_</span>
                </div>
              </motion.div>

              {/* Neo-Brutalist Solid Accent Action Buttons */}
              <motion.div className="hero-actions" variants={textFadeUpVariants}>
                <button
                  type="button"
                  className="neo-btn neo-btn-teal"
                  onClick={() => scrollTo("work")}
                >
                  <span>Selected Works</span>
                  <span className="btn-arrow">→</span>
                </button>

                <button
                  type="button"
                  className="neo-btn neo-btn-yellow"
                  onClick={() => scrollTo("terminal")}
                >
                  <span>Terminal CLI</span>
                  <span className="btn-arrow">&gt;_</span>
                </button>

                <button
                  type="button"
                  className={`neo-btn ${copiedEmail ? "neo-btn-lime" : "neo-btn-magenta"}`}
                  onClick={handleCopyEmail}
                >
                  <span>{copiedEmail ? "Copied to Clipboard!" : "Copy Email"}</span>
                  <span className="btn-arrow">{copiedEmail ? "✓" : "📋"}</span>
                </button>
              </motion.div>

              {/* Vintage Windows 98 / Neo-Brutalist Metrics Strip */}
              <motion.div className="hero-metrics-bar" variants={textFadeUpVariants}>
                <div className="hero-metric-item">
                  <span className="metric-val">3+</span>
                  <span className="metric-lbl">Years Building</span>
                </div>
                <div className="hero-metric-item">
                  <span className="metric-val">10+</span>
                  <span className="metric-lbl">Systems Built</span>
                </div>
                <div className="hero-metric-item">
                  <span className="metric-val">IoT & Web</span>
                  <span className="metric-lbl">Core Focus</span>
                </div>
                <div className="hero-metric-item social-metric-item">
                  <span className="metric-lbl">Social Channels</span>
                  <div className="socials-group">
                    <Socials
                      link="https://www.linkedin.com/in/arjun-sanesh/"
                      imgURL={linkedinIcon}
                      alt="LinkedIn"
                    />
                    <Socials
                      link="https://github.com/Simplicity005"
                      alt="GitHub"
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.02 11.02 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                      </svg>
                    </Socials>
                    <Socials
                      link="https://www.instagram.com"
                      imgURL={instagramIcon}
                      alt="Instagram"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Windows 98 Bottom Status Bar */}
          <div className="neo-statusbar">
            <span className="statusbar-item">STATUS: READY</span>
            <span className="statusbar-item">MEM: 64MB OK</span>
            <span className="statusbar-item">PORT: 5173</span>
            <span className="statusbar-item statusbar-fill">DUAL-BOOT: LINUX MINT + WIN11</span>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default Hero;
