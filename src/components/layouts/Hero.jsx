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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 18,
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
        {/* Minimal Meta Tags */}
        <motion.div className="hero-badge-wrap" variants={itemVariants}>
          <div className="minimal-status-pill">
            <span className="minimal-live-dot"></span>
            <span>Available for engineering & hardware roles</span>
          </div>
          <div className="minimal-dual-pill">
            <span>Linux Mint</span>
            <span className="pill-dot-sep">/</span>
            <span>Windows 11</span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <div className="hero-content">
          <motion.span className="hero-eyebrow" variants={itemVariants}>
            ARJUN SANESH &bull; SIMPLICITY
          </motion.span>

          <motion.h1 className="hero-headline" variants={itemVariants}>
            Engineering at the intersection of <br />
            <span className="hero-headline-highlight">Software, Hardware & Systems.</span>
          </motion.h1>

          {/* Minimalist Dynamic Role Box */}
          <motion.div className="dynamic-role-box" variants={itemVariants}>
            <span className="role-prefix">&gt; </span>
            <span className="role-typed-text">{displayText}</span>
            <span className="cursor-blink">_</span>
          </motion.div>

          <motion.p className="hero-description" variants={itemVariants}>
            Building systems across both hardware and software.
            From wiring laser security tripwires on ESP32s and tuning ultrasonic distance logic to developing
            fast reactive web applications in React and ROS 2 robotics nodes on Linux.
          </motion.p>

          {/* Clean Minimal Actions */}
          <motion.div className="hero-actions" variants={itemVariants}>
            <motion.button
              type="button"
              className="btn-minimal-primary"
              onClick={() => scrollTo("work")}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
            >
              <span>Selected Works</span>
              <span className="btn-arrow">→</span>
            </motion.button>

            <motion.button
              type="button"
              className="btn-minimal-secondary"
              onClick={() => scrollTo("terminal")}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
            >
              <span>Terminal CLI</span>
            </motion.button>

            <motion.button
              type="button"
              className={`btn-minimal-copy ${copiedEmail ? "copied" : ""}`}
              onClick={handleCopyEmail}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
            >
              <span>{copiedEmail ? "Copied" : "Copy Email"}</span>
            </motion.button>
          </motion.div>

          {/* Minimal Metrics Row */}
          <motion.div className="hero-metrics-bar" variants={itemVariants}>
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
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}

export default Hero;
