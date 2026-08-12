// useApi - raw fetch calls for Chapter 9
//
// Same layering as Ch8: page -> hook -> useApi -> apiFetch.
// The difference: Ch8 glued its URLs together with strings here. Chapter 9
// does NOT build URLs in this file at all - the URL arrives already composed
// by buildUrl(). That separation is the lesson.

// TODO: imports
//  - apiFetch from "../../utils/serviceUtil"

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
export function extractRecords(body: object, resource: string) {
  // TODO:
  //  - read body[resource]
  //  - return it when Array.isArray(...), otherwise return []
  //    (a /search or /category path still nests under the resource name,
  //     so this holds for every path in the docs panel - verify as you go)
}
