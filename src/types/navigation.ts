// navigation - the app-shell model: which chapters exist, and which one the UI
// is currently showing. Consumed only by components/Template/.
//
// Renamed from chapters.ts on 2026-08-20. The old name described half of what
// the file had become; chapter-owned domain types now live with their chapter
// (see Ch9 LESSON_PLAN §11).

// chapters - the app-shell navigation model: which chapters exist, and which
// one the UI is currently showing. Consumed only by components/Template/.
//
// The Chapter 8 user domain used to live here too; it moved out on 2026-08-20
// (see Ch9 LESSON_PLAN §11) to src/types/user.ts and
// components/Ch8-HTTP_Methods/types.ts.

type ChapterKind = "chapter" | "project";

export interface Chapter {
  id: string;
  label: string;
  kind: ChapterKind;
  description?: string;
  href?: string;
  externalUrl?: string;
}

export const chapters: Chapter[] = [
  {
    id: "ch-01",
    label: "Chapter 1",
    kind: "chapter",
    description: "Fetch",
    href: "https://github.com/KevinHein-KSH/http-assets/tree/Ch-1-Fetch-API",
    externalUrl: "https://your-live-demo-url.example.com",
  },
  {
    id: "ch-02",
    label: "Chapter 2",
    kind: "chapter",
    description: "DNS",
    href: "https://github.com/KevinHein-KSH/http-assets/tree/Ch-2-DNS",
    externalUrl: "https://your-live-demo-url.example.com",
  },
  {
    id: "ch-03",
    label: "Chapter 3",
    kind: "chapter",
    description: "URL",
    href: "https://github.com/KevinHein-KSH/http-assets/tree/Ch-3-URL",
    externalUrl: "https://your-live-demo-url.example.com",
  },
  {
    id: "ch-04",
    label: "Chapter 4",
    kind: "chapter",
    description: "Async",
    href: "https://github.com/KevinHein-KSH/http-assets/tree/Ch-4-Async-JS",
    externalUrl: "https://your-live-demo-url.example.com",
  },
  {
    id: "ch-05",
    label: "Chapter 5",
    kind: "chapter",
    description: "Errors",
    href: "https://github.com/KevinHein-KSH/http-assets/tree/Ch-5-Errors",
    externalUrl: "https://your-live-demo-url.example.com",
  },
  {
    id: "ch-06",
    label: "Chapter 6",
    kind: "chapter",
    description: "Header",
    href: "https://github.com/KevinHein-KSH/http-assets/tree/Ch-6-Headers",
    externalUrl: "https://your-live-demo-url.example.com",
  },
  {
    id: "ch-07",
    label: "Chapter 7",
    kind: "chapter",
    description: "JSON",
    href: "https://github.com/KevinHein-KSH/http-assets/tree/Ch-7-JSON",
    externalUrl: "https://your-live-demo-url.example.com",
  },
  {
    id: "ch-08",
    label: "Chapter 8",
    kind: "chapter",
    description: "Http Methods",
    href: "https://github.com/KevinHein-KSH/http-assets/tree/Ch-8-HTTP-Methods",
    externalUrl: "https://your-live-demo-url.example.com",
  },
  {
    id: "ch-09",
    label: "Chapter 9",
    kind: "chapter",
    description: "Paths and Parameters",
    href: "https://github.com/KevinHein-KSH/http-assets/tree/Ch-9-Paths-Params",
    externalUrl: "https://your-live-demo-url.example.com",
  },
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
export const firstChapterId =
  chapters.find((c) => c.kind === "chapter")?.id ?? "ch-01";
export const capstoneId =
  chapters.find((c) => c.kind === "project")?.id ?? "project-final";

export type View = { type: "home" } | { type: "item"; id: string };
