import { useState, useEffect } from "react";
import logo from "../../assets/Logo.png";

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
      <nav className={`navbar-pill ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        {/* Brand / Logo */}
        <div className="nav-brand">
          <a
            href="/"
            onClick={(e) => scrollToSection(e, "hero")}
            className="brand-link"
            aria-label="Go to Top"
          >
            <img src={logo} alt="Simplicity Logo" className="nav-brand-logo" />
            <div className="brand-text">
              <span className="brand-name">Arjun Sanesh</span>
              <span className="brand-role">Simplicity</span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="nav-center-links">
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, "about")}
            className="nav-link-item"
          >
            About
          </a>
          <a
            href="#hardware"
            onClick={(e) => scrollToSection(e, "hardware")}
            className="nav-link-item"
          >
            Hardware Lab
          </a>
          <a
            href="#work"
            onClick={(e) => scrollToSection(e, "work")}
            className="nav-link-item"
          >
            Projects
          </a>
          <a
            href="#terminal"
            onClick={(e) => scrollToSection(e, "terminal")}
            className="nav-link-item"
          >
            Terminal
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="nav-link-item"
          >
            Contact
          </a>
        </div>

        {/* Right Action */}
        <div className="nav-right-actions">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="nav-cta-btn"
          >
            <span>Get in touch</span>
          </a>

          {/* Hamburger Icon for Mobile */}
          <button
            type="button"
            className="mobile-hamburger-btn"
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
      <div
        className={`mobile-drawer-backdrop ${isMobileMenuOpen ? "visible" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`mobile-drawer ${isMobileMenuOpen ? "drawer-open" : ""}`}
          onClick={(e) => e.stopPropagation()}
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
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "about")}
              className="drawer-link"
            >
              About
            </a>
            <a
              href="#hardware"
              onClick={(e) => scrollToSection(e, "hardware")}
              className="drawer-link"
            >
              Hardware Lab
            </a>
            <a
              href="#work"
              onClick={(e) => scrollToSection(e, "work")}
              className="drawer-link"
            >
              Projects
            </a>
            <a
              href="#terminal"
              onClick={(e) => scrollToSection(e, "terminal")}
              className="drawer-link"
            >
              Terminal
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="drawer-link"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
