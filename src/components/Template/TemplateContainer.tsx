import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import HeaderBar from "./HeaderBar";
import HomeView from "./HomeView";
import ItemView from "./ItemVIew";
import { chapters } from "../../types/chapters";

import { capstoneId, firstChapterId, View } from "../../types/chapters";

export default function TemplateContainer() {
  const [view, setView] = useState<View>({ type: "home" });
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background [--tw-gradient-from:theme(colors.background)] [--tw-gradient-to:theme(colors.muted)/.6] text-foreground">
      <HeaderBar view={view} setView={setView} />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <AnimatePresence mode="wait">
          {view.type === "home" ? (
            <HomeView
              key="home"
              onStart={() => setView({ type: "item", id: firstChapterId })}
              onOpenCapstone={() => setView({ type: "item", id: capstoneId })}
            />
          ) : (
            <ItemView key={view.id} id={view.id} />
          )}
        </AnimatePresence>
      </div>
      <footer className="border-t py-6 text-center text-sm">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">Built with ❤ — Chapters & Capstone</span>
      </footer>
    </div>
  );
}