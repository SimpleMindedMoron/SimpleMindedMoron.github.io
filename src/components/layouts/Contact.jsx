import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

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
              <span className="neo-titlebar-dot"></span>
              <span className="neo-titlebar-text">contact.exe</span>
            </div>
          </div>

          <div className="contact-window-content">
            <div className="contact-layout-grid">
              {/* Left Column: Direct Profiles */}
              <div className="contact-info-panel">
                <div className="neo-box social-links-panel">
                  <span className="social-links-label">DIRECT PROFILES</span>
                  <div className="social-buttons-list">
                    <a
                      href="https://github.com/Simplemindedmoron"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-social-btn"
                    >
                      <div className="social-svg-wrap">
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          />
                        </svg>
                      </div>
                      <span>GitHub ↗</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/arjun-sanesh/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-social-btn"
                    >
                      <div className="social-svg-wrap">
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      </div>
                      <span>LinkedIn ↗</span>
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
