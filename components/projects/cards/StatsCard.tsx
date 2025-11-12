// /components/projects/cards/StatsCard.tsx
import React, { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatsCardProps = {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  premium?: boolean;
};

export const StatsCard = memo(function StatsCard({
  label,
  value,
  icon: Icon,
  premium = false,
}: StatsCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="group relative"
      whileHover={{ y: shouldReduceMotion ? 0 : -6 }}
      whileTap={{ y: shouldReduceMotion ? 0 : -2 }}
    >
      <Card
        className={cn(
          "relative overflow-hidden glassmorphism rounded-xl p-6 transition-all duration-500 hover:shadow-2xl",
          "border border-border/40"
        )}
      >
        <motion.div
          className="absolute -inset-px rounded-xl bg-linear-to-r from-secondary/30 via-primary/20 to-secondary/30 opacity-0 blur-xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: shouldReduceMotion ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        />

        {premium && (
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/80 to-transparent"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: shouldReduceMotion ? 0 : 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        )}

        <div
          className={cn(
            "absolute inset-0 rounded-xl pointer-events-none",
            "bg-linear-to-br from-primary/10 via-transparent to-primary/5 dark:from-primary/5"
          )}
        />

        <div className="relative flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/80">
              {label}
            </p>
            <motion.p
              className={cn(
                "text-4xl font-bold tracking-tight text-foreground",
                premium &&
                  "bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary dark:from-primary/80 dark:to-secondary/80"
              )}
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.06 }}
              transition={{ duration: 0.25 }}
            >
              {value}
            </motion.p>
          </div>

          <motion.div
            className="relative p-4 rounded-full bg-surface-level-1/70 backdrop-blur-md shadow-2xl shadow-black/20 ring-2 ring-primary/40 dark:ring-primary/30 group-hover:ring-secondary/60 transition duration-300"
            whileHover={{
              scale: shouldReduceMotion ? 1 : 1.25,
              rotate: shouldReduceMotion ? 0 : 15,
            }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 1.15 }}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
          >
            <motion.div className="absolute inset-0 rounded-full bg-linear-to-br from-primary/40 to-secondary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
            <Icon className="w-7 h-7 text-primary relative z-10" />
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-linear-to-r from-transparent via-secondary/70 to-transparent"
          whileHover={{ width: shouldReduceMotion ? "0%" : "80%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </Card>
    </motion.div>
  );
});
StatsCard.displayName = "StatsCard";
