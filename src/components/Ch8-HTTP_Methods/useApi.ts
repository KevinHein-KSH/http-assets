// userApi - fetch API calls (GET, POST, PUT, DELETE)
import { User, UserResp } from "../../types/user";
import { mapUser, apiFetch } from "../../utils/serviceUtil";

// Get users total count
export async function getUsersTotal(
  url: string,
  apiKey: string,
): Promise<number> {
  const metaResponse = await apiFetch(url + "?limit=1", apiKey, "GET");
  return metaResponse.total;
}

// Get users
export async function fetchUsersList(
  url: string,
  apiKey: string,
  skip: number,
): Promise<UserResp[]> {
  // Implementation for fetching users
  const urlWithParams = `${url}?limit=17&skip=${skip}`;

  const responseJson = await apiFetch(urlWithParams, apiKey, "GET");
  return responseJson.users.map(mapUser);
}

// Create user
export async function createUser(
  url: string,
  apiKey: string,
  userData: User,
): Promise<UserResp> {
  const responseData = await apiFetch(url, apiKey, "POST", userData);
  return mapUser({ ...responseData }); // Assuming the API returns the created user data
}

// PUT, Update user
export async function updateUser(
  url: string,
  apiKey: string,
  userId: number,
  updatedData: Partial<User>,
): Promise<UserResp> {
  const responseData = await apiFetch(`${url}/${userId}`, apiKey, "PUT", updatedData as User);
  return mapUser({ ...responseData, isLocal: false }); // Assuming the API returns the updated user data
}

// DELETE user
export async function deleteUser(
  url: string,
  apiKey: string,
  userId: number,
): Promise<UserResp> {
  const responseData = await apiFetch(`${url}/${userId}`, apiKey, "DELETE");
  return mapUser({ ...responseData, isLocal: false }); // Assuming the API returns the deleted user data
}
