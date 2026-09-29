import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "../../assets/Logo.png";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Terminal", href: "#terminal" },
  { label: "Contact", href: "#contact" },
];

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
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
      >
        {/* Brand / Logo */}
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
              whileHover={{ rotate: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            />
            <div className="brand-text">
              <span className="brand-name">Arjun Sanesh</span>
              <span className="brand-role">Simplicity</span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="nav-center-links">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href.replace("#", ""))}
              className="nav-link-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        {/* Right Actions - Mobile Hamburger */}
        <div className="nav-right-actions">
          <motion.button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            whileTap={{ scale: 0.9 }}
          >
            <span className={`hamburger-bar ${isMobileMenuOpen ? "top-open" : ""}`}></span>
            <span className={`hamburger-bar ${isMobileMenuOpen ? "mid-open" : ""}`}></span>
            <span className={`hamburger-bar ${isMobileMenuOpen ? "bot-open" : ""}`}></span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-drawer-backdrop visible"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="mobile-drawer drawer-open"
              onClick={(e) => e.stopPropagation()}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
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
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href.replace("#", ""))}
                    className="drawer-link"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, type: "spring", stiffness: 200, damping: 20 }}
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
