# Chapter 9 — Paths and Parameters

> Renders in the **Note** tab once `registry.tsx` is wired up.

<!-- TODO: your own notes for each lesson, same style as Ch5-Errors/Readme.md -->

## 1. URL Paths

<!-- TODO: what a path is, base + path = fullURL, how paths used to map to
     files on disk and why they mostly don't anymore -->

## 2. RESTful APIs

<!-- TODO: resources vs commands, statelessness, why /v1/ sits in the path,
     and how method + resource combine (GET /users vs DELETE /users/{id}) -->

## 3. Query Parameters

<!-- TODO: ?key=value, optional, server decides which ones exist -->

## 4. The Documentation of an HTTP Server

<!-- TODO: why you don't memorise APIs; what docs must tell you.
     Worth recording: the course's own API (api.boot.dev) now 404s on
     /locations and /items, and rejects sort=level / sort=quality with 400 —
     an accidental but perfect demo of "the server has control". -->

## 5. Multiple Query Parameters

<!-- TODO: "?" opens, "&" separates every pair after that -->

---

## Chapter 8 overlap — migration note

Chapter 9 is the chapter that fixes how Chapter 8 built its URLs. **Ch-8 is deliberately
left unchanged** — this table records what *would* change, and why it matters.

| Ch8 call site | Today | With `buildUrl` | Bug it removes |
|---|---|---|---|
| `useApi.ts:10` | `url + "?limit=1"` | `buildUrl(BASE, ["users"], { limit: 1 })` | breaks if `url` already contains a `?` |
| `useApi.ts:21` | `` `${url}?limit=17&skip=${skip}` `` | `buildUrl(BASE, ["users"], { limit: 17, skip })` | no encoding; magic `17` |
| `useApi.ts:44` (PUT) | `` `${url}/${userId}` `` | `buildUrl(BASE, ["users", String(userId)])` | `//` if `url` ends in a slash |
| `useApi.ts:54` (DELETE) | `` `${url}/${userId}` `` | `buildUrl(BASE, ["users", String(userId)])` | same |

<!-- TODO: add your own take — was Ch8 already RESTful?
     (/users + GET/POST vs /users/{id} + PUT/DELETE is textbook resource-oriented
     design, so Ch8 got the *shape* right before you had the vocabulary for it) -->

---

## API reference used by this chapter

`https://dummyjson.com` — all verified live.

| Path | Params | Notes |
|---|---|---|
| `/users` `/posts` `/products` `/comments` | `limit` `skip` `sortBy` `order` `select` | `GET` |
| `/users/search` | `q` (required) | `GET` |
| `/products/category/{name}` | `limit` `skip` | two-segment path |

Response envelope: `{ <resource>: [...], total, skip, limit }`
