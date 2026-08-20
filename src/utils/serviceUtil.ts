import { User, UserResp, ErrorResp } from "../types/user";

//Generate API Key
export function generateKey() {
  const characters = "ABCDEF0123456789";
  let result = "";
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  console.log("2 result is normal for dev env.", result);
  return result;
}

// Map User to UserResp
export function mapUser(
  u: User & Partial<Pick<UserResp, "isDeleted" | "deletedOn" | "isLocal">>,
): UserResp {
  return {
    id: u.id,
    name: u.firstName + " " + u.lastName,
    email: u.email,
    password: u.password,
    isDeleted: u.isDeleted || false,
    deletedOn: u.deletedOn || "",
    isLocal: u.isLocal || false,
  };
}

// Validate User Form
export function validateUser(form: User): ErrorResp {
  if (!form.firstName || !form.lastName || !form.email || !form.password) {
    return {
      valid: false,
      message: "All fields are required.",
    };
  }
  return {
    valid: true,
    message: null,
  };
}

// split first and last name from full name
export function splitName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const [firstName = "", lastName = ""] = fullName.split(" ");
  return { firstName, lastName };
}

// apiFetch method, mode, header, body and error handling
export async function apiFetch(
  url: string,
  apiKey: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: User,
): Promise<any> {
  const options: RequestInit = {
    method,
    mode: "cors",
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
