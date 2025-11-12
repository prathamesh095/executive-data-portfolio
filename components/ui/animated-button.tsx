"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * AnimatedButton
 * --------------------------------------------------
 * A reusable motion-enhanced button wrapper
 * for consistent animations across your app.
 *
 * ✅ Works with all button variants (outline, ghost, etc.)
 * ✅ Can be used with `asChild` for <Link> or <a> elements
 * ✅ Fully theme-compliant & hydration-safe
 */

export const AnimatedButton = React.memo(
  ({
    children,
    className = "",
    whileHover = { scale: 1.05, y: -2 },
    whileTap = { scale: 0.97 },
    ...props
  }: React.ComponentProps<typeof Button> & {
    whileHover?: Record<string, number>;
    whileTap?: Record<string, number>;
  }) => (
    <motion.div
      whileHover={whileHover}
      whileTap={whileTap}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="inline-flex w-full sm:w-auto"
    >
      <Button
        {...props}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
      >
        {children}
      </Button>
    </motion.div>
  )
);

AnimatedButton.displayName = "AnimatedButton";
