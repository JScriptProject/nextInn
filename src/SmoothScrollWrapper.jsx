import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/all";

function SmoothScrollWrapper({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // optional easing
    });

    // ✅ Sync ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

      // ✅ Optional: Also dispatch 'scroll' event for Framer Motion + other listeners
    lenis.on("scroll", () => {
      window.dispatchEvent(new Event("scroll"));
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export default SmoothScrollWrapper;
