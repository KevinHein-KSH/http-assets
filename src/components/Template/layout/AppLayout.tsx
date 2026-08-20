import NavBar from "../layout/NavBar";
import { Button } from "@mui/material";
import { View } from "../../../types/navigation";
import ChapterDropdown from "../ui/ChapterDropdown";
import { appConfig } from "../../../config/appConfig";
import { Layers, HomeIcon, Github } from "lucide-react";

interface AppLayoutProps {
  view: View;
  setView: (v: View) => void;
  children: React.ReactNode;
}

export default function AppLayoutProps({
  view,
  setView,
  children,
}: AppLayoutProps) {
  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => setView({ type: "home" })}
          >
            <span className="inline-flex w-8 h-8 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 text-white shadow-sm">
              <Layers className="w-4 h-4" />
            </span>
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-950 to-purple-600">
              {appConfig.title}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="text"
              size="small"
              onClick={() => setView({ type: "home" })}
              color="inherit"
              className="!text-gray-900"
            >
              <HomeIcon className="mr-2 w-4 h-4" /> Home
            </Button>

            <div className="flex items-center gap-2">
              <ChapterDropdown view={view} setView={setView} />
            </div>

            <Button
              variant="text"
              size="small"
              component="a"
              href={appConfig.repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Github className="mr-2 w-4 h-4" /> GitHub
            </Button>
          </div>
        </div>

        <NavBar view={view} setView={setView} />
      </div>

      {/* Main content area */}
      <div className="mx-auto max-w-7xl px-4 py-6 flex-1 w-full">
        {children}
      </div>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
          Built with ❤ — Chapters & Capstone
        </span>
      </footer>
    </div>
  );
}
