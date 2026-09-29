import logo from "../../assets/Logo.png";

const footerLinks = [
  { label: "Top", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Hardware Lab", href: "#hardware" },
  { label: "Projects", href: "#work" },
  { label: "Terminal", href: "#terminal" },
  { label: "Contact", href: "#contact" },
];

function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top-row">
          {/* Brand */}
          <div className="footer-brand-block">
            <div className="footer-brand-title-wrap">
              <img src={logo} alt="Simplicity Logo" className="footer-brand-logo" />
              <div>
                <h4 className="footer-brand-name">Arjun Sanesh</h4>
                <span className="footer-brand-sub">Simplicity &bull; Software & Embedded Systems</span>
              </div>
            </div>
            <p className="footer-bio-summary">
              Full-stack web applications, embedded microcontroller systems, and robotics.
            </p>
            <div className="footer-pill-os">
              <span>Linux Mint + Windows 11</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="footer-links-group">
            <span className="footer-group-label">NAVIGATION</span>
            <div className="footer-nav-list">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-link-text"
                  onClick={(e) => scrollTo(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="footer-links-group">
            <span className="footer-group-label">PROFILES</span>
            <div className="footer-nav-list">
              <a
                href="https://www.linkedin.com/in/arjun-sanesh/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link-text"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/Simplicity005"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link-text"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link-text"
              >
                Instagram ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright-text">
            &copy; {year} Arjun Sanesh.
          </p>

          <button
            type="button"
            className="footer-back-to-top"
            onClick={(e) => scrollTo(e, "#hero")}
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
