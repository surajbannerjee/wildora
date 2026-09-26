"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    // Only enable smooth scrolling on client
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Expose lenis instance globally if needed for scroll-to triggers
    if (typeof window !== "undefined") {
      window.lenis = lenis;
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
