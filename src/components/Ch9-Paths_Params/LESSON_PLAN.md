# Chapter 9 — Paths and Parameters · Lesson Plan & Handoff

**Audience: an AI assistant (any model, any session) picking up this module, or Kevin returning to it.**
Read this file top to bottom before touching anything in `src/components/Ch9-Paths_Params/`.

- **Branch:** `Ch-9-Paths-Params`, based on `Ch-8-HTTP-Methods` @ `e795804`
- **Status:** `urlUtil.ts` PART 2 done (`buildUrl`, `describeUrl`); `PathsAndParams.tsx` is a stub
- **Structure:** 3 code files — page → hook → `apiResource` → `apiFetch`. UI is one component; see §3
- **Course ref:** <https://github.com/bootdotdev/fcc-learn-http-assets/tree/main/course/9-paths-and-parameters>
- **Facts below verified:** 2026-08-18

---

## 0. Ground rules — read these first

These are explicit instructions from Kevin. Violating them is the main failure mode here.

| Rule | Detail |
|---|---|
| **Do not implement the logic** | Kevin is working through the course to *learn*. The scaffold is intentionally empty. Write code only when he explicitly asks for that specific piece. Default to explaining, reviewing, and unblocking. |
| **Do not touch Chapter 8** | `src/components/Ch8-HTTP_Methods/**` and `src/utils/serviceUtil.ts` stay unchanged. The Ch8 overlap is *documented* in `Readme.md`, not applied. |
| **Stay inside the lesson scope** | No `AbortController`, no debounce, no URL-state/address-bar sync, no localStorage persistence. These were considered and explicitly cut. |
| **No unrequested refactors** | Discussing an improvement is not approval to apply it. Wait for an explicit go-ahead. |
| **Branch chain** | New chapter branches come from the **previous chapter**, never from `develop`. `Ch-8-HTTP-Methods` → `Ch-9-Paths-Params`. |
| **Commit the scaffold** | Uncommitted work follows you across checkouts and dies to a "discard all". This scaffold was lost once that way. Keep it committed. |
| **Keep this file current** | This document is expected to drift as the build progresses. Updating it is part of the work, not an afterthought — see §0.1. |

### 0.1 This is a living document

Plans change. Better ideas show up halfway through a build, APIs go down, an approach turns out
to be awkward once it meets real code. **A stale plan is worse than no plan**, because the next
session trusts it. So this file is meant to be edited.

**Update it in the same turn as the change it describes** — not "later". If you changed the code
and the doc now lies, you are not done.

#### What you may update freely

| Trigger | What to do |
|---|---|
| A stub gets implemented | Move it from TODO to done in the §6 file map; note anything surprising |
| An API fact changes (endpoint dies, param renamed, new one found) | Fix §2 **and** update the "verified" date in the header |
| A new repo pattern is adopted, or an existing one turns out to be wrong | Correct §3 |
| A tsconfig trap bites in a new place | Add it to §4 |
| The UI drifts from the mockup | Redraw §5 to match what actually exists |
| A verification step turns out to be wrong or insufficient | Fix §8 |
| Any decision is made or reversed | Add a row to §10 **and** edit the section it affects |

#### What needs Kevin's explicit approval first

Do **not** quietly rewrite these — propose the change, get a yes, then edit:

- Anything in §0 Ground rules
- The API choice (§2) — switching away from dummyjson
- Scope boundaries (§9) — pulling something back in that was cut
- The architecture: where `buildUrl` lives, the chapter-isolation rule, the layering

#### Rules for editing this file

1. **Edit in place. Do not append.** A doc that grows by accretion becomes unreadable. Rewrite
   the affected section so it reads as if it were always that way, and record *why* it changed in
   §10 — that is what the decision log is for.
2. **Keep the section numbering stable.** Other notes and commit messages reference `§3`, `§6`.
   Add subsections (`§6.1`) rather than renumbering.
3. **Date every factual claim about the outside world.** APIs go stale. If §2 says "verified
   2026-08-14" and today is much later, **re-verify with `curl` before trusting it** rather than
   repeating it as fact.
4. **When code and this file disagree, the code wins.** Read the code, then fix the doc. Never
   "fix" working code to match a stale document.
5. **Don't let it sprawl.** If a section stops being useful, delete it. This is a working
   handoff, not an archive.

---

## 1. What this chapter teaches

Boot.dev chapter 9, five lessons (`course/9-paths-and-parameters/exercises/`):

