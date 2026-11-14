"use client";

import { motion, type HTMLMotionProps } from "motion/react";

export const easeSuave = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Deslocamento inicial em px (vertical) */
  y?: number;
};

/** Entrada discreta ao rolar até o bloco (acontece uma vez só). */
export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: easeSuave, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
