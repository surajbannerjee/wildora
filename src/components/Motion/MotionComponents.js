"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";

/**
 * MotionFadeIn - Smooth scroll-triggered entrance animation with Framer Motion
 */
export function MotionFadeIn({
  children,
  className = "",
  direction = "up", // "up" | "down" | "left" | "right" | "none"
  delay = 0,
  duration = 0.7,
  distance = 35,
  type = "fadeUp", // "fadeUp" | "scaleUp" | "slide"
  once = true,
  threshold = 0.15,
}) {
  const getInitial = () => {
    if (type === "scaleUp") {
      return { opacity: 0, scale: 0.92 };
    }
    switch (direction) {
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      case "up":
      default:
        return { opacity: 0, y: distance };
    }
  };

  const getAnimate = () => {
    if (type === "scaleUp") {
      return { opacity: 1, scale: 1 };
    }
    return { opacity: 1, x: 0, y: 0 };
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.25, 1, 0.5, 1], // Smooth cubic out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * MotionStaggerList - Smooth staggered children entrance with Framer Motion
 */
export function MotionStaggerList({
  children,
  className = "",
  staggerDelay = 0.09,
  startDelay = 0.05,
  distance = 25,
  once = true,
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: typeof staggerDelay === "number" && staggerDelay > 1 ? staggerDelay / 1000 : staggerDelay,
        delayChildren: typeof startDelay === "number" && startDelay > 1 ? startDelay / 1000 : startDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: distance, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      className={className}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return (
          <motion.div variants={itemVariants} className="h-full flex flex-col">
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/**
 * MotionCounter - Smooth animated number counter using Framer Motion
 */
export function MotionCounter({
  end,
  prefix = "",
  suffix = "",
  duration = 2,
  className = "",
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      const numericEnd = typeof end === "number" ? end : parseInt(String(end).replace(/\D/g, ""), 10) || 0;
      const controls = animate(0, numericEnd, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (value) => {
          setDisplayValue(Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

// Aliases for backwards compatibility with any existing imports
export const AnimeFadeIn = MotionFadeIn;
export const AnimeStaggerList = MotionStaggerList;
export const AnimeCounter = MotionCounter;

export default MotionFadeIn;
