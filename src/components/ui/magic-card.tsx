"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.8,
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize * 1.5);
  const mouseY = useMotionValue(-gradientSize * 1.5);
  const indicatorX = useTransform(mouseX, (value) => value - gradientSize / 2);
  const indicatorY = useTransform(mouseY, (value) => value - gradientSize / 2);
  const indicatorScale = Math.max(0.75, gradientOpacity);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseOut = useCallback(
    (e: MouseEvent) => {
      if (!e.relatedTarget) {
        document.removeEventListener("mousemove", handleMouseMove);
        mouseX.set(-gradientSize * 1.5);
        mouseY.set(-gradientSize * 1.5);
      }
    },
    [handleMouseMove, mouseX, gradientSize, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    document.addEventListener("mousemove", handleMouseMove);
    mouseX.set(-gradientSize * 1.5);
    mouseY.set(-gradientSize * 1.5);
  }, [handleMouseMove, mouseX, gradientSize, mouseY]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseEnter, handleMouseMove, handleMouseOut]);

  useEffect(() => {
    mouseX.set(-gradientSize * 1.5);
    mouseY.set(-gradientSize * 1.5);
  }, [gradientSize, mouseX, mouseY]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative flex size-full overflow-hidden rounded-lg border border-border bg-card text-card-foreground",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
      <motion.div
        className="pointer-events-none absolute rounded-full border bg-card"
        style={{
          width: gradientSize,
          height: gradientSize,
          x: indicatorX,
          y: indicatorY,
          scale: indicatorScale,
          borderColor: gradientColor,
          boxShadow: `inset 0 0 0 ${Math.max(1, Math.round(gradientOpacity * 2))}px ${gradientColor}`,
        }}
      />
    </div>
  );
}
