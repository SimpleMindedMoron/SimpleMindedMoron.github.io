import { useEffect, useRef } from "react";
import logo from "../../assets/Logo.png";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const contactLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arjun-sanesh/",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/Simplicity005",
    icon: "github",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: "instagram",
  },
];

function Footer() {
  const revealRef = useScrollReveal();
  const year = new Date().getFullYear();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;

    function resize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    let time = 0;

    const waves = [
      {
        amplitude: 35,
        frequency: 0.006,
        speed: 0.03,
        opacity: 0.4,
        baseHeight: 30,
      },
      {
        amplitude: 45,
        frequency: 0.004,
        speed: 0.02,
        opacity: 0.25,
        baseHeight: 40,
      },
      {
        amplitude: 20,
        frequency: 0.008,
        speed: 0.04,
        opacity: 0.5,
        baseHeight: 20,
      },
      {
        amplitude: 55,
        frequency: 0.003,
        speed: 0.015,
        opacity: 0.2,
        baseHeight: 50,
      },
    ];

    let animationFrameId;

    function draw() {
      if (!width || !height) {
        resize();
      }
      ctx.clearRect(0, 0, width, height);

      ctx.globalCompositeOperation = "screen";

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 5) {
          const y =
            height -
            wave.baseHeight -
            Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude -
            Math.cos(x * wave.frequency * 0.7 - time * wave.speed * 0.9) *
              (wave.amplitude * 0.5);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, height - 120, 0, height);
        gradient.addColorStop(0, `rgba(220, 220, 220, 0)`);
        gradient.addColorStop(
          0.6,
          `rgba(220, 220, 220, ${wave.opacity * 0.5})`,
        );
        gradient.addColorStop(1, `rgba(220, 220, 220, ${wave.opacity})`);

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      time += 0.35;
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <footer className="footer-container" id="contact">
      <canvas id="aurora-ribbon" ref={canvasRef}></canvas>
      <div className="footer-blur">
        <div className="footer-inner reveal-zoom" ref={revealRef}>
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo-badge">
                <img
                  src={logo}
                  alt="Arjun Sanesh logo"
                  className="footer-logo"
                />
              </div>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">Get in touch</span>
              <div className="footer-contact-list">
                {contactLinks.map((link) => (
                  <a
                    href={link.href}
                    key={link.label}
                    className="footer-contact-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="footer-contact-icon">
                      {link.icon === "github" && (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.02 11.02 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                        </svg>
                      )}
                      {link.icon === "linkedin" && (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.847-3.037-1.849 0-2.13 1.445-2.13 2.939v5.667H9.361V9h3.413v1.565h.049c.475-.898 1.632-1.844 3.365-1.844 3.599 0 4.259 2.368 4.259 5.445v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      )}
                      {link.icon === "instagram" && (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      )}
                    </span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-bottom-spacer" aria-hidden="true"></span>
            <p> {year} Arjun Sanesh. All rights reserved.</p>
            <a
              href="#"
              className="back-to-top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
