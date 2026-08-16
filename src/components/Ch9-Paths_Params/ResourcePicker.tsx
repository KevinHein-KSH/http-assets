// ResourcePicker - PANEL 1 - "THE PATH" (Lesson 1 & 2: paths / REST resources)
//
// Shows: radio buttons for the resource, plus an optional sub-path.
// Proves: the path names a resource, and swapping it changes the URL's path
//         segments in the preview panel.

// TODO: props type
// type ResourcePickerProps = {
//   resource: Resource;
//   subPath: string;
//   onResourceChange: (r: Resource) => void;
//   onSubPathChange: (p: string) => void;
//   loading: boolean;
// };

export default function ResourcePicker() {
  // TODO (Lesson 1 + 2):
  //  - render one radio per resource: users | posts | products | comments
  //    (drive this off the Resource union / SORT_KEYS keys in urlUtil,
  //     don't hardcode a second list that can drift)
  //  - render sub-path options: none | search | category/smartphones
  //    "category/smartphones" is deliberately TWO segments - it shows a path
  //    is just a string the server interprets, not a single "resource" slot
  //  - note in the UI that /users/search REQUIRES the q param (ties to panel 4)
  //  - MUI RadioGroup/FormControlLabel, Tailwind classes for layout,
  //    same mixed style as UserToolbar.tsx
}
