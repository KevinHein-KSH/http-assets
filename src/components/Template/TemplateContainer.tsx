import { useEffect, useMemo, useState } from "react";
import TabView from "./ui/TabsView";
import HomeView from "./views/HomeView";
import ReactMarkdown from "react-markdown";
import ChapterView from "./views/ChapterView";
import { AnimatePresence } from "framer-motion";
import { chapters } from "../../types/chapters";
import AppLayout from "../Template/layout/AppLayout";
import { capstoneId, firstChapterId, View } from "../../types/chapters";
import { getChapterContent } from "./registry";

export default function TemplateContainer() {
  const [view, setView] = useState<View>({ type: "home" });
  const [activeTab, setActiveTab] = useState(0);

  const activeChapter =
    view.type === "item" ? chapters.find((c) => c.id === view.id) : undefined;

  const chapterContent = activeChapter ? getChapterContent(activeChapter.id) : undefined;

  useEffect(() => {
    setActiveTab(0);
  }, [activeChapter?.id]);

  const tabs = useMemo(
    () => [
      {
        label: "Home",
        content: activeChapter ? <ChapterView id={activeChapter.id} /> : null,
      },
      {
        label: "Note",
        content: chapterContent?.note ? (
          <div className="markdown-body p-6 bg-white text-black rounded-lg">
            <ReactMarkdown>{chapterContent.note}</ReactMarkdown>
          </div>
        ) : (
          <div className="markdown-body p-6 bg-white text-black rounded-lg">
            <div className="text-center font-bold">No notes available</div>
          </div>
        ),
      },
    ],
    [activeChapter, chapterContent],
  );

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
