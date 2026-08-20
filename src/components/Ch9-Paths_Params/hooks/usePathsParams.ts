// usePathsParams - Chapter 9 request hook (data, total, loading, error, sendRequest, clear)
//
// Mirrors useHttpMethods.ts from Ch8: same state triad, same useCallback +
// try/catch/finally skeleton, same error idiom. Much smaller though - Ch9 is
// read-only (GET), so there is no CRUD branching and no localStorage.

// TODO: imports
//  - useState, useCallback from "react"
//  - fetchResource, extractRecords from "../apiResource"

export function usePathsParams() {
  // TODO: state (same triad every chapter in this repo uses)
  //  - data:    useState<unknown[]>([])
  //  - total:   useState<number>(0)   <- server's full count, shown by the page
  //  - loading: useState<boolean>(false)
  //  - error:   useState<string | null>(null)

  // TODO: sendRequest = useCallback(async (fullUrl, apiKey, resource) => { ... })
  //   try {
  //     setLoading(true); setError(null);
  //     const body = await fetchResource(fullUrl, apiKey);
  //     setData(extractRecords(body, resource));
  //     setTotal(body.total);
  //   } catch (err) {
  //     // house error idiom - keep it identical to Ch8:
  //     const message = err instanceof Error ? err.message : String(err);
  //     setError(message);
  //   } finally {
  //     setLoading(false);
  //   }
  //
  // The catch is what powers the Lesson 4 error demo. NOTE dummyjson mostly
  // does NOT reject bad input - ?sortBy=nonsense returns 200 with unsorted
  // data. Use /users/99999 for a real error: 404 with a clean JSON body.

  // TODO: clear = useCallback(() => reset data/total/error)

  // TODO: return { data, total, loading, error, sendRequest, clear };
}
