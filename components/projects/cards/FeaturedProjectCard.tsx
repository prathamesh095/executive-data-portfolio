// /components/projects/cards/FeaturedProjectCard.tsx
import React, { memo } from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getProjectIcon } from "@/components/projects/icons/getProjectIcon";
import { ProjectActions } from "@/components/projects/actions/ProjectActions";

type Props = {
  project: Project;
  onPreviewClick: (p: Project) => void;
};

export const FeaturedProjectCard = memo(function FeaturedProjectCard({
  project,
  onPreviewClick,
}: Props) {
  const Icon = getProjectIcon(project.process[0]?.icon);

  return (
    <Card
      className={cn(
        "overflow-hidden",
        "border border-primary/20 bg-card/60 backdrop-blur-sm hover:bg-card/90",
        "transition-all duration-300 hover:shadow-xl"
      )}
    >
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative overflow-hidden">
            <Image
              src={project.image}
              alt={`Preview of featured project ${project.title}`}
              width={800}
              height={400}
              className="w-full h-64 md:h-full object-cover"
              placeholder="empty"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            <Badge
              className={cn(
                "absolute top-4 left-4 text-xs font-semibold",
                "bg-linear-to-r from-primary to-secondary text-white"
              )}
            >
              {project.category}
            </Badge>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center mb-4">
              <Icon className="w-6 h-6 text-primary mr-2" />
              <span className="text-sm text-muted-foreground">Featured Project</span>
            </div>

            <CardTitle className="text-2xl mb-4">{project.title}</CardTitle>
            <CardDescription className="mb-6">{project.tagline}</CardDescription>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(project.metrics).map(([k, v]) => (
                <div key={k} className="text-center">
                  <div className="text-xl font-bold text-primary">{v}</div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {k.replace(/([A-Z])/g, " $1")}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>

            <div className="flex justify-center sm:justify-start">
              <ProjectActions project={project} onPreviewClick={onPreviewClick} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
FeaturedProjectCard.displayName = "FeaturedProjectCard";
