import { useState, useEffect } from "react";
import HomeView from "./views/HomeView";
import ChapterView from "./views/ChapterView";
import { AnimatePresence } from "framer-motion";
import { chapters } from "../../types/chapters";
import AppLayout from "../Template/layout/AppLayout";
import TabView from "./ui/TabsView";
import ReactMarkdown from "react-markdown";

import { capstoneId, firstChapterId, View } from "../../types/chapters";

export default function TemplateContainer() {
  const [view, setView] = useState<View>({ type: "home" });
  const [activeTab, setActiveTab] = useState(0);
  const activeChapter =
    view.type === "item" ? chapters.find((c) => c.id === view.id) : undefined;
  const tabs = [
    {
      label: "Home",
      content: activeChapter ? (
        <ChapterView key={activeChapter.id} id={activeChapter.id} />
      ) : (
        <div className="p-4">No chapter selected.</div>
      ),
    },
    {
      label: "Note",
      content: activeChapter?.notePath ? (
        <div className="markdown-body p-6 bg-white text-black rounded-lg">
          <ReactMarkdown>{activeChapter.notePath}</ReactMarkdown>
        </div>
      ) : (
        <div className="readme markdown-body p-6 bg-white text-black rounded-lg">
          <div className="text-center font-bold">
            No notes available for this chapter
          </div>
        </div>
      ),
    },
  ];
  useEffect(() => {
    setActiveTab(0);
  }, [activeChapter?.id]); // Reset to first tab when chapter changes

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
