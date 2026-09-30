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

const poshEase = [0.16, 1, 0.3, 1];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <motion.nav
        className="navbar-pill"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: poshEase }}
      >
        {/* Brand / Logo (Left column) */}
        <div className="nav-brand">
          <a
            href="/"
            onClick={(e) => scrollToSection(e, "hero")}
            className="brand-link"
            aria-label="Go to Top"
          >
            <motion.img
              src={logo}
              alt="Simplicity Logo"
              className="nav-brand-logo"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2, ease: poshEase }}
            />
            <span className="brand-name">Arjun Sanesh</span>
          </a>
        </div>

        {/* Desktop Navigation Links (Center column) */}
        <div className="nav-center-links">
          {desktopNavItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href.replace("#", ""))}
              className="nav-link-item"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18, ease: poshEase }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        {/* Right Actions - Contact CTA + Mobile Hamburger */}
        <div className="nav-right-actions">
          <motion.a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="nav-cta-btn"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18, ease: poshEase }}
          >
            Contact
          </motion.a>

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
      </motion.nav>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-drawer-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <motion.div
              className="mobile-drawer"
              onClick={(e) => e.stopPropagation()}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: poshEase }}
            >
              <div className="drawer-header">
                <span className="drawer-title">Navigation</span>
                <button
                  type="button"
                  className="drawer-close-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="drawer-links">
                {mobileNavItems.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href.replace("#", ""))}
                    className="drawer-link"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.25, ease: poshEase }}
                  >
                    {item.label}
                  </motion.a>
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
