import { Button } from "@mui/material";
import { View, chapters } from "../../../types/navigation";

interface NavigationBarProps {
  view: View;
  setView: (v: View) => void;
}

export default function NavigationBar({ view, setView }: NavigationBarProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-3">
      {/* Navigation ribbon - from old HeaderBar.tsx bottom section */}
      <div className="rounded-full pt-1.5 pb-1.5 bg-gradient-to-r from-primary via-purple-700/50 to-primary p-1 overflow-x-auto bg-gray-100">
        <div className="flex items-center justify-around gap-1 min-w-max">
          {/* Chapter buttons - from old HeaderBar.tsx */}
          {chapters
            .filter((c) => c.kind === "chapter")
            .map((c) => (
              <Button
                key={c.id}
                onClick={() => setView({ type: "item", id: c.id })}
                size="small"
                variant={view.type === "item" && view.id === c.id ? "contained" : "text"}
                aria-current={view.type === "item" && view.id === c.id ? "page" : undefined}
                className={`whitespace-nowrap !px-4 !rounded-xl ${
                  view.type === "item" && view.id === c.id
                    ? "!bg-white/80 !text-gray-500 shadow-md"
                    : "hover:bg-gray-10"
                }`}
              >
                {c.label}
              </Button>
            ))}
          {/* Project buttons - from old HeaderBar.tsx */}
          {chapters
            .filter((c) => c.kind === "project")
            .map((p) => (
              <Button
                key={p.id}
                onClick={() => setView({ type: "item", id: p.id })}
                size="small"
                variant={view.type === "item" && view.id === p.id ? "contained" : "text"}
                aria-current={view.type === "item" && view.id === p.id ? "page" : undefined}
                className={`whitespace-nowrap !rounded-xl focus-visible:ring-2 focus-visible:ring-primary ${
                  view.type === "item" && view.id === p.id
                    ? "!bg-white/80 !text-gray-500 shadow-md"
                    : "hover:bg-gray-10"
                }`}
              >
                {p.label}
              </Button>
            ))}
        </div>
      </div>

      {/* Current viewing text - from old HeaderBar.tsx */}
      <div className="text-sm mt-2">
        {(() => {
          if (view.type !== "item") return null;
          const active = chapters.find((c) => c.id === view.id);
          if (!active) return null;
          return (
            <>
              <span className="text-gray-900/80">Currently viewing:</span>{" "}
              <span className="font-semibold text-blue-600">{active.label}</span>
              {active.description ? (
                <span className="text-gray-900/70"> — {active.description}</span>
              ) : null}
            </>
          );
        })()}
      </div>
    </div>
  );
}