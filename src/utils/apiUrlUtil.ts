// apiUrlUtil - build request URLs from a base + path segments + query params (Chapter 9)
//
// NOTE: this file BUILDS urls. src/utils/urlUtil.ts CHECKS urls (Ch3 parse/validate).
// Keep the two separate - different jobs.
//
// Return types are intentionally left off the stubs below so the empty bodies still
// type-check. Add them back as you implement each one.

// ---------- types ----------

// TODO: a query param value. Include undefined/null so "omit empty" works
//       without tripping exactOptionalPropertyTypes.
// export type QueryValue = string | number | boolean | null | undefined;

// TODO: the bag of params handed to buildUrl
// export type QueryParams = Record<string, QueryValue>;

// ---------- Lesson 2: REST resource contract ----------

// TODO: the base url for the demo API
// export const DUMMYJSON_BASE = "https://dummyjson.com";

// TODO: the resources this API exposes. A union type means a typo is a
//       compile error instead of a 404 at runtime.
// export type Resource = "users" | "posts" | "products" | "comments";

// TODO: which sort keys each resource actually supports.
//       Drives the sortBy dropdown in the UI, and proves the point that
//       different resources support different params.
//       Shape: { users: ["id","firstName",...], posts: [...], ... }
//       Use `as const satisfies Record<Resource, readonly string[]>`
// export const SORT_KEYS = {} as const;

// ---------- Lesson 1 + 5: build the url ----------

// Returns: string - the fully composed URL
//
// buildUrl("https://dummyjson.com", ["products"], { sortBy: "price", limit: 5 })
//   -> "https://dummyjson.com/products?sortBy=price&limit=5"
//
// buildUrl("https://dummyjson.com", ["products", "category", "smartphones"], { limit: 1 })
//   -> "https://dummyjson.com/products/category/smartphones?limit=1"
export function buildUrl(base: string, segments: string[], params?: object) {
  // TODO (Lesson 1 + 5):
  //  1. use `new URL()` + `URLSearchParams` - NO string concatenation,
  //     no template literals. That restriction IS the exercise.
  //  2. strip leading/trailing "/" from base and from every segment, then
  //     join with a single "/" so a trailing slash can never produce "//".
  //  3. skip any param whose value is undefined, null or "" (omit-empty).
  //     This is what makes blank fields vanish from the URL in the UI.
  //  4. let URLSearchParams do the encoding - `q=john doe` and
  //     `select=title,price` then come out correct for free.
  //  5. return url.toString()
}

// Returns: string - just the "?a=1&b=2" tail (or "" when no params survive)
export function buildQueryString(params: object) {
  // TODO (Lesson 3 + 5):
  //  - same omit-empty rule as buildUrl
  //  - one "?" to open, "&" between each pair - URLSearchParams handles this
  //  - return "" (not "?") when every param was dropped
}

// ---------- Lesson 1: take the url back apart, for the UI preview ----------

// Returns: { origin, segments, params } | null
export function describeUrl(href: string) {
  // TODO (Lesson 1):
  //  - parse with `getUrl(href)` from ./urlUtil - it already returns
  //    URL | null and handles bad input. Do NOT write a second parser.
  //  - return null when getUrl returns null
  //  - origin:   url.origin
  //  - segments: url.pathname split on "/", empty strings filtered out
  //  - params:   [...url.searchParams] mapped to { key, value }
  //
  //  Heads up: noUncheckedIndexedAccess makes segments[0] `string | undefined`.
  //  Prefer for...of / .map over index access.
}
