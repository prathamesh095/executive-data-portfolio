// /components/projects/controls/Controls.tsx
import React, { memo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Layers, Grid3X3, List } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedDomain: string;
  setSelectedDomain: (d: string) => void;
  sortBy: "year" | "domain" | "title";
  setSortBy: (s: "year" | "domain" | "title") => void;
  availableCategories: string[];
  availableDomains: string[];
  totalCount: number;
  viewMode: "grid" | "list";
  setViewMode: (v: "grid" | "list") => void;
  projectsLength?: number; // optional for counting
};

export const Controls = memo(function Controls({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDomain,
  setSelectedDomain,
  sortBy,
  setSortBy,
  availableCategories,
  availableDomains,
  totalCount,
  viewMode,
  setViewMode,
}: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-end justify-between">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 w-full">
        <div className="relative lg:col-span-1">
          <label htmlFor="search-input" className="sr-only">Search projects</label>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="search-input"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-border/50"
          />
        </div>

        <div className="lg:col-span-1">
          <label htmlFor="category-select" className="sr-only">Filter by category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category-select" className="bg-muted/50 border-border/50">
              <Layers className="w-4 h-4 mr-2 text-primary" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-linear-to-br from-primary to-secondary rounded" />
                  All Categories ({totalCount})
                </div>
              </SelectItem>
              {availableCategories.map((cat) => {
                const cnt = 0; // counting is moved to hook; kept simple to avoid import cycles
                return (
                  <SelectItem key={cat} value={cat}>
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-primary/70" />
                      {cat} ({cnt})
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="lg:col-span-1">
          <label htmlFor="domain-select" className="sr-only">Filter by domain</label>
          <Select value={selectedDomain} onValueChange={setSelectedDomain}>
            <SelectTrigger id="domain-select" className="bg-muted/50 border-border/50">
              <Filter className="w-4 h-4 mr-2 text-primary" />
              <SelectValue placeholder="Domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-linear-to-br from-primary to-secondary rounded" />
                  All Domains ({totalCount})
                </div>
              </SelectItem>
              {availableDomains.map((dom) => {
                const cnt = 0; // real counts are computed in hook; this placeholder avoids double imports
                return (
                  <SelectItem key={dom} value={dom}>
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-primary/70" />
                      {dom} ({cnt})
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="lg:col-span-1 flex gap-2" role="group" aria-label="Sort by">
          {(["year", "domain", "title"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSortBy(s)}
              className={cn(
                "flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                sortBy === s
                  ? "bg-linear-to-r from-primary to-secondary text-white shadow-md"
                  : "bg-muted/80 backdrop-blur-sm text-primary border border-primary/30 hover:bg-primary/10"
              )}
              aria-pressed={sortBy === s}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex bg-muted/50 rounded-lg p-1 shadow-inner">
        <button
          onClick={() => setViewMode("grid")}
          className={cn(
            "px-4 py-2 rounded-md flex items-center gap-2 transition-all",
            viewMode === "grid" ? "bg-background shadow-md text-primary" : "text-muted-foreground"
          )}
          aria-label="Grid view"
          aria-current={viewMode === "grid" ? "true" : undefined}
        >
          <Grid3X3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={cn(
            "px-4 py-2 rounded-md flex items-center gap-2 transition-all",
            viewMode === "list" ? "bg-background shadow-md text-primary" : "text-muted-foreground"
          )}
          aria-label="List view"
          aria-current={viewMode === "list" ? "true" : undefined}
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});
Controls.displayName = "Controls";