| # | Exercise folder | Concept |
|---|---|---|
| 1 | `1-url-path` | `fullURL = base + path`; a path is just a string the server interprets |
| 2 | `2-rest`, `2a`, `2b` | REST: path names a **resource**, version lives in the path, stateless |
| 3 | `3-query-params-sort` | `?sort=fieldName` — optional `key=value` pairs |
| 4 | `4-documentation`, `4a` | the **server** decides what exists — read the docs |
| 5 | `5-query-params-multiple` | `?sort=quality&limit=5` — `?` opens, `&` separates |

**Why this chapter matters here:** Ch8 already builds paths and query strings, but by raw string
concatenation. Chapter 9 is the chapter that teaches doing it properly. Ch9 is the *upgrade*, not
a repeat.

---

## 2. The API

**Use `https://dummyjson.com`.** Same API as Ch8, so no new auth to learn. All verified live:

| Path | Params | Notes |
|---|---|---|
| `/users` `/posts` `/products` `/comments` | `limit` `skip` `sortBy` `order` `select` | all `GET 200` |
| `/users/search?q=` | `q` required | sub-resource path |
| `/users/filter?key=&value=` | `key` + `value` both required | best multi-param demo (lesson 5) |
| `/products/category/{name}` | `limit` `skip` | **two** path segments — good for lesson 1 |

Response envelope: `{ <resource>: [...], total, skip, limit }` — the array key is named after the
resource, which is itself a nice REST illustration.

### ⚠ Naming trap: the course says `sort`, dummyjson says `sortBy`

The exercises are written against boot.dev's API, which uses `?sort=level`. **dummyjson does not
have a `sort` param** — it uses `?sortBy=` plus a separate `?order=asc|desc`. Copying the lesson
text literally gives you a param the server silently ignores.

| | Course API | dummyjson |
|---|---|---|
| sort field | `?sort=level` | `?sortBy=age` |
| direction | *(none)* | `?order=asc` / `?order=desc` |

This is lesson 4 in miniature: two servers, same concept, different spelling — **read the docs**.

### Real field names (for picking `sortBy` and `select` values)

Guessing here is what produces 400s. Confirmed from live responses:

| Resource | Useful fields |
|---|---|
| `/users` | `id` `firstName` `lastName` `age` `email` `gender` `phone` `hair.color` |
| `/products` | `id` `title` `price` `rating` `description` `category` |
| `/posts` | `id` `title` `body` `views` |
| `/comments` | `id` `body` `likes` `postId` `user.username` |

Note `hair.color` — a **dotted path** into a nested object, which is what makes
`/users/filter?key=hair.color&value=Brown` a good demo of value encoding.

### Curl probe cookbook

Check a URL outside the app when something 400s — this is how every fact above was verified:

```bash
# does the resource exist, and what shape comes back?
curl -s "https://dummyjson.com/users?limit=1"

# is this sort key accepted? (status only)
curl -s -o /dev/null -w "HTTP %{http_code}\n" \
  "https://dummyjson.com/products?sortBy=price&order=desc&limit=3"

# multiple params + nested-key filter
curl -s "https://dummyjson.com/users/filter?key=hair.color&value=Brown&limit=2&select=firstName,hair"

# a real error body (404 JSON)
curl -s "https://dummyjson.com/users/99999"
```

### ⚠ How dummyjson fails — it mostly *doesn't*

Verified, and it changes the lesson-4 demo. dummyjson **silently ignores** params it doesn't
understand instead of rejecting them:

| Request | Result |
|---|---|
| `?sortBy=nonsense` | **`200`** — unsorted data, no warning |
| `?sort=age` (wrong param name) | **`200`** — unsorted data, no warning |
| `/users/filter?limit=2` (no `key`/`value`) | **`200`** — empty array |
| `/users/search` (no `q`) | **`200`** — returns everything |
| `/users/99999` | **`404`** `{"message":"User with id '99999' not found"}` ← clean JSON error |
| `/nonexistent` | `404` but **HTML**, so `response.json()` throws |

**Use `/users/99999` for the error-handling demo** — it's the only clean JSON error.

This is a *stronger* lesson 4 than a 400 would be: a server that rejects bad params teaches you
quickly, but one that ignores them hands back plausible-looking wrong data and lets you ship the
bug. That's exactly why you read the docs instead of guessing.

### Do not use the course's own API

