"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Retraso en segundos antes de iniciar la animación. */
  delay?: number;
  /** Distancia (px) desde la que entra el elemento. */
  y?: number;
  className?: string;
  /** Permite usar un elemento distinto a <div>. */
  as?: "div" | "li";
}

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Envoltorio de scroll-reveal al estilo Prestigia: fade + slide suave,
 * disparado una sola vez cuando el elemento entra en viewport.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut, delay },
    },
  };

  const MotionTag = as === "li" ? motion.li : motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/** Variants listos para usar con un contenedor + stagger de hijos. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};
