"use client";

import { MotionConfig } from "motion/react";

/** Respeita a preferência do sistema por menos movimento em todas as animações. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