`api.boot.dev/v1/courses_rest_api/learn-http/` is publicly reachable (any random hex key works —
no student login), but it is **degraded**:

- `/locations` → `404 resource not found`
- `/items` → `404 resource not found`
- `/users` → works; `sort` accepts only `experience | role | id`
- `sort=level` and `sort=quality` — the exact keys exercises 3 and 5 ask for → `400 can't sort by the provided key`

The course exercises cannot be reproduced against it. Its brokenness *is* however a perfect
real-world demo of lesson 4 ("the server has control"), worth a mention in the notes.

---

## 3. Repo patterns this module must follow

Established across chapters 1–8. Match them; don't invent new ones.

**Chapter isolation — the important one.**
Chapters **never import from each other**. They import *downward* only, into `src/types/` and
`src/utils/`. This is why `buildUrl` lives in `src/utils/urlUtil.ts` and not inside a chapter
folder, and why Ch9 must not reach into `Ch8-HTTP_Methods/`.

**Adding a chapter is a 3-touch operation:**
1. `src/components/Ch<N>-<Topic>/` folder
2. an entry in `chapters[]` in `src/types/chapters.ts`
3. an import + entry in `src/components/Template/registry.tsx` (optionally `Readme.md?raw` as `note`)

**Layering** (same chain as Ch8): page → hook → `apiResource.ts` → shared `apiFetch`.
Kevin wants this pattern kept, so Ch9 keeps it.

Ch8 calls that third layer `useApi.ts`, but **it is not a hook** — no `useState`, no
`useCallback`, no React. Ch9 names it `apiResource.ts` so the `use` prefix stops lying.
`hooks/` holds only things that must run inside a component. Ch8's own file keeps its name —
Ch8 stays untouched.

**But the UI is ONE component.** No per-panel children. Five panel components meant five
prop-type definitions threading `resource`/`params`/`onChange`/`loading` around, and that
plumbing is what buried the lesson. Sections are plain JSX blocks, the way Ch3-URL does it —
that file renders a live URL breakdown in 141 lines with no child components at all.

The split to hold onto: **layers for data, not for markup.**

**Naming / exports**
- Folders `Ch<N>-<Topic>`, chapter ids zero-padded `"ch-09"`, branches `Ch-<N>-<Topic>`
- Components: `PascalCase.tsx`, **default** export; first line is a `//` comment describing it
- Hooks `useX.ts`, utils `xUtil.ts` — **named** exports
- Note file is literally `Readme.md` (capital R, lowercase m), imported `?raw`

**State triad** — every chapter holds `data` + `loading: boolean` + `error: string | null`, and
disables buttons while loading.

**Error idiom** — used verbatim in Ch1, 2, 5, 6 and every Ch8 handler. Keep it identical:
```ts
try { setLoading(true); setError(null); /* ... */ }
catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  setError(message);
} finally { setLoading(false); }
```

**Styling** — MUI components with Tailwind utility classes mixed into `className` (sometimes with
`!` importants). Framer Motion `motion.div` on view-level components.

**Reuse, don't rewrite** — already exists, use it:
| Helper | File | Use for |
|---|---|---|
| `apiFetch(url, apiKey, method, body?)` | `src/utils/serviceUtil.ts` | the actual fetch; sets `X-API-KEY`, `mode: "cors"`, throws on `!ok` |
| `generateKey()` | `src/utils/serviceUtil.ts` | the demo API key |
| `getUrl(input, policy)` | `src/utils/urlUtil.ts` | parsing in `describeUrl` — returns `URL \| null` |

> **PART 2 is vendor-neutral by design.** Nothing in `urlUtil.ts` knows about any particular API —
> verified against escuelajs (Ch1), jsonplaceholder (Ch4/5), dummyjson (Ch8/9), GitHub and
> Cloudflare DNS. Per-API facts (`DUMMYJSON_BASE`, `Resource`, `SORT_KEYS`) live in
> `Ch9-Paths_Params/apiResource.ts`, the chapter's own API layer.
>
> **`src/utils/urlUtil.ts` holds both halves**, banner-separated:
> **PART 1 CHECK** (Ch3) parses/validates untrusted input, returns `null` on failure;
> **PART 2 BUILD** (Ch9) composes URLs from trusted parts and lets `new URL()` throw.
> Utils are shared infrastructure, not chapter-scoped — one URL module, two clearly labelled jobs.
> Only `describeUrl` crosses the line, reusing `getUrl` instead of writing a second parser.

