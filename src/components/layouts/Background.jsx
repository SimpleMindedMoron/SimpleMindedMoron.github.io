import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";

function Background() {
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 600);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 400);

  // Smooth Motion physics springs matching motion.dev physics parameters
  const springX = useSpring(mouseX, { stiffness: 45, damping: 25, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25, mass: 0.8 });

  // Opposing counterbalance spring
  const oppositeX = useTransform(mouseX, (x) => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    return w - x * 0.7;
  });
  const oppositeY = useTransform(mouseY, (y) => {
    const h = typeof window !== "undefined" ? window.innerHeight : 800;
    return h - y * 0.7;
  });
  const springOppositeX = useSpring(oppositeX, { stiffness: 35, damping: 28, mass: 1 });
  const springOppositeY = useSpring(oppositeY, { stiffness: 35, damping: 28, mass: 1 });

  // Reactive radial gradient mask that illuminates the dot mesh around the cursor
  const lightMask = useMotionTemplate`radial-gradient(620px circle at ${springX}px ${springY}px, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 80%)`;

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
      {/* Base Obsidian Foundation */}
      <div className="bg-canvas-base" />

      {/* Floating Harmonic Ambient Mesh - Orb 1 (Cyan / Sky) */}
      <motion.div
        className="ambient-gradient-orb cyan-orb"
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Harmonic Ambient Mesh - Orb 2 (Violet / Indigo) */}
      <motion.div
        className="ambient-gradient-orb indigo-orb"
        animate={{
          x: [0, -60, 45, 0],
          y: [0, 50, -35, 0],
          scale: [1, 1.12, 0.92, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Primary Interactive Spring Physics Glow (Tracks cursor with spring inertia) */}
      <motion.div
        className="interactive-physics-glow primary-glow"
        style={{
          x: springX,
          y: springY,
        }}
      />

      {/* Secondary Reactive Spring Glow (Harmonious counterbalance) */}
      <motion.div
        className="interactive-physics-glow secondary-glow"
        style={{
          x: springOppositeX,
          y: springOppositeY,
        }}
      />

      {/* Interactive Dot Grid (Illuminated where cursor light shines) */}
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
