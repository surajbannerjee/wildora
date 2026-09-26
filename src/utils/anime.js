"use client";
import { animate } from "framer-motion";

/**
 * Animate elements fading in and moving up smoothly using Framer Motion
 */
export function animeFadeUp(targets, options = {}) {
  if (!targets) return;
  const {
    duration = 0.8,
    delay = 0,
    distance = 30,
    onComplete,
  } = options;

  return animate(targets, { opacity: [0, 1], y: [distance, 0] }, {
    duration: typeof duration === "number" && duration > 10 ? duration / 1000 : duration,
    delay: typeof delay === "number" && delay > 10 ? delay / 1000 : delay,
    ease: [0.25, 1, 0.5, 1],
    onComplete,
  });
}

/**
 * Animate elements fading in and scaling up using Framer Motion
 */
export function animeScaleUp(targets, options = {}) {
  if (!targets) return;
  const {
    duration = 0.75,
    delay = 0,
    onComplete,
  } = options;

  return animate(targets, { opacity: [0, 1], scale: [0.92, 1] }, {
    duration: typeof duration === "number" && duration > 10 ? duration / 1000 : duration,
    delay: typeof delay === "number" && delay > 10 ? delay / 1000 : delay,
    ease: [0.25, 1, 0.5, 1],
    onComplete,
  });
}

/**
 * Animate a list of elements with staggered delays using Framer Motion
 */
export function animeStagger(targets, options = {}) {
  if (!targets) return;
  const targetArray = Array.isArray(targets) ? targets : Array.from(targets);
  const {
    duration = 0.7,
    staggerDelay = 0.1,
    startDelay = 0.05,
    distance = 25,
    onComplete,
  } = options;

  targetArray.forEach((el, i) => {
    animate(el, { opacity: [0, 1], y: [distance, 0] }, {
      duration: typeof duration === "number" && duration > 10 ? duration / 1000 : duration,
      delay: (typeof startDelay === "number" && startDelay > 10 ? startDelay / 1000 : startDelay) + i * (typeof staggerDelay === "number" && staggerDelay > 10 ? staggerDelay / 1000 : staggerDelay),
      ease: [0.25, 1, 0.5, 1],
      onComplete: i === targetArray.length - 1 ? onComplete : undefined,
    });
  });
}

/**
 * Animate numerical count up using Framer Motion
 */
export function animeCountUp(targetObj, endValue, options = {}) {
  if (!targetObj) return;
  const {
    duration = 1.8,
    onUpdate,
    onComplete,
  } = options;

  return animate(0, endValue, {
    duration: typeof duration === "number" && duration > 10 ? duration / 1000 : duration,
    ease: [0.16, 1, 0.3, 1],
    onUpdate: (latest) => {
      targetObj.value = latest;
      if (onUpdate) onUpdate(Math.round(latest));
    },
    onComplete,
  });
}