**No test framework exists.** `npm test` deliberately exits 1. The real gate is
`npm run type-check`.

---

## 4. tsconfig traps

`strict` plus three flags that bite in this module:

- **`noUncheckedIndexedAccess`** — `segments[0]` and `rows[0]` are `T | undefined`. Prefer
  `for…of` / `.map`; guard before `Object.keys(rows[0])`.
- **`exactOptionalPropertyTypes`** — you cannot assign `undefined` to an optional property. This
  is why `QueryParams` is a `Record` whose *value type includes* `undefined`, rather than a type
  with optional keys.
- **`moduleDetection: "force"`** — every file must have an import or export.

The stubs currently omit return-type annotations so the empty bodies compile. **Add the return
types back as each function is implemented.**

---

## 5. The target UI — one page, one file

Sections, not components. Everything below lives in `PathsAndParams.tsx`.

```
┌─────────────────────────────────────────────────────────────────────┐
│  Chapter 9 — Paths and Parameters                                   │
├─────────────────────────────────────────────────────────────────────┤
│  THE PATH            Resource [ products ▾ ]                        │
│                      Item id  [    ]   ← blank = whole collection   │
├─────────────────────────────────────────────────────────────────────┤
│  THE PARAMETERS      sortBy [ price ▾]  order [ desc ▾]  limit [ 5 ]│
│                      skip [ 0 ]  select [ title,price ]  q [      ] │
│                      ( blank field = param dropped from the URL )   │
├─────────────────────────────────────────────────────────────────────┤
│  THE URL WE BUILT   ← the payoff                                    │
│   https://dummyjson.com/products?sortBy=price&order=desc&limit=5    │
│   ┌──────────┬─────────────────────────┐                            │
│   │ origin   │ https://dummyjson.com   │                            │
│   │ segment 1│ products                │  ← typing an id adds       │
│   │ segment 2│ 2                       │     segment 2, live        │
│   ├──────────┼─────────────────────────┤                            │
│   │ sortBy   │ price                   │  ← rows appear/vanish live │
│   │ limit    │ 5                       │                            │
│   └──────────┴─────────────────────────┘        [ Send Request ]    │
├─────────────────────────────────────────────────────────────────────┤
│  RESULT              <pre> raw JSON </pre>                          │
├─────────────────────────────────────────────────────────────────────┤
│  ▸ WHAT THE SERVER SUPPORTS   (Lesson 4 — <details>, docs only)     │
│      GET    /products       list, takes query params                │
│      GET    /products/2     one item, id is a path segment          │
│      POST   /products/add   NOT /products — that 404s               │
│      PUT    /products/2     update                                  │
│      DELETE /products/2     remove                                  │
└─────────────────────────────────────────────────────────────────────┘
```

**The teaching trick:** the URL is derived **on every render**, so it assembles itself live as
fields change — before anything is sent. That live assembly is the entire point of the chapter.
Never move URL construction into the submit handler.

**Scope line:** GET-list and GET-one are wired; the other verbs are **documentation only**.
Ch8 already implements POST/PUT/DELETE, and the REST lesson ("path names a resource") is fully
carried by `/products` vs `/products/2` — one text field, no method selector, no body editor.

---

## 6. File map — what each stub must become

| File | Role | Key TODO |
|---|---|---|
| `src/utils/urlUtil.ts` **PART 2** | **the core**, vendor-neutral | ✅ `buildUrl` · ✅ `describeUrl` · ⏸ `buildQueryString` (parked, §6.1) · ⬜ `QueryValue`, `QueryParams` |
| `PathsAndParams.tsx` | page — **all UI in one component** | ⬜ state, derived `url`, all JSX, the `<details>` docs table |
| `apiResource.ts` | API layer (not a hook) + dummyjson facts | ✅ `DUMMYJSON_BASE`, `Resource`, `SORT_KEYS` · ⬜ `METHOD_DOCS`, `ResourceResponse`, `fetchResource`, `extractRecords` |
| `hooks/usePathsParams.ts` | orchestration | ⬜ state triad + `total` + `sendRequest` + `clear` |
| `Readme.md` | Note tab | lesson notes (TODO) + Ch8 migration table (done) |

