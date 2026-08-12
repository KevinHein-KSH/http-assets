// ResultsTable - PANEL 5 - "RESULTS"
//
// Shows: the records the server sent back, plus total / skip / limit.
// Proves: the params actually did something - sorting really changed the
//         order, limit really capped the row count.

// TODO: props type
// type ResultsTableProps = {
//   rows: Record<string, unknown>[];
//   total: number;
//   loading: boolean;
// };

export default function ResultsTable() {
  // TODO:
  //  - show the meta line first: "total: 194   showing: 5"
  //    `total` is the FULL count on the server; `rows.length` is what `limit`
  //    let through. Seeing both side by side is what makes limit/skip click.
  //  - render the rows. Two options:
  //      a) MUI <DataGrid> like HttpMethods.tsx (consistent with Ch8), or
  //      b) a plain <Table> - simpler, since columns here are dynamic
  //  - columns are NOT fixed: they change per resource, and `select` can
  //    narrow them further. Derive them from the keys of the first row
  //    rather than hardcoding.
  //    Heads up: noUncheckedIndexedAccess makes rows[0] `T | undefined`,
  //    so guard it before Object.keys().
  //  - empty state before the first request: "No request sent yet."
}
