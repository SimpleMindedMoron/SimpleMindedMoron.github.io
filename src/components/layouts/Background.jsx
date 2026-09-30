import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react";

function Background() {
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 600);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 400);

  // Smooth Motion physics spring matching high-end critically damped tracking
  const springX = useSpring(mouseX, { stiffness: 120, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 30, mass: 0.5 });

  // Reactive radial mask that crisply reveals the minimalist dot grid around the cursor (zero blur/glow)
  const lightMask = useMotionTemplate`radial-gradient(480px circle at ${springX}px ${springY}px, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.25) 50%, transparent 80%)`;

  useEffect(() => {
    const handlePointerMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY]);

  return (
    <div className="ambient-background-root" aria-hidden="true">
      {/* Base Pure Obsidian Canvas */}
      <div className="bg-canvas-base" />

      {/* Interactive Dot Grid (Crisp 1px points revealed by cursor spring physics - strictly no glow) */}
      <motion.div
        className="minimalist-dot-grid interactive-light-grid"
        style={{
          WebkitMaskImage: lightMask,
          maskImage: lightMask,
        }}
      />

      {/* Subtle Static Dot Grid Baseline */}
      <div className="minimalist-dot-grid base-grid" />

      {/* Peripheral Vignette for Focus */}
      <div className="ambient-vignette" />
    </div>
  );
}

export default Background;
