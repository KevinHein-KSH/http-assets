// apiResource - Chapter 9's API layer: what dummyjson offers, and the one
// call that talks to it.
//
// NOT a hook, despite what Ch8's equivalent is called. No useState, no
// useCallback, no React - just async functions, so rules-of-hooks don't
// apply. Real hooks live in ./hooks/. Ch8 named this useApi.ts; Ch9 drops
// the misleading `use` prefix.
//
// Layering, same as Ch8: page -> hook -> apiResource -> apiFetch.
// The difference: Ch8 glued its URLs together with strings here. Chapter 9
// does NOT build URLs in this file at all - the URL arrives already composed
// by buildUrl(). That separation is the lesson.

// TODO: imports
//  - apiFetch from "../../utils/serviceUtil"

// ---------- what dummyjson offers (verified live 2026-08-18) ----------
//
// These live here, not in utils/urlUtil.ts, because they are facts about ONE
// api. urlUtil stays vendor-neutral so Ch1/Ch4/Ch5/Ch8 - which each use a
// different api - can share it.

export const DUMMYJSON_BASE = "https://dummyjson.com";

export type Resource = "users" | "posts" | "products" | "comments";

// Which sort keys the server ACTUALLY honours - each one confirmed by
// comparing order=asc against order=desc. Note `comments`: dummyjson ignores
// sorting there entirely, which is lesson 4 in one line. Left empty on
// purpose so the UI can disable the dropdown - do not list keys that
// silently do nothing.
export const SORT_KEYS = {
  users: ["id", "firstName", "lastName", "age", "email", "username"],
  posts: ["id", "title", "views"],
  products: ["id", "title", "price", "rating", "stock"],
  comments: [],
} as const satisfies Record<Resource, readonly string[]>;

// Lesson 4 material - DOCUMENTATION ONLY, deliberately not implemented.
// Ch8 already runs POST/PUT/DELETE; Ch9's job is the path, not the verb.
// TODO: render this in a collapsible <details> at the bottom of the page.
// export const METHOD_DOCS = [
//   { method: "GET",    path: "/products",     note: "list; takes query params" },
//   { method: "GET",    path: "/products/2",   note: "one item; id is a path segment" },
//   { method: "POST",   path: "/products/add", note: "NOT /products - that 404s" },
//   { method: "PUT",    path: "/products/2",   note: "update" },
//   { method: "DELETE", path: "/products/2",   note: "remove" },
// ];
//
// Three verified quirks worth showing beside that table, because each one
// fails SILENTLY rather than erroring - which is the whole point of lesson 4:
//   - POST /products    -> 404. dummyjson wants /products/add. REST says you
//     post to the collection; this server disagrees. Read the docs, not the rule.
//   - /comments         -> ignores every sort key. asc and desc return the same rows.
//   - ?sortBy=nonsense  -> 200 with unsorted data and no warning.

// The dummyjson response envelope for a LIST, e.g.
//   { products: [...], total: 194, skip: 0, limit: 5 }
// The records live under a key NAMED AFTER THE RESOURCE, which is itself a
// nice illustration of REST resource naming.
//
// Heads up: GET-one (/products/2) returns the BARE object with no envelope,
// so this type does not describe it. Handle both shapes.
//
// TODO: type it
// export type ResourceResponse = {
//   total: number;
//   skip: number;
//   limit: number;
// } & Record<string, unknown>;

// Returns: Promise<ResourceResponse>
//
// ONE generic call for the whole chapter - unlike Ch8's five bespoke
// functions (createUser, updateUser, ...). Ch9's lesson is paths, so the URL
// varies and the call does not.
//
// NOTE: apiFetch is typed `Promise<any>`, so narrow the result HERE, at the
// boundary. Do not edit serviceUtil.ts - it is shared with Ch8.
export async function fetchResource(fullUrl: string, apiKey: string) {
  // TODO:
  //  - await apiFetch(fullUrl, apiKey, "GET")
  //  - apiFetch already throws `HTTP error! status: ${status}` on !response.ok.
  //    Let it throw - the hook catches it.
  //  - return the narrowed response
}

// Returns: unknown[] - pulls the record array out of a LIST envelope.
//
// Helper, because the array key changes per resource:
//   /users    -> body.users
//   /products -> body.products
export function extractRecords(body: object, resource: Resource) {
  // TODO:
  //  - read body[resource]
  //  - return it when Array.isArray(...), otherwise return []
  //  - GET-one has no envelope and no array; returning [] there is fine as
  //    long as the page renders the raw body in that case.
}
