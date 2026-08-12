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
  //  2. add the "break it on purpose" hint:
  //     set sortBy to a key the resource does not support and the server
  //     answers 400 - the request is well-formed, the SERVER just says no.
  //     Show `error` here in red when that happens (reuse the existing idiom:
  //     {error && <div className="text-red-500 mt-2">Error: {error}</div>})
  //
  //  3. worth writing in the Readme: the course's own API (api.boot.dev)
  //     now 404s on /locations and /items, and rejects sort=level and
  //     sort=quality with 400 - which is itself a live demo of Lesson 4.
}
