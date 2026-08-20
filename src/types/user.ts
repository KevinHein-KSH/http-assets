// user - the Chapter 8 user domain.
//
// Lives in src/types/ rather than beside Chapter 8 because utils/serviceUtil.ts
// consumes these three, and serviceUtil sits outside Ch8-HTTP_Methods/. By the
// placement rule (Ch9 LESSON_PLAN §11) that makes them shared, not chapter-local.
//
// Ch8-only members of the same domain - Stored, emptyUser - live in
// components/Ch8-HTTP_Methods/types.ts instead. Nothing outside Ch8 imports those.

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserResp = Omit<User, "firstName" | "lastName"> & {
  name: string;
  isDeleted: boolean;
  deletedOn: string;
  isLocal: boolean;
};

export type ErrorResp = {
  valid: boolean;
  message: string | null;
}
