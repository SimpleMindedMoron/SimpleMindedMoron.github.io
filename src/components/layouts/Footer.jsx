import logo from "../../assets/Logo.png";

const navigationLinks = [
  { label: "About", href: "#about" },
  { label: "Selected Works", href: "#work" },
  { label: "Terminal CLI", href: "#terminal" },
  { label: "Contact", href: "#contact" },
];

const profileLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arjun-sanesh/" },
  { label: "GitHub", href: "https://github.com/Simplicity005" },
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "Email", href: "mailto:arjunsanesh@gmail.com" },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner-content">
        <div className="footer-main-row">
          {/* Brand Info */}
          <div className="footer-brand-column">
            <div className="footer-brand-header">
              <img src={logo} alt="Simplicity Logo" className="footer-brand-logo" />
              <div>
                <span className="footer-brand-name">Arjun Sanesh</span>
                <span className="footer-brand-handle">@Simplicity005</span>
              </div>
            </div>
            <p className="footer-brand-bio">
              Software and embedded systems engineer based in Bangalore, India. Focused on performant web architectures and microcontroller hardware.
            </p>
            <div className="footer-os-tag">
              <span>Dual-Boot: Linux Mint + Windows 11</span>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="footer-links-column">
            <span className="footer-column-heading">INDEX</span>
            <ul className="footer-links-list">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-nav-anchor"
                    onClick={(e) => scrollTo(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Profiles Column */}
          <div className="footer-links-column">
            <span className="footer-column-heading">CONNECT</span>
            <ul className="footer-links-list">
              {profileLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-nav-anchor"
                  >
                    <span>{link.label}</span>
                    <span className="link-arrow-icon">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Sub-Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright-wrap">
            <span>&copy; {currentYear} Arjun Sanesh. Built for simplicity and speed.</span>
          </div>

          <button
            type="button"
            className="footer-top-btn"
            onClick={(e) => scrollTo(e, "#hero")}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <span className="top-arrow-icon">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
