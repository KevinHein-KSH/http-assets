import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Github } from "lucide-react";
import { Suspense } from "react";
import { chapters } from "../../../types/chapters";
import { componentRegistry } from "../registry";

interface ChapterViewProps {
  id: string;
}

export default function ChapterView({ id }: ChapterViewProps) {
  const chapter = chapters.find((c) => c.id === id);
  if (!chapter) {
    return <div>Chapter not found</div>;
  }

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      {chapter && (
        <div className="flex w-full items-center justify-between gap-2">
          {/* Left side: Chapter + description */}
          <div className="min-w-0">
            <div className="text-xl font-semibold text-gray-900">
              {chapter.label}
              {chapter.description && (
                <span className="text-sm text-gray-600">
                  {" "}
                  – {chapter.description}
                </span>
              )}
            </div>
          </div>

          {/* Right side: Branch button */}
          <div className="flex items-center gap-2">
            {chapter.href && (
              <Button
                component="a"
                href={chapter.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="small"
                sx={{
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    opacity: 0.6,
                  },
                  "&:focus-visible": {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: "2px",
                  },
                }}
              >
                <Github className="mr-2 size-4" /> Branch
              </Button>
            )}
            {/* future live link button */}
            {/* {chapter.externalUrl && (
                <Button
                component="a"
                href={chapter.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                variant="contained"
                sx={{
                    bgcolor: "purple.600",
                    "&:hover": { bgcolor: "purple.600", opacity: 0.9 },
                }}
                >
                Live
                </Button>
            )} */}
          </div>
        </div>
      )}

      {/* CONTENT SECTION */}
      <div className="w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="w-full overflow-x-auto">
            {componentRegistry[id] ?? (
              <div>Content not found for this chapter.</div>
            )}
          </div>
        </Suspense>
      </div>
    </motion.div>
  );
}
