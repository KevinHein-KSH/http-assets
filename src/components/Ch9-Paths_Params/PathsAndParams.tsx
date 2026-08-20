// PathsAndParams - Chapter 9 page (paths + query parameters).
//
// The one-sentence lesson:
//   compose the right PATH and QUERY PARAMS with buildUrl, and watch the URL
//   assemble itself live, before anything is sent.
//
// Lesson map (boot.dev ch9):
//   1. URL Paths             -> fullURL = base + path
//   2. RESTful APIs          -> the path names a RESOURCE (verbs: docs only)
//   3. Query Parameters      -> ?sortBy=price
//   4. Documentation         -> the SERVER decides what exists, read the docs
//   5. Multiple Query Params -> ?sortBy=price&limit=5   ("?" opens, "&" separates)
//
// STRUCTURE: page -> hook -> apiResource -> apiFetch, same layering as Ch8.
// The UI, however, is ONE component - no per-panel child components. Five
// panels would mean five prop-type definitions threading resource/params/
// onChange/loading around, and that plumbing buries the lesson. Sections
// here are just JSX blocks, the way Ch3-URL does it.
//
// WIRED LIVE - only what teaches URL composition:
//   GET list -> /products      + sortBy, order, limit, skip, select, q
//   GET one  -> /products/2    <- one extra SEGMENT, the path-param lesson
//
// DOCS ONLY - POST/PUT/DELETE are Ch8's job. They appear in the <details>
// table (METHOD_DOCS in apiResource.ts) so the verb->path mapping is taught
// without re-running Ch8's implementations.

// TODO: imports
//  - useState, useMemo from react
//  - buildUrl, describeUrl from "../../utils/urlUtil"
//  - generateKey from "../../utils/serviceUtil"
//  - DUMMYJSON_BASE, SORT_KEYS, type Resource from "./apiResource"
//  - usePathsParams from "./hooks/usePathsParams"
//  - MUI bits + Tailwind classes, same mixed style as Ch3-URL/URLParts.tsx

export default function PathsAndParams() {
  // TODO: state
  //  - resource: Resource            default "products"
  //  - itemId:   string              blank = list, filled = one item
  //  - params:   { sortBy, order, limit, skip, select, q } - all strings,
  //              blank means "leave it out of the URL"
  //  - apiKey:   useState(() => generateKey())   runs once on mount

  // TODO: derive the URL on EVERY RENDER - not in the submit handler. This is
  //       the teaching point: the URL assembles itself as the user types.
  //         const segments = itemId ? [resource, itemId] : [resource];
  //         const url = useMemo(() => buildUrl(DUMMYJSON_BASE, segments, params), [...]);
  //         const parts = useMemo(() => describeUrl(url), [url]);
  //
  //       Typing an id turns segments ["products"] into ["products","2"] in
  //       the breakdown table - collection vs item, visible. That IS lesson 2.

  // TODO: pull { data, total, loading, error, sendRequest, clear } from
  //       usePathsParams(). The hook owns the request and the state triad;
  //       this component owns the URL and the JSX.

  // TODO: JSX, in this order:
  //   1. resource <Select>, options from Object.keys(SORT_KEYS)  <- no second
  //      list to drift out of sync with the Resource union
  //   2. item id <TextField> ("blank = the whole collection")
  //   3. the six param fields; sortBy options = SORT_KEYS[resource],
  //      disabled when that array is empty (comments)
  //   4. THE PAYOFF: the composed URL in monospace, then the describeUrl
  //      breakdown - origin / one row per segment / one row per param.
  //      Rows appear and vanish live as fields are filled and cleared.
  //      Handle parts === null (describeUrl returns null on bad input).
  //   5. [ Send Request ] -> sendRequest(url, apiKey, resource), disabled
  //      while loading; red banner when `error` is set
  //   6. results + `total`. Keep it plain - the response BODY is Ch7's
  //      subject, not this chapter's. Proving the request worked is enough.
  //      Remember GET-one returns a bare object, not the list envelope.
  //   7. <details> with METHOD_DOCS + the three quirks (lesson 4)
}
