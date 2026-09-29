import { useState, useEffect } from "react";
import logo from "../../assets/Logo.png";
import { isAudioMuted, toggleAudioMute, playSound } from "../../utils/audio";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [muted, setMuted] = useState(isAudioMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleSoundToggle = (e) => {
      setMuted(e.detail.muted);
    };
    window.addEventListener("simplicity-sound-toggle", handleSoundToggle);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("simplicity-sound-toggle", handleSoundToggle);
    };
  }, []);

  const handleMuteToggle = () => {
    const newMuted = toggleAudioMute();
    setMuted(newMuted);
    if (!newMuted) {
      playSound("click");
    }
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    playSound("click");
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`navbar-wrapper ${isScrolled ? "is-scrolled" : ""}`}
      id="main-nav"
    >
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
            CLI Terminal
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="nav-link-item"
          >
            Contact
          </a>
        </div>

        {/* Right Action Icons & Buttons */}
        <div className="nav-right-actions">
          {/* Sound FX Toggle */}
          <button
            type="button"
            className={`sound-toggle-btn ${muted ? "muted" : "active"}`}
            onClick={handleMuteToggle}
            title={muted ? "Sound Muted (Click to Enable)" : "Sound Active (Click to Mute)"}
            aria-label="Toggle UI Sound Effects"
          >
            {muted ? (
              <span className="sound-icon">🔇</span>
            ) : (
              <div className="sound-waves">
                <span className="wave-bar bar-1"></span>
                <span className="wave-bar bar-2"></span>
                <span className="wave-bar bar-3"></span>
              </div>
            )}
            <span className="sound-label">{muted ? "Mute" : "Audio FX"}</span>
          </button>

          {/* Quick CTA */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="nav-cta-btn"
          >
            <span>Let's Talk</span>
          </a>

          {/* Hamburger Icon */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => {
              playSound("click");
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-label="Toggle Navigation Menu"
          >
            <span className={`hamburger-bar ${isMobileMenuOpen ? "top-open" : ""}`}></span>
            <span className={`hamburger-bar ${isMobileMenuOpen ? "mid-open" : ""}`}></span>
            <span className={`hamburger-bar ${isMobileMenuOpen ? "bot-open" : ""}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop & Drawer */}
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
            >
              ✕
            </button>
          </div>
          <div className="drawer-links">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "about")}
              className="drawer-link"
            >
              👤 About Philosophy
            </a>
            <a
              href="#hardware"
              onClick={(e) => scrollToSection(e, "hardware")}
              className="drawer-link"
            >
              ⚡ Hardware & Sensors Lab
            </a>
            <a
              href="#work"
              onClick={(e) => scrollToSection(e, "work")}
              className="drawer-link"
            >
              🚀 Selected Works
            </a>
            <a
              href="#terminal"
              onClick={(e) => scrollToSection(e, "terminal")}
              className="drawer-link"
            >
              💻 Interactive CLI
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="drawer-link"
            >
              📬 Direct Contact
            </a>
          </div>

          <div className="drawer-footer">
            <button
              type="button"
              className="drawer-sound-btn"
              onClick={handleMuteToggle}
            >
              <span>{muted ? "🔇 Sound Effects: OFF" : "🔊 Sound Effects: ON"}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
