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

const badgeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: poshEase,
    },
  },
};

const textFadeUpVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: poshEase,
    },
  },
};

const headlineLineVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: poshEase,
    },
  },
};

const metricsRowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.35,
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
        {/* Minimal Refined Status Badge */}
        <motion.div className="hero-badge-wrap" variants={badgeVariants}>
          <div className="hero-status-pill">
            <span className="status-live-dot"></span>
            <span>Available for engineering & hardware roles &bull; Bangalore</span>
          </div>
        </motion.div>

        {/* Hero Title & Lead with Staggered Line-by-Line Onload Text Reveals */}
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.08, delayChildren: 0.12 }}
        >
          <motion.span className="hero-eyebrow" variants={textFadeUpVariants}>
            ARJUN SANESH &bull; SIMPLICITY
          </motion.span>

          <h1 className="hero-headline">
            <motion.span className="headline-line" variants={headlineLineVariants}>
              Engineering at the intersection of
            </motion.span>
            <motion.span className="headline-line hero-headline-highlight" variants={headlineLineVariants}>
              Software, Hardware & Systems.
            </motion.span>
          </h1>

          <motion.p className="hero-lead-text" variants={textFadeUpVariants}>
            Building clean web applications, embedded firmware (ESP32/Arduino), and robotics. Dual-boot workflow on Linux Mint & Windows 11.
          </motion.p>

          {/* Minimalist Dynamic Role Box */}
          <motion.div className="dynamic-role-box" variants={textFadeUpVariants}>
            <span className="role-prefix">&gt; </span>
            <span className="role-typed-text">{displayText}</span>
            <span className="cursor-blink">_</span>
          </motion.div>

          {/* Clean Minimal Actions */}
          <motion.div className="hero-actions" variants={textFadeUpVariants}>
            <motion.button
              type="button"
              className="btn-minimal-primary"
              onClick={() => scrollTo("work")}
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2, ease: poshEase }}
            >
              <span>Selected Works</span>
              <span className="btn-arrow">→</span>
            </motion.button>

            <motion.button
              type="button"
              className="btn-minimal-secondary"
              onClick={() => scrollTo("terminal")}
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2, ease: poshEase }}
            >
              <span>Terminal CLI</span>
            </motion.button>

            <motion.button
              type="button"
              className={`btn-minimal-copy ${copiedEmail ? "copied" : ""}`}
              onClick={handleCopyEmail}
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2, ease: poshEase }}
            >
              <span>{copiedEmail ? "Copied" : "Copy Email"}</span>
            </motion.button>
          </motion.div>

          {/* Minimal Metrics Row */}
          <motion.div className="hero-metrics-bar" variants={metricsRowVariants}>
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
              <span className="metric-val">IoT & Web</span>
              <span className="metric-lbl">Core Focus</span>
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
                  alt="GitHub"
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" style={{ opacity: 0.85 }}>
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
        </motion.div>
      </motion.div>
    </main>
  );
}

export default Hero;
