// UrlPreview - PANEL 3 - "THE URL WE BUILT"  <- the most important panel
//
// Shows: the fully composed URL, then a table breaking it into
//        origin / each path segment / each key=value pair.
// Proves: Lessons 1, 3 and 5 all at once - and it updates LIVE as the user
//         changes panels 1 and 2, BEFORE any request is sent. Someone watching
//         sees the URL assemble itself piece by piece. That is the chapter.
//
// Deliberately mirrors Ch3-URL/URLParts.tsx, which decomposes a URL the same
// way - worth a look before building this.

// TODO: props type
// type UrlPreviewProps = {
//   url: string;
//   onSend: () => void;
//   loading: boolean;
// };

export default function UrlPreview() {
  // TODO (Lesson 1 + 3 + 5):
  //  1. render the full URL string, monospace, wrapping on long values.
  //     Optionally colour origin / path / query differently so the three
  //     parts are visually separable at a glance.
  //  2. call describeUrl(url) from ../../utils/urlUtil to get
  //     { origin, segments, params } - remember it returns null on bad input,
  //     so handle the null branch.
  //  3. render a two-column table:
  //       origin      | https://dummyjson.com
  //       segment 1   | products
  //       segment 2   | category        <- only when a sub-path is selected
  //       ------------+----------------
  //       sortBy      | price           <- one row per surviving param,
  //       order       | desc               rows appear/vanish as fields are
  //       limit       | 5                  filled/cleared
  //  4. a [ Send Request ] button -> onSend, disabled while loading.
}
