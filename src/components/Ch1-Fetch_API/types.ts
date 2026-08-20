// Chapter 1's own types. ApiUser describes the escuelajs /users payload and
// is consumed only inside this folder, so by the placement rule (Ch9
// LESSON_PLAN §11) it lives here rather than in src/types/.

export type ApiUser = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: "customer" | "admin" | "seller";
  avatar: string;
  creationAt: string; // ISO string from API
  updatedAt: string; // ISO string from API
};
