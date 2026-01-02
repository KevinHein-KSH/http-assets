import { useState } from "react";
import HomeView from "./views/HomeView";
import ChapterView from "./views/ChapterView";
import { AnimatePresence } from "framer-motion";
import { chapters } from "../../types/chapters";
import AppLayout from "../Template/layout/AppLayout";

import { capstoneId, firstChapterId, View } from "../../types/chapters";

export default function TemplateContainer() {
  const [view, setView] = useState<View>({ type: "home" });
  const activeChapter =
    view.type === "item"
      ? chapters.find((c) => c.id === view.id)
      : undefined;
  return (
    <AppLayout view={view} setView={setView}>
      <AnimatePresence mode="wait">
          {view.type === "home" ? (
            <HomeView
              key="home"
              onStart={() => setView({ type: "item", id: firstChapterId })}
              onOpenCapstone={() => setView({ type: "item", id: capstoneId })}
            />
          ) : (
            <ChapterView key={view.id} id={view.id} />
          )}
        </AnimatePresence>
    </AppLayout>
  );
}
