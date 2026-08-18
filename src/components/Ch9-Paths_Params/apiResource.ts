// apiResource - raw fetch calls for Chapter 9's REST resources
//
// NOT a hook, despite what Ch8's equivalent is called. No useState, no
// useCallback, no React - just async functions, so rules-of-hooks don't
// apply. Real hooks live in ./hooks/. Ch8 named this useApi.ts; Ch9 drops
// the misleading `use` prefix.
//
// Same layering as Ch8: page -> hook -> apiResource -> apiFetch.
// The difference: Ch8 glued its URLs together with strings here. Chapter 9
// does NOT build URLs in this file at all - the URL arrives already composed
// by buildUrl(). That separation is the lesson.

// TODO: imports
//  - apiFetch from "../../utils/serviceUtil"

// ---------- what dummyjson specifically offers ----------
//
// These live here, not in utils/urlUtil.ts, because they are facts about ONE
// api. urlUtil stays vendor-neutral so Ch1/Ch4/Ch5/Ch8 - which each use a
// different api - can share it. Every other chapter declares its endpoints
// locally too (see Ch4's REQUESTS table in AsyncDemo.tsx).

// TODO: the base url for this chapter's api
// export const DUMMYJSON_BASE = "https://dummyjson.com";

// TODO: the resources this api exposes. A union type means a typo is a
//       compile error instead of a 404 at runtime.
// export type Resource = "users" | "posts" | "products" | "comments";

// TODO: which sort keys each resource actually supports.
//       Drives the sortBy dropdown in the UI, and proves the point that
//       different resources support different params.
//       Shape: { users: ["id","firstName",...], posts: [...], ... }
//       Use `as const satisfies Record<Resource, readonly string[]>`
// export const SORT_KEYS = {} as const;

// The dummyjson response envelope, e.g.
//   { products: [...], total: 194, skip: 0, limit: 5 }
// The records live under a key NAMED AFTER THE RESOURCE, which is itself a
// nice illustration of REST resource naming.
//
// TODO: type it
// export type ResourceResponse = {
//   total: number;
//   skip: number;
//   limit: number;
// } & Record<string, unknown>;

// Returns: Promise<ResourceResponse>
//
// NOTE: apiFetch is typed `Promise<any>`, so narrow the result to
// ResourceResponse HERE, at the boundary. Do not edit serviceUtil.ts -
// it is shared with Ch8.
export async function fetchResource(fullUrl: string, apiKey: string) {
  // TODO:
  //  - await apiFetch(fullUrl, apiKey, "GET")
  //  - apiFetch already throws `HTTP error! status: ${status}` on !response.ok,
  //    which is exactly how the Lesson 4 "400 bad sort key" demo surfaces.
  //    Let it throw - the hook catches it.
  //  - return the narrowed response
}

// Returns: unknown[] - pulls the record array out of the envelope
//
// Helper, because the array key changes per resource:
//   /users    -> body.users
//   /products -> body.products
// Tighten `resource` to the Resource union above once it is defined.
export function extractRecords(body: object, resource: string) {
  // TODO:
  //  - read body[resource]
  //  - return it when Array.isArray(...), otherwise return []
  //    (a /search or /category path still nests under the resource name,
  //     so this holds for every path in the docs panel - verify as you go)
}
