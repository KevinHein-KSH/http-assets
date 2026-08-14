// ApiDocsPanel - PANEL 4 - "WHAT THE SERVER SUPPORTS" (Lesson 4: Documentation)
//
// Shows: a static table of the paths and params dummyjson actually supports.
// Proves: "the server has complete control over how the path and query params
//         are interpreted - you must consult the docs." Lesson 4 is otherwise
//         pure prose; this panel makes it something you can see and break.

// TODO: props type
// type ApiDocsPanelProps = { error: string | null };

export default function ApiDocsPanel() {
  // TODO (Lesson 4):
  //  1. render a documentation table. Verified live against dummyjson.com:
  //
  //     PATH                          PARAMS                          METHODS
  //     /users                        limit skip sortBy order select  GET POST PUT DELETE
  //     /posts                        limit skip sortBy order select  GET
  //     /products                     limit skip sortBy order select  GET
  //     /comments                     limit skip sortBy order select  GET
  //     /users/search                 q (required) + the above        GET
  //     /products/category/{name}     limit skip                      GET
  //
  //     Response envelope: { <resource>: [...], total, skip, limit }
  //
  //  2. add the "break it on purpose" hint. NOTE dummyjson mostly does NOT
  //     reject bad input - verified:
  //       ?sortBy=nonsense            -> 200, unsorted data, no warning
  //       ?sort=age (wrong name)      -> 200, silently ignored
  //       /users/filter (no key/val)  -> 200, empty array
  //       /users/99999                -> 404 {"message":"User with id ... not found"}
  //     So use /users/99999 for the error demo - it is the only clean JSON error.
  //     Show `error` in red when it fires (reuse the existing idiom:
  //     {error && <div className="text-red-500 mt-2">Error: {error}</div>})
  //
  //     The silent-ignore behaviour is the SHARPER lesson-4 point: a server
  //     that ignores your param hands back plausible wrong data instead of
  //     telling you. Call that out in the panel text.
  //
  //  3. worth writing in the Readme: the course's own API (api.boot.dev)
  //     now 404s on /locations and /items, and rejects sort=level and
  //     sort=quality with 400 - which is itself a live demo of Lesson 4.
}
