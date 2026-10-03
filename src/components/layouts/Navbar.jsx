import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "../../assets/Logo.png";

const desktopNavItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Terminal", href: "#terminal" },
];

const mobileNavItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Terminal", href: "#terminal" },
  { label: "Contact", href: "#contact" },
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
        {/* Brand: Logo Only */}
        <div className="nav-brand">
          <a
            href="/"
            onClick={(e) => scrollToSection(e, "hero")}
            className="brand-link"
            aria-label="Home"
            title="Arjun Sanesh Portfolio"
          >
            <img src={logo} alt="Logo" className="nav-brand-logo" />
          </a>
        </div>

        {/* Center Links (Uniform Size) */}
        <div className="nav-center-links">
          {desktopNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href.replace("#", ""))}
              className="nav-link-item nav-btn-uniform"
            >
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Right Actions (Uniform Size) */}
        <div className="nav-right-actions">
          {/* Theme Mode Toggle (No emojis, crisp vector icon) */}
          <button
            type="button"
            className="nav-theme-toggle-btn nav-btn-uniform"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
            <span className="theme-toggle-label">{theme === "dark" ? "LIGHT" : "DARK"}</span>
          </button>

          {/* Clock */}
          <div className="nav-system-tray" title="System Time">
            <span className="tray-time">{currentTime || "12:00 PM"}</span>
          </div>

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="nav-cta-btn nav-btn-uniform"
          >
            Contact
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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-drawer-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="mobile-drawer"
              onClick={(e) => e.stopPropagation()}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.2 }}
            >
              <div className="drawer-header">
                <span className="drawer-title">MENU</span>
                <button
                  type="button"
                  className="drawer-close-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className="drawer-theme-strip">
                <button
                  type="button"
                  className="drawer-theme-toggle"
                  onClick={toggleTheme}
                >
                  <span>THEME: {theme === "dark" ? "DARK" : "LIGHT"}</span>
                  <span className="drawer-toggle-badge">TOGGLE</span>
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
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
