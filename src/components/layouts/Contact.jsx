import { useState, useEffect } from "react";
import linkedinIcon from "../../assets/images/linkedin.png";
import instagramIcon from "../../assets/images/instagram.png";

const PRESET_TOPICS = [
  "Software & Web Roles",
  "Hardware & Embedded Systems",
  "Robotics & Automation",
  "General Inquiries",
];

function Contact() {
  const [selectedTopic, setSelectedTopic] = useState(PRESET_TOPICS[0]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(istString);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

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
    }, 600);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="neo-badge neo-badge-yellow">
            <span className="badge-bullet">■</span>
            <span>FEEDBACK & TRANSMISSION // 04</span>
          </div>
          <h2 className="section-heading">
            Connect & <br />
            <span>Collaboration.</span>
          </h2>
          <p className="section-subtext">
            For software development roles, hardware prototyping, or embedded systems discussions.
          </p>
        </div>

        {/* Windows 98 / Neo-Brutalist Mail Composer Window */}
        <div className="neo-window contact-window">
          {/* Windows 98 Titlebar */}
          <div className="neo-titlebar">
            <div className="neo-titlebar-left">
              <span className="neo-titlebar-icon">✉</span>
              <span className="neo-titlebar-text">OUTLOOK_EXPRESS.MSG // TRANSMISSION_PROTOCOL</span>
            </div>
            <div className="neo-titlebar-controls">
              <span className="neo-win-btn">_</span>
              <span className="neo-win-btn">□</span>
              <span className="neo-win-btn close">✕</span>
            </div>
          </div>

          <div className="contact-window-content">
            <div className="contact-layout-grid">
              {/* Left Column: Direct Info & Socials */}
              <div className="contact-info-panel">
                <div className="neo-box info-status-box">
                  <div className="info-header-row">
                    <span className="info-title-badge">DISPATCH STATUS</span>
                    <div className="ist-time-pill">
                      <span className="pulsing-emerald">●</span>
                      <span>IST: {currentTime || "19:30:00"}</span>
                    </div>
                  </div>
                  <p className="info-desc">
                    Based in Bangalore, India. Actively exploring engineering positions, contract hardware prototyping, and performant web platform engineering.
                  </p>
                </div>

                {/* Email Direct Box */}
                <div className="neo-box email-copy-panel">
                  <span className="email-label">DIRECT INBOX:</span>
                  <div className="email-box">
                    <span className="email-text">arjunsanesh@gmail.com</span>
                    <button
                      type="button"
                      className={`neo-btn neo-btn-sm ${copiedEmail ? "neo-btn-lime" : "neo-btn-teal"}`}
                      onClick={handleCopy}
                    >
                      {copiedEmail ? "COPIED ✓" : "COPY"}
                    </button>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="neo-box social-links-panel">
                  <span className="social-links-label">DIRECT NETWORK PROFILES:</span>
                  <div className="social-buttons-list">
                    <a
                      href="https://www.linkedin.com/in/arjun-sanesh/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-social-btn"
                    >
                      <img src={linkedinIcon} alt="LinkedIn" className="social-btn-icon" />
                      <div className="social-btn-info">
                        <span className="social-name">LINKEDIN</span>
                        <span className="social-handle">/in/arjun-sanesh ↗</span>
                      </div>
                    </a>

                    <a
                      href="https://github.com/Simplicity005"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-social-btn"
                    >
                      <div className="social-svg-wrap">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.02 11.02 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                        </svg>
                      </div>
                      <div className="social-btn-info">
                        <span className="social-name">GITHUB</span>
                        <span className="social-handle">@Simplicity005 ↗</span>
                      </div>
                    </a>

                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-social-btn"
                    >
                      <img src={instagramIcon} alt="Instagram" className="social-btn-icon" />
                      <div className="social-btn-info">
                        <span className="social-name">INSTAGRAM</span>
                        <span className="social-handle">@simplicity ↗</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Direct Transmission Form */}
              <div className="contact-form-panel">
                <div className="neo-box form-card-box">
                  <span className="form-card-title">SEND DIRECT TRANSMISSION:</span>

                  {isSent ? (
                    <div className="form-sent-notification">
                      <div className="sent-badge">
                        <span>✓ TRANSMISSION DELIVERED</span>
                      </div>
                      <h4 className="sent-heading">Message Sent to Arjun</h4>
                      <p className="sent-desc">
                        Your packet was dispatched. I typically respond within 24 hours.
                      </p>
                      <button
                        type="button"
                        className="neo-btn neo-btn-teal"
                        onClick={() => setIsSent(false)}
                      >
                        COMPOSE ANOTHER PACKET
                      </button>
                    </div>
                  ) : (
                    <form className="contact-form-element" onSubmit={handleSubmit}>
                      {/* Topic Selector Chips */}
                      <div className="form-group-block">
                        <label className="neo-form-label">
                          SELECT TOPIC CATEGORY:
                        </label>
                        <div className="topic-chips-grid">
                          {PRESET_TOPICS.map((topic) => {
                            const isSelected = selectedTopic === topic;
                            return (
                              <button
                                key={topic}
                                type="button"
                                className={`neo-topic-btn ${isSelected ? "active" : ""}`}
                                onClick={() => setSelectedTopic(topic)}
                              >
                                <span className="topic-indicator">{isSelected ? "●" : "○"}</span>
                                <span>{topic}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Name & Email Inputs */}
                      <div className="form-row-grid">
                        <div className="form-group-block">
                          <label className="neo-form-label" htmlFor="contact-name">
                            SENDER NAME:
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            className="neo-input"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                        </div>

                        <div className="form-group-block">
                          <label className="neo-form-label" htmlFor="contact-email">
                            SENDER EMAIL:
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            required
                            className="neo-input"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      {/* Message Input */}
                      <div className="form-group-block">
                        <label className="neo-form-label" htmlFor="contact-message">
                          TRANSMISSION PAYLOAD:
                        </label>
                        <textarea
                          id="contact-message"
                          required
                          rows="4"
                          className="neo-textarea"
                          placeholder="Describe role requirements, project specs, or inquiry details..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="neo-btn neo-btn-teal neo-submit-btn"
                      >
                        <span>{isSubmitting ? "TRANSMITTING..." : "DISPATCH TRANSMISSION"}</span>
                        <span className="btn-arrow">✉→</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Windows 98 Status Bar */}
          <div className="neo-statusbar">
            <span className="statusbar-item">PROTOCOL: SMTP/25</span>
            <span className="statusbar-item">ENCRYPTION: TLS 1.3</span>
            <span className="statusbar-item statusbar-fill">READY TO DISPATCH</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
