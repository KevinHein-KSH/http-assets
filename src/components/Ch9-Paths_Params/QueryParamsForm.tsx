// QueryParamsForm - PANEL 2 - "THE PARAMETERS" (Lesson 3 & 5)
//
// Shows: one control per supported query param.
// Proves: Lesson 3 (one param) then Lesson 5 (many params, "?" then "&").
//         Blank field => param is DROPPED from the URL entirely (omit-empty).

// TODO: props type
// type QueryParamsFormProps = {
//   resource: Resource;                     // decides which sortBy keys to offer
//   params: Record<string, string>;
//   onChange: (key: string, value: string) => void;
//   loading: boolean;
// };

export default function QueryParamsForm() {
  // TODO (Lesson 3 + 5):
  //  - sortBy : <Select>, options come from SORT_KEYS[resource] in urlUtil.
  //             MUST repopulate when resource changes - that visibly proves
  //             "different resources support different params" (Lesson 2 + 4).
  //  - order  : <Select> asc | desc
  //  - limit  : number field
  //  - skip   : number field
  //  - select : text field, e.g. "title,price" (comma-separated field list)
  //  - q      : text field, only meaningful on the /search sub-path
  //
  //  - include a blank "(none)" option on every Select so a param can be
  //    cleared -> then watch it disappear from the URL in panel 3.
  //  - add a caption: "leave any field blank and the param is left out of
  //    the URL" so the omit-empty behaviour is discoverable from the UI alone.
  //
  //  Try `q = john doe` (with the space) to see URLSearchParams encode it.
}
