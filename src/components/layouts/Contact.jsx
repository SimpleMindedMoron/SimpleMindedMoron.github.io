import { useState, useEffect } from "react";
import { playSound } from "../../utils/audio";
import linkedinIcon from "../../assets/images/linkedin.png";
import instagramIcon from "../../assets/images/instagram.png";

const PRESET_TOPICS = [
  "💼 Project or Role Offer",
  "⚡ Hardware & IoT Collaboration",
  "📐 Stochastic / Math Research",
  "☕ Quick Tech Chat",
];

function Contact() {
  const [selectedTopic, setSelectedTopic] = useState(PRESET_TOPICS[0]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Update Bangalore local time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST
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
    playSound("success");
    navigator.clipboard.writeText("arjunsanesh@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playSound("success");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-pill">
            <span className="pill-dot emerald"></span>
            <span>GET IN TOUCH & CONNECT</span>
          </div>
          <h2 className="section-heading">
            Let's Build Something <br />
            <span className="gradient-text-emerald">Extraordinary Together.</span>
          </h2>
          <p className="section-subtext">
            Whether you want to discuss a full-stack engineering role, an IoT embedded prototype,
            or combinatorial optimization research—my inbox is always open.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="contact-layout-grid">
          {/* Left Column: Direct Info & Socials */}
          <div className="contact-info-card">
            <div className="info-header">
              <span className="info-title">Location & Availability</span>
              <div className="ist-time-pill">
                <span className="pulsing-emerald"></span>
                <span>Bangalore (IST) : {currentTime || "19:30:00"}</span>
              </div>
            </div>

            <p className="info-desc">
              Currently based in Bangalore, India. Actively seeking innovative opportunities,
              collaborations, and cutting-edge software / hardware problems to conquer.
            </p>

            <div className="email-copy-panel">
              <span className="email-label">DIRECT EMAIL ADDRESS</span>
              <div className="email-box">
                <span className="email-text">arjunsanesh@gmail.com</span>
                <button
                  type="button"
                  className={`copy-btn ${copiedEmail ? "copied" : ""}`}
                  onClick={handleCopy}
                  aria-label="Copy email address"
                >
                  {copiedEmail ? "✓ Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Social channels */}
            <div className="social-links-panel">
              <span className="social-links-label">VERIFIED PROFILES</span>
              <div className="social-buttons-list">
                <a
                  href="https://www.linkedin.com/in/arjun-sanesh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn-card"
                  onClick={() => playSound("click")}
                >
                  <img src={linkedinIcon} alt="LinkedIn" className="social-btn-icon" />
                  <div className="social-btn-info">
                    <span className="social-name">LinkedIn</span>
                    <span className="social-handle">arjun-sanesh</span>
                  </div>
                  <span className="social-arrow">↗</span>
                </a>

                <a
                  href="https://github.com/Simplicity005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn-card"
                  onClick={() => playSound("click")}
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.02 11.02 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                  </svg>
                  <div className="social-btn-info">
                    <span className="social-name">GitHub</span>
                    <span className="social-handle">@Simplicity005</span>
                  </div>
                  <span className="social-arrow">↗</span>
                </a>

                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn-card"
                  onClick={() => playSound("click")}
                >
                  <img src={instagramIcon} alt="Instagram" className="social-btn-icon" />
                  <div className="social-btn-info">
                    <span className="social-name">Instagram</span>
                    <span className="social-handle">@simplicity</span>
                  </div>
                  <span className="social-arrow">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-form-card">
            <h3 className="form-card-title">Send a Direct Dispatch</h3>
            <p className="form-card-sub">Choose a preset topic or write a customized message:</p>

            {/* Topic pills */}
            <div className="preset-topics-wrap">
              {PRESET_TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  className={`preset-topic-btn ${selectedTopic === topic ? "selected" : ""}`}
                  onClick={() => {
                    playSound("tab");
                    setSelectedTopic(topic);
                  }}
                >
                  {topic}
                </button>
              ))}
            </div>

            {isSent ? (
              <div className="form-success-banner">
                <div className="success-icon">✓</div>
                <h4>Message Dispatched!</h4>
                <p>Thanks for reaching out! Arjun will respond to your transmission shortly.</p>
                <button
                  type="button"
                  className="send-another-btn"
                  onClick={() => setIsSent(false)}
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="interactive-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name-input">Your Name</label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      placeholder="e.g. Linus Torvalds"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email-input">Your Email</label>
                    <input
                      id="email-input"
                      type="email"
                      required
                      placeholder="e.g. linus@kernel.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="msg-input">Message Details ({selectedTopic})</label>
                  <textarea
                    id="msg-input"
                    rows="4"
                    required
                    placeholder="Tell me about your project, idea, or role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="form-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Transmitting Signal...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
