"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A thin reading-progress beam pinned to the very top of the article, echoing
 * the travelling purple to gold beam of the About "Our Journey" trace. It is
 * informative rather than decorative, so it renders regardless of motion
 * preference; the spring is only a light smoothing of the scroll value.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--color-primary), var(--blue-400) 55%, var(--amber-500))",
      }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
    />
  );
}
