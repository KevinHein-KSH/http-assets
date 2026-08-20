// useUserStorage - localStorage read/write logic for users

import { useCallback } from "react";
import { UserResp } from "../../../types/user";
import { Stored } from "../types";

const STORAGE_KEY = "last17users";

export function useUserStorage() {
  // READ from localStorage
  const getUsersFromStorage = useCallback((): Stored | null => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) {
      return null; // no cache yet -> caller should hit the network
    }
    try {
      return JSON.parse(storedData) as Stored;
    } catch (error) {
      console.error("Error parsing stored data:", error);
      return null;
    }
  }, []);

  // WRITE to localStorage
  const saveUsersToStorage = useCallback((data: Stored) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data to storage:", error);
    }
  }, []);

  // CLEAR localStorage
  const clearUsersFromStorage = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing data from storage:", error);
    }
  }, []);

  // Convenience: return non-deleted users
  const getActiveUsers = useCallback((): UserResp[] => {
    const storedData = getUsersFromStorage();
    return storedData ? storedData.users.filter((user) => !user.isDeleted) : [];
  }, [getUsersFromStorage]);

  return {
    getUsersFromStorage,
    saveUsersToStorage,
    clearUsersFromStorage,
    getActiveUsers,
  };
}
