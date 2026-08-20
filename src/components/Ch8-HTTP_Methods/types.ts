// Chapter 8's own types - the members of the user domain that nothing outside
// this folder imports. Placement rule: Ch9 LESSON_PLAN §11.
//
// The shared half (User, UserResp, ErrorResp) is in src/types/user.ts, because
// utils/serviceUtil.ts consumes it from outside this folder.

import { User, UserResp } from "../../types/user";

export type Stored = { total: number; users: UserResp[] };

export const emptyUser: User = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
