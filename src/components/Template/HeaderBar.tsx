import { Layers, HomeIcon, Github } from "lucide-react";
import { Button } from "@mui/material";
import { chapters } from "../../types/chapters";
import { View } from "../../types/chapters";
import { appConfig } from "../../config/appConfig";
import FormDropDown from "./FormDropDown";

export default function HeaderBar({ view, setView }: { view: View; setView: (v: View) => void }) {
  return (
    <div className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
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
            <FormDropDown view={view} setView={setView} />
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
      
      <div className="mx-auto max-w-7xl px-4 pb-3">
        <div className="rounded-2xl bg-gradient-to-r from-primary via-purple-600/15 to-primary p-1 overflow-x-auto bg-gray-100">
          <div className="flex items-center justify-around gap-1 min-w-max">
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
                      ? "bg-blue-600 text-blue-600-foreground hover:bg-blue-600/90"
                      : "hover:bg-blue-600/10"
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
                <span className="text-gray-900/80">Currently viewing:</span>{" "}
                <span className="font-semibold text-blue-600">{active.label}</span>
                {active.description ? <span className="text-gray-900/70"> — {active.description}</span> : null}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}