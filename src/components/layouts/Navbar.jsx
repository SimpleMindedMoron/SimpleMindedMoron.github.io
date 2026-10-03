import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "../../assets/Logo.png";

const desktopNavItems = [
  { label: "About.exe", href: "#about", icon: "📁" },
  { label: "Works.sys", href: "#work", icon: "💾" },
  { label: "Terminal.bat", href: "#terminal", icon: "📟" },
];

const mobileNavItems = [
  { label: "About.exe", href: "#about", icon: "📁" },
  { label: "Works.sys", href: "#work", icon: "💾" },
  { label: "Terminal.bat", href: "#terminal", icon: "📟" },
  { label: "Contact.txt", href: "#contact", icon: "✉" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio-theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "paper" : "dark"));
  };

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? "is-scrolled" : ""}`} id="main-nav">
      <nav className="navbar-pill">
        {/* Brand / Logo (Left column styled as Windows 98 Start Badge) */}
        <div className="nav-brand">
          <a
            href="/"
            onClick={(e) => scrollToSection(e, "hero")}
            className="brand-link"
            aria-label="Go to Top"
          >
            <div className="nav-start-chip">
              <span className="start-icon">🖥️</span>
              <span className="start-label">SIMPLICITY.98</span>
            </div>
            <img
              src={logo}
              alt="Simplicity Logo"
              className="nav-brand-logo"
            />
            <span className="brand-name">Arjun Sanesh</span>
          </a>
        </div>

        {/* Desktop Navigation Links (Center column) */}
        <div className="nav-center-links">
          {desktopNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href.replace("#", ""))}
              className="nav-link-item"
            >
              <span className="nav-item-icon">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Right Actions: Theme Toggle, Clock, Contact CTA & Mobile Hamburger */}
        <div className="nav-right-actions">
          {/* Theme Mode Toggle (Cyber 98 Dark vs Paper Beige) */}
          <button
            type="button"
            className="nav-theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to Paper Beige Vintage Theme" : "Switch to Cyber 98 Dark Theme"}
            aria-label="Toggle Theme"
          >
            <span className="theme-toggle-icon">{theme === "dark" ? "☀" : "☾"}</span>
            <span className="theme-toggle-text">{theme === "dark" ? "PAPER" : "DARK"}</span>
          </button>

          {/* Windows 98 Style Live System Clock */}
          <div className="nav-system-tray" title="System Time (Local)">
            <span className="tray-time">{currentTime || "12:00 PM"}</span>
          </div>

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="nav-cta-btn"
          >
            <span>Contact</span>
            <span className="cta-arrow">✉</span>
          </a>

          <button
            type="button"
            className={`mobile-hamburger-btn ${isMobileMenuOpen ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className={`hamburger-bar ${isMobileMenuOpen ? "top-open" : ""}`}></span>
            <span className={`hamburger-bar ${isMobileMenuOpen ? "mid-open" : ""}`}></span>
            <span className={`hamburger-bar ${isMobileMenuOpen ? "bot-open" : ""}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-drawer-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="mobile-drawer"
              onClick={(e) => e.stopPropagation()}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="drawer-header">
                <div className="drawer-title-wrap">
                  <span className="drawer-icon">💾</span>
                  <span className="drawer-title">SYSTEM_MENU.EXE</span>
                </div>
                <button
                  type="button"
                  className="drawer-close-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* Theme toggle inside mobile drawer */}
              <div className="drawer-theme-strip">
                <button
                  type="button"
                  className="drawer-theme-toggle"
                  onClick={toggleTheme}
                >
                  <span>THEME: {theme === "dark" ? "CYBER 98 (DARK)" : "PAPER BEIGE (RETRO)"}</span>
                  <span className="drawer-toggle-badge">{theme === "dark" ? "SWITCH TO BEIGE" : "SWITCH TO DARK"}</span>
                </button>
              </div>

              <div className="drawer-links">
                {mobileNavItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href.replace("#", ""))}
                    className="drawer-link"
                  >
                    <span className="drawer-link-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>

              <div className="drawer-footer-tray">
                <span>SIMPLICITY_OS 98.4</span>
                <span>{currentTime}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
