import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react";

function Background() {
  const canvasRef = useRef(null);
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 600);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 400);

  // Smooth, critically damped Motion physics spring for cursor glow
  const springX = useSpring(mouseX, { stiffness: 90, damping: 26, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 26, mass: 0.6 });

  // Counterbalance spring for subtle opposing ambient depth
  const oppositeX = useSpring(mouseX, { stiffness: 45, damping: 22, mass: 1 });
  const oppositeY = useSpring(mouseY, { stiffness: 45, damping: 22, mass: 1 });

  // Reactive radial mask that illuminates the canvas around the cursor
  const lightMask = useMotionTemplate`radial-gradient(540px circle at ${springX}px ${springY}px, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.12) 50%, transparent 80%)`;

  useEffect(() => {
    const handlePointerMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY]);

  // Conway's Game of Life Mathematical Cellular Automaton Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const cellSize = 16;
    let cols = Math.ceil(width / cellSize);
    let rows = Math.ceil(height / cellSize);
    let totalCells = cols * rows;

    let grid = new Uint8Array(totalCells);
    let nextGrid = new Uint8Array(totalCells);
    let cellAge = new Float32Array(totalCells); // For glowing phosphor trails

    // Spawn classic seed patterns (Glider, Pulsar, Acorn, etc.)
    const spawnGlider = (startCol, startRow) => {
      const pattern = [
        [0, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
      ];
      pattern.forEach(([dr, dc]) => {
        const r = (startRow + dr + rows) % rows;
        const c = (startCol + dc + cols) % cols;
        const idx = r * cols + c;
        grid[idx] = 1;
        cellAge[idx] = 1.0;
      });
    };

    const spawnPulsar = (startCol, startRow) => {
      const beacon = [
        [0, 0], [0, 1], [1, 0],
        [2, 3], [3, 2], [3, 3],
      ];
      beacon.forEach(([dr, dc]) => {
        const r = (startRow + dr + rows) % rows;
        const c = (startCol + dc + cols) % cols;
        const idx = r * cols + c;
        grid[idx] = 1;
        cellAge[idx] = 1.0;
      });
    };

    const spawnAcorn = (startCol, startRow) => {
      const acorn = [
        [0, 1],
        [1, 3],
        [2, 0], [2, 1], [2, 4], [2, 5], [2, 6],
      ];
      acorn.forEach(([dr, dc]) => {
        const r = (startRow + dr + rows) % rows;
        const c = (startCol + dc + cols) % cols;
        const idx = r * cols + c;
        grid[idx] = 1;
        cellAge[idx] = 1.0;
      });
    };

    const seedRandomLife = () => {
      for (let i = 0; i < totalCells; i++) {
        if (Math.random() < 0.08) {
          grid[i] = 1;
          cellAge[i] = 1.0;
        } else {
          grid[i] = 0;
          cellAge[i] = 0;
        }
      }
      spawnGlider(4, 4);
      spawnGlider(Math.floor(cols * 0.4), 6);
      spawnAcorn(Math.floor(cols * 0.7), Math.floor(rows * 0.35));
      spawnPulsar(Math.floor(cols * 0.25), Math.floor(rows * 0.55));
    };

    seedRandomLife();

    // Interactive Life Seeding via Mouse
    const injectLifeAt = (x, y, radius = 2) => {
      const centerCol = Math.floor(x / cellSize);
      const centerRow = Math.floor(y / cellSize);
      for (let dr = -radius; dr <= radius; dr++) {
        for (let dc = -radius; dc <= radius; dc++) {
          if (Math.random() > 0.4) {
            const r = (centerRow + dr + rows) % rows;
            const c = (centerCol + dc + cols) % cols;
            const idx = r * cols + c;
            grid[idx] = 1;
            cellAge[idx] = 1.0;
          }
        }
      }
    };

    let lastPointerX = 0;
    let lastPointerY = 0;
    const handlePointer = (e) => {
      const dist = Math.hypot(e.clientX - lastPointerX, e.clientY - lastPointerY);
      if (dist > 28) {
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
        injectLifeAt(e.clientX, e.clientY, 1);
      }
    };

    const handleClick = (e) => {
      injectLifeAt(e.clientX, e.clientY, 3);
      spawnGlider(Math.floor(e.clientX / cellSize), Math.floor(e.clientY / cellSize));
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);
      totalCells = cols * rows;
      grid = new Uint8Array(totalCells);
      nextGrid = new Uint8Array(totalCells);
      cellAge = new Float32Array(totalCells);
      seedRandomLife();
    };

    window.addEventListener("resize", handleResize);

    // Simulation stepping loop (throttled to ~95ms per generation for smooth life dynamics)
    let lastTick = 0;
    const tickInterval = 95;

    const render = (now) => {
      if (now - lastTick > tickInterval) {
        lastTick = now;
        let activeCount = 0;

        for (let r = 0; r < rows; r++) {
          const rPrev = (r - 1 + rows) % rows;
          const rNext = (r + 1) % rows;
          const rOff = r * cols;
          const rPrevOff = rPrev * cols;
          const rNextOff = rNext * cols;

          for (let c = 0; c < cols; c++) {
            const cPrev = (c - 1 + cols) % cols;
            const cNext = (c + 1) % cols;

            const neighbors =
              grid[rPrevOff + cPrev] +
              grid[rPrevOff + c] +
              grid[rPrevOff + cNext] +
              grid[rOff + cPrev] +
              grid[rOff + cNext] +
              grid[rNextOff + cPrev] +
              grid[rNextOff + c] +
              grid[rNextOff + cNext];

            const idx = rOff + c;
            const isAlive = grid[idx];

            if (isAlive) {
              if (neighbors === 2 || neighbors === 3) {
                nextGrid[idx] = 1;
                cellAge[idx] = Math.min(1.0, cellAge[idx] + 0.15);
                activeCount++;
              } else {
                nextGrid[idx] = 0;
                cellAge[idx] *= 0.82; // Phosphor decay
              }
            } else {
              if (neighbors === 3) {
                nextGrid[idx] = 1;
                cellAge[idx] = 0.95;
                activeCount++;
              } else {
                nextGrid[idx] = 0;
                cellAge[idx] *= 0.82;
              }
            }
          }
        }

        const temp = grid;
        grid = nextGrid;
        nextGrid = temp;

        // Auto-reseed if population is dying out
        if (activeCount < 22) {
          spawnGlider(Math.floor(Math.random() * (cols - 8)), Math.floor(Math.random() * (rows - 8)));
          spawnAcorn(Math.floor(Math.random() * (cols - 8)), Math.floor(Math.random() * (rows - 8)));
        }
      } else {
        // Continuous smooth fading between simulation steps
        for (let i = 0; i < totalCells; i++) {
          if (!grid[i] && cellAge[i] > 0.01) {
            cellAge[i] *= 0.96;
          }
        }
      }

      ctx.clearRect(0, 0, width, height);

      const isPaper = document.documentElement.getAttribute("data-theme") === "paper";

      // Render living cells and glowing trails
      for (let r = 0; r < rows; r++) {
        const rOff = r * cols;
        for (let c = 0; c < cols; c++) {
          const idx = rOff + c;
          const age = cellAge[idx];
          if (age > 0.02) {
            const x = c * cellSize;
            const y = r * cellSize;
            const isLive = grid[idx];

            if (isPaper) {
              ctx.fillStyle = isLive
                ? `rgba(59, 130, 139, ${age * 0.3})`
                : `rgba(90, 120, 115, ${age * 0.1})`;
            } else {
              ctx.fillStyle = isLive
                ? `rgba(59, 130, 139, ${age * 0.38})`
                : `rgba(40, 75, 85, ${age * 0.14})`;
            }

            // Retro pixel cells with 1px border gutter
            ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

            // Living cell center phosphor dot
            if (isLive && age > 0.5) {
              ctx.fillStyle = isPaper
                ? `rgba(194, 147, 74, ${age * 0.45})`
                : `rgba(194, 147, 74, ${age * 0.6})`;
              ctx.fillRect(x + Math.floor(cellSize / 2) - 1, y + Math.floor(cellSize / 2) - 1, 2, 2);
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="ambient-background-root" aria-hidden="true">
      {/* Base Canvas Foundation */}
      <div className="bg-canvas-base" />

      {/* Floating Harmonic Ambient Orbs for Depth */}
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

      {/* Primary Interactive Spring Physics Glow */}
      <motion.div
        className="interactive-physics-glow primary-glow"
        style={{
          x: springX,
          y: springY,
        }}
      />

      <motion.div
        className="interactive-physics-glow secondary-glow"
        style={{
          x: oppositeX,
          y: oppositeY,
        }}
      />

      {/* Mathematical Conway's Game of Life Cellular Simulation Canvas */}
      <canvas
        ref={canvasRef}
        className="conway-life-canvas"
      />

      {/* Interactive Dot Grid Illuminated via Cursor Radial Mask */}
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
