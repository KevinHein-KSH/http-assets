import { Layers, HomeIcon, Github } from "lucide-react";
import { Button } from "@mui/material";
import { chapters } from "../../types/chapters";
import { View } from "../../types/chapters";
import { appConfig } from "../../config/appConfig";
import FormDropDown from "./FormDropDown";

export default function HeaderBar({ view, setView }: { view: View; setView: (v: View) => void }) {
  return (
    <div className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => setView({ type: "home" })}
        >
          <span className="inline-flex size-8 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/90 to-purple-600 text-white shadow-sm">
            <Layers className="size-4" />
          </span>
          <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            {appConfig.title}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="text"
            size="small"
            onClick={() => setView({ type: "home" })}
            className="hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary"
          >
            <HomeIcon className="mr-2 size-4" /> Home
          </Button>
          <div className="flex items-center gap-2">
            <label className="sr-only">Select chapter</label>
            <FormDropDown view={view} setView={setView} />
          </div>
          <Button
            variant="text"
            size="small"
            component="a"
            href={appConfig.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Github className="mr-2 size-4" /> GitHub
          </Button>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-3">
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-purple-600/10 to-primary/10 p-1 overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max">
            {chapters
              .filter((c) => c.kind === "chapter")
              .map((c) => (
                <Button
                  key={c.id}
                  onClick={() => setView({ type: "item", id: c.id })}
                  size="small"
                  variant={view.type === "item" && view.id === c.id ? "contained" : "text"}
                  aria-current={view.type === "item" && view.id === c.id ? "page" : undefined}
                  className={`whitespace-nowrap rounded-xl focus-visible:ring-2 focus-visible:ring-primary ${
                    view.type === "item" && view.id === c.id
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "hover:bg-primary/10"
                  }`}
                >
                  {c.label}
                </Button>
              ))}
            {chapters
              .filter((c) => c.kind === "project")
              .map((p) => (
                <Button
                  key={p.id}
                  onClick={() => setView({ type: "item", id: p.id })}
                  size="small"
                  variant={view.type === "item" && view.id === p.id ? "contained" : "text"}
                  aria-current={view.type === "item" && view.id === p.id ? "page" : undefined}
                  className={`whitespace-nowrap rounded-xl focus-visible:ring-2 focus-visible:ring-primary ${
                    view.type === "item" && view.id === p.id
                      ? "bg-purple-600 text-white hover:bg-purple-600/90"
                      : "hover:bg-purple-600/10"
                  }`}
                >
                  {p.label}
                </Button>
              ))}
          </div>
        </div>
        <div className="text-sm mt-2">
          {(() => {
            if (view.type !== "item") return null;
            const active = chapters.find((c) => c.id === view.id);
            if (!active) return null;
            return (
              <>
                <span className="text-foreground/80">Currently viewing:</span>{" "}
                <span className="font-semibold text-primary">{active.label}</span>
                {active.description ? <span className="text-foreground/70"> — {active.description}</span> : null}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}