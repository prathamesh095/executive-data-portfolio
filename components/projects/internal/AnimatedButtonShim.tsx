// /components/projects/internal/AnimatedButtonShim.tsx
import React, { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const AnimatedButton = memo(
  ({
    children,
    className = "",
    ...props
  }: React.ComponentProps<typeof Button>) => {
    const shouldReduceMotion = useReducedMotion();
    return (
      <motion.div
        whileHover={{
          scale: shouldReduceMotion ? 1 : 1.04,
          y: shouldReduceMotion ? 0 : -2,
        }}
        whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
      >
        <Button
          {...props}
          className={cn(
            "transition-all duration-300 inline-flex items-center justify-center gap-2 font-medium",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);
AnimatedButton.displayName = "AnimatedButton";
