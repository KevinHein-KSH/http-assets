// apiResource - Chapter 9's API layer. Rationale in LESSON_PLAN.md §6.2.

import { apiFetch } from "../../utils/serviceUtil";

export const DUMMYJSON_BASE = "https://dummyjson.com";

export type Resource = "users" | "posts" | "products" | "comments";

export const SORT_KEYS = {
  users: ["id", "firstName", "lastName", "age", "email", "username"],
  posts: ["id", "title", "views"],
  products: ["id", "title", "price", "rating", "stock"],
  comments: [],
} as const satisfies Record<Resource, readonly string[]>;

export const METHOD_DOCS = [
  { method: "GET",    path: "/products",     note: "list; takes query params" },
  { method: "GET",    path: "/products/2",   note: "one item; id is a path segment" },
  { method: "POST",   path: "/products/add", note: "NOT /products - that 404s" },
  { method: "PUT",    path: "/products/2",   note: "update" },
  { method: "DELETE", path: "/products/2",   note: "remove" },
];

export const PARAM_DOCS = [
  { param: "sortBy", example: "?sortBy=price",        note: "field to sort on; must be a real field name" },
  { param: "order",  example: "?order=desc",          note: "asc | desc - only meaningful beside sortBy" },
  { param: "limit",  example: "?limit=5",             note: "how many records; 0 means no limit" },
  { param: "skip",   example: "?skip=10",             note: "how many to skip - paging, with limit" },
  { param: "select", example: "?select=title,price",  note: "comma-separated fields; id always comes back" },
  { param: "q",      example: "/products/search?q=phone", note: "SEARCH ONLY - ignored on a plain collection" },
];

export type ResourceResponse = {
  total?: number;
  skip?: number;
  limit?: number;
} & Record<string, unknown>;

export async function fetchResource(fullUrl: string, apiKey: string) : Promise<ResourceResponse> {
  const responResources = await apiFetch(fullUrl, apiKey, "GET")
  return responResources;
}

export function extractRecords(body: ResourceResponse, resource: Resource): unknown[] {
  const records = body[resource];
  if (Array.isArray(records)) {
    return records;
  } else {
    return [];
  }
}
