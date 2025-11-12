// /components/projects/preview/ProjectPreviewDialog.tsx
import React, { memo } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "@/lib/types";
import { ProjectPreviewContent } from "@/components/projects/preview/ProjectPreviewContent";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export const ProjectPreviewDialog = memo(function ProjectPreviewDialog({ project, onClose }: Props) {
  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden" onInteractOutside={onClose} onEscapeKeyDown={onClose}>
        <AnimatePresence mode="wait">
          {project && (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              <ProjectPreviewContent project={project} onClose={onClose} />
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
});
ProjectPreviewDialog.displayName = "ProjectPreviewDialog";
