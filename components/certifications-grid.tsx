"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ExternalLink,
  Calendar,
  Layers,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { certifications, type Certification } from "@/lib/certifications";
import { cn } from "@/lib/utils";

/* ===============================
   Reusable Animated Button
   =============================== */
const AnimatedButton = React.memo(
  ({
    children,
    className = "",
    ...props
  }: React.ComponentProps<typeof Button>) => (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full sm:w-auto"
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

/* ===============================
   Certification Card
   =============================== */
const CertificationCard = React.memo(
  ({ cert, idx }: { cert: Certification; idx: number }) => (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.07, ease: "easeOut" }}
      key={cert.id}
      aria-label={cert.title}
      className="group"
    >
      <Card
        className={cn(
          "relative h-full rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm",
          "hover:shadow-xl hover:border-primary/40 hover:bg-card/90 hover:-translate-y-2 transition-all duration-300"
        )}
      >
        <CardContent className="p-6 flex flex-col h-full space-y-4">
          {/* Logo & Title */}
          <div className="flex justify-between items-start gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {cert.logo ? (
                <div className="relative w-12 h-12 shrink-0 border border-border/30 rounded-lg p-1 bg-background shadow-sm">
                  <Image
                    src={cert.logo}
                    alt={`${cert.issuer} logo`}
                    width={48}
                    height={48}
                    className="object-contain rounded-md"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 shadow-sm border border-border/30">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="text-xs font-medium border-primary/30 text-primary bg-primary/10"
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              {cert.status}
            </Badge>
          </div>

          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Calendar className="w-4 h-4 text-primary/70" />
            <span>Issued {cert.date}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
            <Layers className="w-3 h-3 text-primary/70" />
            <span>{cert.category}</span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">
            {cert.description}
          </p>

          {cert.skills && cert.skills.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Key Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.slice(0, 3).map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-xs border-primary/20 bg-primary/10 text-primary"
                  >
                    {skill}
                  </Badge>
                ))}
                {cert.skills.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-muted text-muted-foreground"
                  >
                    +{cert.skills.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="mt-auto pt-4">
            {cert.verifyUrl ? (
              <AnimatedButton
                size="sm"
                variant="outline"
                asChild
                className="w-full btn-outline-premium"
              >
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify ${cert.title} certification`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Verify Credential
                </a>
              </AnimatedButton>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                disabled
                className="w-full border border-muted/30 text-muted-foreground cursor-not-allowed"
              >
                Verification Unavailable
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.article>
  )
);
CertificationCard.displayName = "CertificationCard";

/* ===============================
   Main Certifications Grid
   =============================== */
export const CertificationsGrid = React.memo(() => {
  const [visibleCount, setVisibleCount] = useState(6);

  const visibleCerts = useMemo(
    () => certifications.slice(0, visibleCount),
    [visibleCount]
  );

  const hasMore = visibleCount < certifications.length;

  return (
    <section
      className="space-y-16"
      aria-labelledby="certifications-heading"
      id="certifications-section"
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
        id="certifications-heading"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
          <CheckCircle className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Certifications</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Professional Certifications
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Industry-recognized credentials in cloud computing, data engineering,
          and machine learning.
        </p>
      </motion.header>

      {/* Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        id="certifications-grid"
      >
        {visibleCerts.map((cert, idx) => (
          <CertificationCard key={cert.id} cert={cert} idx={idx} />
        ))}
      </motion.div>

      {/* Load More Button */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-8"
        >
          <AnimatedButton
            variant="outline"
            size="lg"
            onClick={() =>
              setVisibleCount((prev) => prev + 6)
            }
            aria-controls="certifications-grid"
            aria-expanded={hasMore}
            className="group flex items-center gap-2 px-6 py-3 text-base font-medium btn-outline-premium"
          >
            <span>Load More Certifications</span>
            <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </AnimatedButton>
        </motion.div>
      )}
    </section>
  );
});
CertificationsGrid.displayName = "CertificationsGrid";
