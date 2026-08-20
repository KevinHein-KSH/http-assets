// useHttpMethods - combined CRUD hook (data, loading, error, getUsers, createUser, updateUser, deleteUser, clear)
import { useState, useCallback } from "react";
import { useUserStorage } from "./useUserStorage";
import { User, UserResp } from "../../../types/user";
import { Stored } from "../types";
import { validateUser, mapUser } from "../../../utils/serviceUtil";
import {
  getUsersTotal,
  fetchUsersList,
  createUser,
  updateUser,
  deleteUser,
} from "../useApi";

export function useHttpMethods() {
  // State management for data, loading, and error
  const [data, setData] = useState<UserResp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { getUsersFromStorage, saveUsersToStorage, clearUsersFromStorage } =
    useUserStorage(); // custom hook for local storage management

  // Get / Fetch
  const getUserHandler = useCallback(
    async (url: string, apiKey: string) => {
      try {
        setLoading(true);
        setError(null);

        // 1. check local storage
        const storedData: Stored | null = getUsersFromStorage();

        // 2. local storage exists -> use cache, skip network entirely
        if (storedData) {
          console.log("Using cached data from localStorage.", storedData);
          setData(storedData.users.filter((user) => user.isDeleted === false));
          return;
        }

        // 3. no local storage -> get total
        const totalUsers = await getUsersTotal(url, apiKey);

        // 4. get last 17 data
        const skip = Math.max(0, totalUsers - 17);
        const mapped: UserResp[] = await fetchUsersList(url, apiKey, skip);
        console.log(mapped);

        // save to local storage for next time
        const fresh: Stored = { total: totalUsers, users: mapped };
        saveUsersToStorage(fresh);

        setData(mapped);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [getUsersFromStorage, saveUsersToStorage],
  );

  // POST / Create
  const createUserHandler = useCallback(
    async (url: string, apiKey: string, newUser: User): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);

        const result = validateUser(newUser);
        if (!result.valid) {
          setError(result.message);
          return false;
        }

        // API response
        const responseData = await createUser(url, apiKey, newUser);
        console.log("User created:", responseData);

        // update local storage + UI with the newly created user
        const storedData: Stored | null = getUsersFromStorage();

        if (storedData) {
          const updatedUsers: Stored = {
            total: storedData.total + 1,
            users: [
              ...storedData.users,
              {
                ...responseData,
                id: storedData.total + 1, // to fix dummyjson POST endpoint returns a fixed id (e.g., 208)
                isLocal: true,
              },
            ],
          };
          console.log("after setting in localStorage", updatedUsers);
          saveUsersToStorage(updatedUsers);
          setData(updatedUsers.users.filter((user) => !user.isDeleted));
        }

        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [getUsersFromStorage, saveUsersToStorage],
  );

  // PUT / Update
  const updateUserHandler = useCallback(
    async (
      url: string,
      apiKey: string,
      userId: number,
      updatedUser: User,
    ): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);

        const result = validateUser(updatedUser);
        if (!result.valid) {
          setError(result.message);
          return false;
        }

        const storedData: Stored | null = getUsersFromStorage();
        const checkLocal =
          storedData &&
          storedData.users.some((user) => user.id === userId && user.isLocal);

        if (checkLocal) {
          // If the user is local, update it in local storage and update the UI
          const updatedUsers: Stored = {
            ...storedData,
            users: storedData.users.map((user) =>
              user.id === userId
                ? mapUser({
                    ...user,
                    ...updatedUser,
                    isLocal: true,
                    isDeleted: user.isDeleted,
                    deletedOn: user.deletedOn,
                  })
                : user,
            ),
          };
          saveUsersToStorage(updatedUsers);
          setData(updatedUsers.users.filter((user) => !user.isDeleted));
          return true; // Exit early since we don't need to make a network request
        }

        // If the user is not local, make a PUT request to update it on the server
        const responseData: UserResp = await updateUser(
          url,
          apiKey,
          userId,
          updatedUser,
        );
        console.log("User updated:", responseData);

        if (storedData) {
          const updatedUsers: Stored = {
            ...storedData,
            users: storedData.users.map((user) =>
              user.id === userId
                ? {
                    ...user,
                    ...responseData,
                    isLocal: user.isLocal,
                    isDeleted: user.isDeleted,
                    deletedOn: user.deletedOn,
                  }
                : user,
            ),
          };
          saveUsersToStorage(updatedUsers);
          setData(updatedUsers.users.filter((user) => !user.isDeleted));
        }

        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [getUsersFromStorage, saveUsersToStorage],
  );

  // DELETE / Delete
  const deleteUserHandler = useCallback(
    async (url: string, apiKey: string, userId: number): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);

        const storedData: Stored | null = getUsersFromStorage();

        const checkLocal =
          storedData &&
          storedData.users.some((user) => user.id === userId && user.isLocal);

        if (checkLocal) {
          // If the user is local, remove it from local storage and update the UI
          const updatedUsers: Stored = {
            ...storedData,
            users: storedData.users.map((user) =>
              user.id === userId
                ? {
                    ...user,
                    isDeleted: true,
                    deletedOn: new Date().toISOString(),
                  }
                : user,
            ),
          };
          saveUsersToStorage(updatedUsers);
          setData(updatedUsers.users.filter((user) => !user.isDeleted));
          return true; // Exit early since we don't need to make a network request
        }

        const responseData = await deleteUser(url, apiKey, userId);
        console.log("User deleted:", responseData);

        if (storedData) {
          const updatedUsers: Stored = {
            ...storedData,
            users: storedData.users.map((user) =>
              user.id === userId
                ? {
                    ...user,
                    isDeleted: responseData.isDeleted,
                    deletedOn: responseData.deletedOn,
                  }
                : user,
            ),
          };
          saveUsersToStorage(updatedUsers);
          setData(updatedUsers.users.filter((user) => !user.isDeleted));
        }

        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [getUsersFromStorage, saveUsersToStorage],
  );

  // Clear local storage and reset data
  const clearHandler = useCallback(() => {
    setData([]);
    setError(null);
    clearUsersFromStorage();
  }, [clearUsersFromStorage]);

  return {
    data,
    loading,
    error,
    clear: clearHandler,
    getUsers: getUserHandler,
    createUser: createUserHandler,
    updateUser: updateUserHandler,
    deleteUser: deleteUserHandler,
  };
}
