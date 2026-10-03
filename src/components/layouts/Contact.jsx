import { useState } from "react";
import linkedinIcon from "../../assets/images/linkedin.png";
import instagramIcon from "../../assets/images/instagram.png";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("arjunsanesh@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: "", email: "", message: "" });
    }, 500);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="section-header-block">
          <span className="section-kicker">04 // CONNECT</span>
          <h2 className="section-heading">
            Get in <span>Touch.</span>
          </h2>
        </div>

        <div className="neo-window contact-window">
          <div className="neo-titlebar">
            <div className="neo-titlebar-left">
              <span className="neo-titlebar-icon">✉</span>
              <span className="neo-titlebar-text">MESSAGE_DISPATCH // CONTACT</span>
            </div>
            <div className="neo-titlebar-controls">
              <span className="neo-win-btn">_</span>
              <span className="neo-win-btn">□</span>
              <span className="neo-win-btn close">✕</span>
            </div>
          </div>

          <div className="contact-window-content">
            <div className="contact-layout-grid">
              {/* Left Column: Direct Info */}
              <div className="contact-info-panel">
                <div className="neo-box info-status-box">
                  <span className="info-title-badge">DIRECT CONTACT</span>
                  <p className="info-desc">
                    Based in Bangalore, India. Available for engineering roles, embedded systems, and performant web platform builds.
                  </p>

                  <div className="email-box">
                    <span className="email-text">arjunsanesh@gmail.com</span>
                    <button
                      type="button"
                      className="neo-btn neo-btn-sm neo-btn-teal"
                      onClick={handleCopy}
                    >
                      {copiedEmail ? "Copied ✓" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="neo-box social-links-panel">
                  <span className="social-links-label">PROFILES</span>
                  <div className="social-buttons-list">
                    <a
                      href="https://www.linkedin.com/in/arjun-sanesh/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-social-btn"
                    >
                      <img src={linkedinIcon} alt="LinkedIn" className="social-btn-icon" />
                      <span>LinkedIn ↗</span>
                    </a>

                    <a
                      href="https://github.com/Simplicity005"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-social-btn"
                    >
                      <div className="social-svg-wrap">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.02 11.02 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                        </svg>
                      </div>
                      <span>GitHub ↗</span>
                    </a>

                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-social-btn"
                    >
                      <img src={instagramIcon} alt="Instagram" className="social-btn-icon" />
                      <span>Instagram ↗</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean Form */}
              <div className="contact-form-panel">
                <div className="neo-box form-card-box">
                  {isSent ? (
                    <div className="form-sent-notification">
                      <h4 className="sent-heading">Message Sent ✓</h4>
                      <p className="sent-desc">
                        Thanks for reaching out. I'll get back to you soon.
                      </p>
                      <button
                        type="button"
                        className="neo-btn neo-btn-teal"
                        onClick={() => setIsSent(false)}
                      >
                        Send Another
                      </button>
                    </div>
                  ) : (
                    <form className="contact-form-element" onSubmit={handleSubmit}>
                      <div className="form-group-block">
                        <label className="neo-form-label" htmlFor="contact-name">
                          NAME:
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          className="neo-input"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group-block">
                        <label className="neo-form-label" htmlFor="contact-email">
                          EMAIL:
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          className="neo-input"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group-block">
                        <label className="neo-form-label" htmlFor="contact-message">
                          MESSAGE:
                        </label>
                        <textarea
                          id="contact-message"
                          required
                          rows="3"
                          className="neo-textarea"
                          placeholder="Brief message or inquiry..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="neo-btn neo-btn-teal neo-submit-btn"
                      >
                        <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                        <span>→</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
