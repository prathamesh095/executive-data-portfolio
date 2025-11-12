// /components/projects/actions/ProjectActions.tsx
import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedButton as _AnimatedButton } from "@/components/projects/internal/AnimatedButtonShim";
import { Eye, Github, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/types";

type Props = {
  project: Project;
  onPreviewClick?: (p: Project) => void;
  isPreview?: boolean;
  isListView?: boolean;
};

export const ProjectActions = memo(function ProjectActions({
  project,
  onPreviewClick,
  isPreview = false,
  isListView = false,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {!isPreview && onPreviewClick && (
        <_AnimatedButton
          size="sm"
          variant="secondary"
          className="min-w-[110px]"
          onClick={() => onPreviewClick(project)}
        >
          <Eye className="w-4 h-4 mr-2" /> Preview
        </_AnimatedButton>
      )}
      <_AnimatedButton size="sm" asChild>
        <Link href={`/projects/${project.id}`}>
          <Eye className="w-4 h-4 mr-2" /> {isPreview ? "Full Details" : "Details"}
        </Link>
      </_AnimatedButton>
      <_AnimatedButton
        variant="outline"
        size="sm"
        asChild
        className="btn-outline-premium"
      >
        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
          <Github className="w-3 h-3 mr-1" /> Code
        </a>
      </_AnimatedButton>
      {project.links.dashboard && (
        <_AnimatedButton
          variant="outline"
          size="sm"
          asChild
          className="btn-outline-premium"
        >
          <Link href={project.links.dashboard}>
            <BarChart3 className="w-3 h-3 mr-1" /> Dashboard
          </Link>
        </_AnimatedButton>
      )}
    </div>
  );
});
ProjectActions.displayName = "ProjectActions";