**Deleted 2026-08-18** (see §10): `ResourcePicker`, `QueryParamsForm`, `UrlPreview`,
`ApiDocsPanel`, `ResultsTable` — the five panel components. Their prop-plumbing was the
layering that buried the lesson; as JSX blocks in one component they cost nothing.
`apiResource.ts` and the hook were briefly removed too, then **restored on Kevin's call** —
he wants the page → hook → apiResource → apiFetch chain kept.

### `buildUrl` — the one function that matters

```ts
buildUrl("https://dummyjson.com", ["products"], { sortBy: "price", limit: 5 })
// → "https://dummyjson.com/products?sortBy=price&limit=5"
```

Rules, in order:
1. Use `new URL()` + `URLSearchParams`. **No `+`, no template literals.** That restriction *is*
   the exercise.
2. Strip leading/trailing `/` from base and every segment, join with a single `/` — a trailing
   slash must never produce `//`.
3. **Omit-empty:** drop any param that is `undefined`, `null` or `""`. This is what makes blank
   fields vanish from the URL.
4. `URLSearchParams` encodes for you — `q=john doe` and `select=title,price` come out right free.

**Implemented and verified** (12/12): both doc examples, sloppy slashes on base and segments,
empty segments filtered, `skip: 0` surviving omit-empty, space and comma encoding, and a base
carrying a `/v1` prefix with or without its trailing slash.

The base-prefix case was the interesting one. `url.pathname = path` *replaces* the path, and
`new URL(path, base)` silently drops `/v1` when the base has no trailing slash — relative-link
resolution treats `/v1` as a file, not a directory. The fix is to normalise the base into
directory form first, then append:

```ts
if (!url.pathname.endsWith("/")) url.pathname += "/";
url.pathname += urlPath;
```

Same move as the segment cleaning — normalise everything to one shape, then join with no cases
left to handle.

### 6.1 `buildQueryString` is parked (commented out)

Written and verified 8/8 — omit-empty, keeps `0`, encodes `" "` and `","`, returns `""` rather
than a bare `"?"`. **Commented out rather than deleted, because nothing calls it:** `buildUrl`
runs its own copy of the same omit-empty loop inline, so the rule currently lives in two places
and only one of them is reachable.

Decide once the UI exists:

| Option | Effect |
|---|---|
| **A — wire into `buildUrl`** | `url.search = buildQueryString(params ?? {})`. The `url.search` setter strips a leading `?`, so this works as-is and collapses the duplicated rule to one copy. |
| **B — call from the URL section** | Display the `?…` tail on its own, which is what Ch9 lessons 3 and 5 actually demonstrate. |
| **C — delete** | If the UI needs neither. |

> ⚠ **Numbering trap in `urlUtil.ts`:** the stubs say `Lesson 3 + 5` meaning **Chapter 9's**
> lessons 3 and 5, while PART 1's header says `Ch3` meaning **Chapter 3**. Same numeral, two
> different meanings in one file.

---

## 7. Remaining wire-up (not yet done)

Both files are currently **untouched** — these edits are Kevin's to make.

**`src/types/chapters.ts`** — the `ch-09` entry:
- `description: "Data Fetching"` is **wrong**, the chapter is "Paths and Parameters"
- missing `href` — add `https://github.com/KevinHein-KSH/http-assets/tree/Ch-9-Paths-Params`
- add `externalUrl` to match ch-01…ch-08

**`src/components/Template/registry.tsx`** — replace the `ch-09` `<Placeholder>`:
```tsx
import PathsAndParams from "../Ch9-Paths_Params/PathsAndParams";
import Ch9Note from "../Ch9-Paths_Params/Readme.md?raw";
// …
"ch-09": { home: <PathsAndParams />, note: Ch9Note },
```

Neither belongs in `chapters.ts` — that file is already overloaded with Ch8-only types. They split
by *who they're about*:

| Type | Home | Why |
|---|---|---|
| `QueryValue`, `QueryParams` | `urlUtil.ts` PART 2 | every query string has keys and values, whatever the API |
| `Resource`, `SORT_KEYS`, `DUMMYJSON_BASE` | `Ch9-Paths_Params/apiResource.ts` | facts about one specific API |

---

## 8. Verification

```bash
npm run type-check   # the real gate — must pass clean
npm run dev          # then open Chapter 9
```

Confirm each lesson is visibly demonstrated:

