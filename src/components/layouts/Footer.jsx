import { useEffect, useRef } from "react";
import logo from "../../assets/Logo.png";

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
      { amplitude: 25, frequency: 0.005, speed: 0.02, opacity: 0.25, baseHeight: 25 },
      { amplitude: 35, frequency: 0.003, speed: 0.015, opacity: 0.18, baseHeight: 35 },
      { amplitude: 15, frequency: 0.007, speed: 0.03, opacity: 0.3, baseHeight: 15 },
    ];

    let animationFrameId;

    function draw() {
      if (!width || !height) resize();
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

        const gradient = ctx.createLinearGradient(0, height - 80, 0, height);
        gradient.addColorStop(0, `rgba(59, 130, 139, 0)`);
        gradient.addColorStop(0.6, `rgba(59, 130, 139, ${wave.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(59, 130, 139, ${wave.opacity})`);

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      time += 0.3;
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <footer className="footer-container" id="site-footer">
      <canvas id="aurora-ribbon" ref={canvasRef}></canvas>

      <div className="neo-window footer-neo-window">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo-badge">
                <img src={logo} alt="Arjun Sanesh logo" className="footer-logo" />
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
      </div>
    </footer>
  );
}

export default Footer;
