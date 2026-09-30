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

  // Smooth, critically damped Motion physics spring for cursor glow (no rubber-band bounce)
  const springX = useSpring(mouseX, { stiffness: 90, damping: 26, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 26, mass: 0.6 });

  // Counterbalance spring for subtle opposing ambient depth
  const oppositeX = useSpring(mouseX, { stiffness: 45, damping: 22, mass: 1 });
  const oppositeY = useSpring(mouseY, { stiffness: 45, damping: 22, mass: 1 });

  // Reactive radial mask that crisply reveals the dot grid around the cursor
  const lightMask = useMotionTemplate`radial-gradient(520px circle at ${springX}px ${springY}px, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.09) 45%, transparent 75%)`;

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

      {/* Floating Harmonic Ambient Mesh - Orb 1 (Sapphire / Celestial Blue) */}
      <motion.div
        className="ambient-gradient-orb sapphire-orb"
        animate={{
          x: [0, 45, -30, 0],
          y: [0, -35, 25, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Harmonic Ambient Mesh - Orb 2 (Amethyst / Violet) */}
      <motion.div
        className="ambient-gradient-orb violet-orb"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 35, -25, 0],
          scale: [1, 1.06, 0.94, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Primary Interactive Spring Physics Glow (Tracks cursor smoothly) */}
      <motion.div
        className="interactive-physics-glow primary-glow"
        style={{
          x: springX,
          y: springY,
        }}
      />

      {/* Secondary Subtle Opposing Ambient Glow */}
      <motion.div
        className="interactive-physics-glow secondary-glow"
        style={{
          x: oppositeX,
          y: oppositeY,
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

      {/* Peripheral Vignette for Focus & Contrast */}
      <div className="ambient-vignette" />
    </div>
  );
}

export default Background;