| Check | Expected |
|---|---|
| L1 — switch resource | path segments change in the URL breakdown |
| L2 — switch resource | `sortBy` options change; `comments` disables it entirely |
| L2 — type an item id | `segments` goes `["products"]` → `["products","2"]`, collection vs item |
| L3 — set `sortBy` | URL grows `?sortBy=price` |
| L5 — add `order` + `limit` | `?sortBy=price&order=desc&limit=5` (one `?`, then `&`) |
| omit-empty — clear `limit` | it disappears from the URL entirely |
| encoding — `q=john doe` | space encoded, request succeeds |
| L4 — `sortBy=nonsense` | **`200`, data comes back unsorted** — the silent-ignore case |
| L4 — `/users/99999` | `404` caught, red banner, no crash |
| Note tab | renders `Readme.md` (proves `?raw` + registry wiring) |

Cross-check the composed URL against the server directly:
```bash
curl -s "https://dummyjson.com/products?sortBy=price&order=desc&limit=5"
```

---

## 9. Out of scope

Ch8 code changes (documented only) · **live POST/PUT/DELETE — docs only, Ch8 owns the verbs** ·
a JSON body editor (Ch7's subject) · a results table with dynamic columns (also Ch7) ·
`AbortController` / debounce / URL-state sync / persistence · Chapter 10 · the capstone ·
adding a test framework.

---

## 10. Decision log

Append a row whenever something is decided or reversed, **and edit the affected section too** —
this log records *why*, the sections record *what*. Newest at the bottom.

| Date | Decision | Why |
|---|---|---|
| 2026-08-14 | Chapter 9 is "Paths and Parameters", not "Data Fetching" | The `ch-09` stub in `chapters.ts` was mislabelled; checked against the course repo |
| 2026-08-14 | Use dummyjson, not the course's `api.boot.dev` | boot.dev API degraded: `/locations` + `/items` 404, `sort=level`/`sort=quality` 400. Exercises can't be reproduced on it |
| 2026-08-14 | ~~`buildUrl` goes in a separate `src/utils/apiUrlUtil.ts`~~ **— reversed, see below** | Building URLs ≠ validating them |
| 2026-08-14 | Ch8 left unchanged; overlap documented in `Readme.md` instead | Ch8 is finished and committed; no unrequested refactors |
| 2026-08-14 | Cut `AbortController`, debounce, URL-state sync, persistence | Kevin: stay inside the lesson's own concepts |
| 2026-08-14 | Scaffold only — TODOs, no implementations, no JSX | It's a learning exercise; Kevin writes the logic |
| 2026-08-14 | Branch `Ch-9-Paths-Params` cut from `Ch-8-HTTP-Methods`, not `develop` | Repo convention is a chapter-to-chapter chain |
| 2026-08-14 | **Corrected:** lesson-4 error demo uses `/users/99999` (404), not `sortBy=nonsense` | Verified `sortBy=nonsense` returns **200**, not 400 — dummyjson silently ignores unknown params. The earlier 400 claim was true of boot.dev's API, not dummyjson |
| 2026-08-16 | **Reversed:** merged `apiUrlUtil.ts` into `urlUtil.ts` as PART 2; deleted the separate file | Kevin: `src/utils/` is shared infrastructure, so splitting a util per-chapter is the wrong axis. The parse-vs-build distinction is real but is now carried by banner comments inside one file. Nothing imported `apiUrlUtil` yet (references were all TODO comments), so the move was free |
| 2026-08-16 | `buildUrl` implemented, 12/12 verified | Normalise the base to directory form before appending, rather than branching on whether it has a trailing slash. Two earlier attempts failed: `url.pathname = path` discarded a `/v1` prefix, and an inverted guard (`!endsWith("/") && urlPath`) skipped the append entirely for a bare origin, whose pathname is already `"/"` |
| 2026-08-16 | `buildQueryString` written (8/8) but **parked — commented out, not deleted** | Nothing calls it; `buildUrl` duplicates the omit-empty loop inline. Kept as a comment so the working code and the reasoning survive until the UI shows whether option A (wire into `buildUrl`) or B (query tail in the URL section) is wanted. Delete if neither. See §6.1 |
| 2026-08-18 | `describeUrl` implemented (8/8) and given a `policy` param | Round-trips against `buildUrl`. `params` is a list of pairs, not an object, because duplicate keys (`?tag=a&tag=b`) are legal and an object drops one. The param was added because `describeUrl` inherited PART 1's strict `DEFAULT_PUBLIC_POLICY` and returned `null` for `localhost` and raw IPs — so `buildUrl` could compose a URL `describeUrl` then refused to describe. **Rejected auto-detecting** and loosening silently: that collapses into "never reject anything" while looking like validation, the same silent-accommodation failure lesson 4 warns about |
| 2026-08-18 | Moved `DUMMYJSON_BASE`, `Resource`, `SORT_KEYS` out of `urlUtil.ts` into `apiResource.ts`; kept `QueryValue`/`QueryParams` in the util | Kevin: pinning shared infrastructure to one vendor is wrong when the project isn't a dummyjson project. Survey confirmed it — 5 APIs in use (escuelajs Ch1, jsonplaceholder Ch4/5, httpstat.us Ch5, dummyjson Ch8/9) and **no chapter puts API details in `src/utils/`**; Ch4's local `REQUESTS` table is the precedent. **Considered deleting them outright and rejected it**: the UI needs the data. `urlUtil.ts` now has zero vendor references. *(Superseded same day — `apiResource.ts` was folded into `PathsAndParams.tsx`; the util stays vendor-neutral either way.)* |
| 2026-08-18 | **Revised the collapse: 8 code files → 3.** The five panel components stay deleted; `apiResource.ts` and `hooks/usePathsParams.ts` are **restored** | Kevin: the one-file version cut too thin — he wants the page → hook → apiResource → apiFetch chain kept, matching Ch8. The settled rule is **layers for data, not for markup**: the request path keeps its layers, the UI does not get per-panel children. `urlUtil.ts` stays vendor-neutral either way |
| 2026-08-18 | ~~Collapsed the chapter from 8 code files to 1~~ **— superseded by the row above** Deleted the five panel components, `apiResource.ts` and `hooks/usePathsParams.ts`; folded the constants into `PathsAndParams.tsx` | Kevin: the module was over-engineered and the layering buried the lesson. Measured and confirmed — **Ch1–Ch7 are one file each**; Ch3-URL does the closest thing (live URL breakdown) in 141 lines with `useState`/`useMemo` inline, no hook, no api layer. Ch9 had *more* files than Ch8 while doing far less. Five components also meant five prop-type definitions threading `resource`/`params`/`onChange`/`loading` — that plumbing *was* the layering. Six of the eight files were still empty stubs, so the cut was nearly free |
| 2026-08-18 | Wired GET-list + GET-one only; POST/PUT/DELETE demoted to a `<details>` docs table | A competing plan proposed wiring full CRUD. Rejected: Ch8 already implements all four verbs against dummyjson, and the REST lesson is carried by `/products` vs `/products/2` — one text field instead of a method selector and a JSON body editor. Also, `POST /products` **404s** on dummyjson (it requires `/products/add`), so live CRUD would teach "path names a resource" using an endpoint that breaks the rule. It is a much better lesson-4 footnote than a lesson-2 centrepiece |
| 2026-08-16 | Renamed Ch9's `useApi.ts` → `apiResource.ts` | The `use` prefix claimed it was a hook; it has no React in it at all, and a rules-of-hooks linter would try to enforce hook rules on it. Same "name it for what it is" principle as the util merge above. **Ch8's copy keeps its name** — Ch8 stays untouched, so `Readme.md`'s migration table still correctly cites `useApi.ts:NN` for Ch8 call sites |
| 2026-08-20 | **Adopted the type placement rule** (new §11): one consumer → chapter-local, more than one → global `src/types/` | Audited every type across all 11 branches. The rule ratifies almost everything already in the repo and isolates one offender: `src/types/chapters.ts` holds two domains (Template's nav model + Ch8's user model) owned by two different branches. It had already fired once on its own — Ch6 declares a local `generateKey()`, Ch8 promoted a copy into `serviceUtil.ts`, and Ch6's copy was correctly left alone |
| 2026-08-20 | **Deferred the code refactor; Ch-9 gets docs only** | Branch locality (§11.5) says a type move lands on the branch that *declares* it. Nothing type-related originates on Ch-9 — `chapters.ts` is owned by `Template` (nav half) and `Ch-8` (user half), so the refactor cannot legitimately land here. Executing it means repairing two broken seams, rebasing 9 branches and force-pushing all of them, since every branch is in sync with `origin`. Runbook recorded in `docs/TYPES_AUDIT.md` §5 on `develop`; **the earlier "§0 imports-only waiver" is moot — no Ch8 file is touched at all** |
| 2026-08-20 | **Recorded, did not fix, a live type regression** (`ApiUser.role`) | `Ch-3-URL` was cut from `Ch-2-DNS` four commits early and missed `b1ba263`, so `role` still carries a `| string` arm that collapses the union to plain `string`. Live on Ch-3→Ch-9. Fixing it means editing Ch-3 and cascading forward, so it is bundled into the deferred runbook rather than patched locally — patching Ch-9 alone would violate §11.5 and conflict when Ch-3 is repaired properly |

<!-- TODO: add your own rows as you build. Especially the reversals —
     "tried X, it didn't work, went with Y" is the most valuable kind of entry
     for a future session, and the kind most often lost. -->

---

## 11. Type placement rule

**Adopted 2026-08-20.** Project-wide, not Chapter 9 specific. The full cross-branch evidence is
in `docs/TYPES_AUDIT.md` (on `develop`); this section is the rule itself.

> **A type used by only one chapter/module lives in that chapter/module.**
> **A type used by more than one lives in the global `src/types/`.**

Five clauses. The first three make the rule testable, the fourth bounds it, the fifth keeps it
safe under this repo's branch chain.

### 11.1 "Used elsewhere" must be counted, not guessed

Every later branch *contains* every earlier file, so "is it used in another chapter?" has no
meaningful answer at the chain level. Count actual importers on **one** branch:

```bash
grep -rn "TypeName" --include=*.ts --include=*.tsx src | grep -v "<owning-folder>/"
```

Zero hits → chapter-local. One or more → `src/types/`.

### 11.2 Promotion is forward-only

A type can be single-chapter today and shared two chapters later. When that happens, promote it
**on the new chapter's branch**, and leave the earlier chapter's copy alone. Earlier branches are
published teaching snapshots; rewriting one invalidates a recorded lesson.

Cross-branch duplication is the accepted cost. `generateKey()` is the worked example: Ch6 declares
its own in `HeaderApiKey.tsx`, Ch8 promoted a copy into `utils/serviceUtil.ts` for Ch8 and Ch9, and
Ch6's copy stayed. That is correct, not a bug to clean up.

### 11.3 Anticipated sharing counts — if documented

`urlUtil.ts` PART 2 (`buildUrl`, `QueryParams`, `UrlDescription`) has exactly one consumer today,
so 11.1 would push it into Ch9. It stays in `utils/` because it is deliberately vendor-neutral for
later chapters — **and the file header says so**.

A type may sit centrally ahead of its second consumer if a comment states why. Undocumented
anticipation does not qualify; that is just a guess with better placement.

### 11.4 Scope: type declarations, not functions

The rule governs `type` / `interface` / type-carrying `const`. Functions stay where they are.

Without this bound, `mapUser` and `validateUser` (Ch8-only, `User`-typed) get dragged out of
`serviceUtil.ts` — colliding with §0's "do not touch Ch8" rule and with Ch9's plan to import
`apiFetch` from that same file.

### 11.5 Branch locality

**Every type move lands on the branch that declares the type**, then flows forward by rebase.
Editing Chapter N's types from Chapter N+1's branch is a defect, not a shortcut — the next rebase
turns it into a conflict.

This is why Chapter 9 adopted the rule but applied none of it: `Ch-9` is already compliant
(`Resource`/`SORT_KEYS` local, `urlUtil` shared), and the one offending file is owned by `Template`
and `Ch-8`.

### 11.6 Current verdict

| Types | Owner | Placement |
|---|---|---|
| `Resource`, `SORT_KEYS`, `DUMMYJSON_BASE` | Ch-9 | `apiResource.ts` — local ✅ |
| `Mode`/`RequestDef` (Ch4), `LogTone`/`LogEntry` (Ch5), `CatApiResponse` (Ch6), `ApiUser` (Ch1), all `*Props` | their chapter | local ✅ |
| `urlUtil` PART 1 + PART 2 | shared (Ch3 + Ch9) | `utils/urlUtil.ts` ✅ |
| `Stored`, `emptyUser` | Ch-8 | ✗ in `types/chapters.ts` — should be Ch8-local |
| `User`, `UserResp`, `ErrorResp` | Ch-8, but `serviceUtil.ts` consumes them | central is correct; filename is not |
| `Chapter`, `View`, `chapters[]`, ids | Template | central as app-shell config — recorded exception |

Target layout and the ordered execution steps are in `docs/TYPES_AUDIT.md` §5. **Do not apply any
of it from this branch.**
