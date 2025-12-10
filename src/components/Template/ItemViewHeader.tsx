import { Button } from "@mui/material";
import { Github } from "lucide-react";

type ItemHeaderProps = {
  chapter: {
    label: string;
    description?: string;
    href?: string;
    externalUrl?: string;
  };
};

export default function ItemViewHeader({ chapter }: ItemHeaderProps) {
  return (
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
            rel="noreferrer"
            variant="contained"
            size="small"
            className="border-primary text-primary hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary"
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
  );
}
