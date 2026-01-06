import { useState } from "react";
import HomeView from "./views/HomeView";
import ChapterView from "./views/ChapterView";
import { AnimatePresence } from "framer-motion";
import { chapters } from "../../types/chapters";
import AppLayout from "../Template/layout/AppLayout";
import TabView from "./ui/TabsView";

import { capstoneId, firstChapterId, View } from "../../types/chapters";

export default function TemplateContainer() {
  const [view, setView] = useState<View>({ type: "home" });
  const activeChapter =
    view.type === "item" ? chapters.find((c) => c.id === view.id) : undefined;
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      label: "Home",
      content: activeChapter ? <ChapterView id={activeChapter.id} /> : null,
    },
    {
      label: "Note",
      content: null,
    },
  ];

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
          <TabView
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
