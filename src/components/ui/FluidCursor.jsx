import { useEffect, useRef } from "react";

function FluidCursor() {
  const containerRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let isVisible = false;
    let animId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        containerRef.current?.classList.add("visible");
      }

      // Check if hovering interactive element
      const target = e.target;
      const interactive = Boolean(
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(".interactive-project-card") ||
        target.closest(".chip-btn") ||
        target.closest(".about-segment-tab") ||
        target.closest(".category-tab-btn") ||
        target.closest(".preset-topic-btn")
      );

      if (interactive !== isHovered) {
        isHovered = interactive;
        containerRef.current?.classList.toggle("hovered", isHovered);
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      containerRef.current?.classList.remove("visible");
    };

    const onMouseEnter = () => {
      isVisible = true;
      containerRef.current?.classList.add("visible");
    };

    // Smooth Lerp loop for weighted precision tracking
    const render = () => {
      // Direct dot positioning
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // 0.26 Lerp produces silk-smooth follow without rubber-band lag
      ringX += (mouseX - ringX) * 0.26;
      ringY += (mouseY - ringY) * 0.26;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fluid-cursor-container"
      aria-hidden="true"
    >
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}

export default FluidCursor;
