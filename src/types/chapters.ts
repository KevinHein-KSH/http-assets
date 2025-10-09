type ChapterKind = "chapter" | "project";

interface Chapter {
  id: string;
  label: string;
  kind: ChapterKind;
  description?: string;
  href?: string;
  externalUrl?: string;
}

export const chapters: Chapter[] = [
  { id: "ch-01", label: "Chapter 1", kind: "chapter", description: "Intro & Basics" },
  { id: "ch-02", label: "Chapter 2", kind: "chapter", description: "State & Props" },
  { id: "ch-03", label: "Chapter 3", kind: "chapter", description: "Lists & Keys" },
  { id: "ch-04", label: "Chapter 4", kind: "chapter", description: "Forms" },
  { id: "ch-05", label: "Chapter 5", kind: "chapter", description: "Effects" },
  { id: "ch-06", label: "Chapter 6", kind: "chapter", description: "Context" },
  { id: "ch-07", label: "Chapter 7", kind: "chapter", description: "Performance" },
  { id: "ch-08", label: "Chapter 8", kind: "chapter", description: "Routing" },
  { id: "ch-09", label: "Chapter 9", kind: "chapter", description: "Data Fetching" },
  { id: "ch-10", label: "Chapter 10", kind: "chapter", description: "Testing" },
  {
    id: "project-final",
    label: "Capstone Project",
    kind: "project",
    description: "Built from chapters 1–10",
    href: "https://github.com/yourname/your-capstone-repo",
    externalUrl: "https://your-live-demo-url.example.com",
  },
];

// idsAndTypes start
export const firstChapterId = chapters.find((c) => c.kind === "chapter")?.id ?? "ch-01";
export const capstoneId = chapters.find((c) => c.kind === "project")?.id ?? "project-final";

export type View = { type: "home" } | { type: "item"; id: string };