import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type MotionProps,
} from "motion/react";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
}

export function WordRotate({
  words,
  duration = 5200,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const staticWord = words[0] ?? "";
  const currentWord = words[index] ?? staticWord;
  const longestWord = words.reduce((longest, word) => {
    return word.length > longest.length ? word : longest;
  }, staticWord);

  useEffect(() => {
    if (index < words.length) {
      return;
    }

    setIndex(0);
  }, [index, words.length]);

  useEffect(() => {
    if (words.length < 2 || prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => window.clearInterval(interval);
  }, [duration, prefersReducedMotion, words.length]);

  if (!staticWord) {
    return null;
  }

  if (words.length < 2 || prefersReducedMotion) {
    return (
      <span className={cn("inline-block whitespace-nowrap", className)}>
        {staticWord}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "relative inline-grid overflow-hidden whitespace-nowrap py-2 align-baseline",
        className,
      )}
    >
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {longestWord}
      </span>
      <span className="sr-only">{staticWord}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentWord}
          aria-hidden="true"
          className="absolute inset-0 block whitespace-nowrap"
          {...motionProps}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
