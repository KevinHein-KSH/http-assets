// PathsAndParams - Chapter 9 page component (paths + query parameters)
//
// Lesson map (boot.dev ch9 "Paths and Parameters"):
//   1. URL Paths            -> fullURL = base + path
//   2. RESTful APIs         -> the path names a RESOURCE, the method is the verb
//   3. Query Parameters     -> ?sort=fieldName
//   4. Documentation        -> the SERVER decides which params exist, read the docs
//   5. Multiple Query Params-> ?sort=quality&limit=5  ("?" opens, "&" separates)
//
// Page layout - 5 panels, each labelled with the lesson it proves so anyone
// looking at the screen can see which concept is implemented:
//   (1) ResourcePicker   - pick resource + optional sub-path
//   (2) QueryParamsForm  - sortBy / order / limit / skip / select / q
//   (3) UrlPreview       - the composed URL + its breakdown  <- the money shot
//   (4) ApiDocsPanel     - what the server actually supports
//   (5) ResultsTable     - the records that came back

// TODO: imports
//  - useState from react
//  - the 5 panel components from ./
//  - usePathsParams from ./hooks/usePathsParams
//  - buildUrl from ../../utils/urlUtil
//  - DUMMYJSON_BASE, Resource from ./apiResource
//  - generateKey from ../../utils/serviceUtil

export default function PathsAndParams() {
  // TODO: state
  //  - resource:  which REST resource is selected (default "products")
  //  - subPath:   "" | "search" | "category/smartphones"
  //  - params:    { sortBy, order, limit, skip, select, q } - all strings,
  //               blank means "leave it out of the URL"
  //  - apiKey:    useState(() => generateKey())  <- runs once, on mount
  //               (same trick as HttpMethods.tsx)

  // TODO: derive the URL on every render so panel (3) updates LIVE as the user
  //       types, BEFORE any request is sent. That live assembly is the whole
  //       teaching point of this chapter.
  //         const segments = [resource, ...subPath.split("/").filter(Boolean)]
  //         const url = buildUrl(DUMMYJSON_BASE, segments, params)

  // TODO: pull { data, total, loading, error, sendRequest, clear } from
  //       usePathsParams()

  // TODO: return the JSX - 5 panels in order, each wrapped in a MUI <Paper>
  //       with a heading naming its lesson. Pass `url` down to UrlPreview,
  //       and wire the Send Request button to sendRequest(url, apiKey).
}
