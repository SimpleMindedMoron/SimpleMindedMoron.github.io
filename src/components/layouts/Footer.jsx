import { motion } from "motion/react";
import logoLight from "../../assets/images/logo.svg";
import logoDark from "../../assets/images/logo-dark.svg";

const contactLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arjun-sanesh/",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/Simplemindedmoron",
    icon: "github",
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-container" id="site-footer">
      <motion.div
        className="neo-window footer-neo-window"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo-badge">
                <img src={logoLight} alt="Arjun Sanesh logo" className="footer-logo footer-logo-light" />
                <img src={logoDark} alt="Arjun Sanesh logo" className="footer-logo footer-logo-dark" />
              </div>
              <div className="footer-brand-meta">
                <span className="footer-brand-title">Arjun Sanesh</span>
                <span className="footer-brand-sub">Software &amp; Embedded Systems</span>
              </div>
            </div>

            <div className="footer-contact-list">
              {contactLinks.map((link) => (
                <a
                  href={link.href}
                  key={link.label}
                  className="footer-contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{link.label} ↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              &copy; {year} Arjun Sanesh. Built for high utility &amp; performance.
            </p>
            <button
              type="button"
              className="neo-btn neo-btn-sm neo-btn-outline back-to-top"
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
            >
              <span>Back to top ↑</span>
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;
