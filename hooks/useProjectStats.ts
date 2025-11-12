// /hooks/useProjectStats.ts
import { useMemo } from "react";
import { Project } from "@/lib/types";

export function useProjectStats(filteredProjects: Project[]) {
  return useMemo(() => {
    const avgYear =
      filteredProjects.length > 0
        ? Math.round(filteredProjects.reduce((s, p) => s + p.year, 0) / filteredProjects.length)
        : 0;
    const techs = new Set(filteredProjects.flatMap((p) => p.technologies)).size;
    return { avgYear, techs, displayed: filteredProjects.length };
  }, [filteredProjects]);
}
