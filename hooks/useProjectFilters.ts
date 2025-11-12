// /hooks/useProjectFilters.ts
import { useMemo, useCallback, useState } from "react";
import { projects as allProjects, Project } from "@/lib/types";
import { useDebounce } from "@/components/projects/controls/useDebounce";

export function useProjectFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"year" | "domain" | "title">("year");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const debouncedSearch = useDebounce(searchQuery, 300);

  const availableCategories = useMemo(() => Array.from(new Set(allProjects.map((p) => p.category))).sort(), []);
  const availableDomains = useMemo(() => Array.from(new Set(allProjects.map((p) => p.domain))).sort(), []);

  const filteredProjects = useMemo(() => {
    let list: Project[] = allProjects;

    if (selectedCategory !== "all") list = list.filter((p) => p.category === selectedCategory);
    if (selectedDomain !== "all") list = list.filter((p) => p.domain === selectedDomain);
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case "year":
          return b.year - a.year;
        case "domain":
          return a.domain.localeCompare(b.domain);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [selectedCategory, selectedDomain, debouncedSearch, sortBy]);

  const featuredProject = useMemo(
    () => allProjects.find((p) => p.id === "strategic-merger-ott") ?? allProjects[0],
    []
  );

  const uniqueTechCount = useMemo(() => {
    const set = new Set<string>();
    allProjects.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return set.size;
  }, []);

  const countsByCategory = useMemo(() => {
    const map = new Map<string, number>();
    allProjects.forEach((p) => map.set(p.category, (map.get(p.category) || 0) + 1));
    return map;
  }, []);

  const countsByDomain = useMemo(() => {
    const map = new Map<string, number>();
    allProjects.forEach((p) => map.set(p.domain, (map.get(p.domain) || 0) + 1));
    return map;
  }, []);

  return {
    // state
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedDomain,
    setSelectedDomain,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    // derived
    filteredProjects,
    availableCategories,
    availableDomains,
    featuredProject,
    uniqueTechCount,
    countsByCategory,
    countsByDomain,
    allProjects,
  };
}
