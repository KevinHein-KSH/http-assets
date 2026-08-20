import { useState, useRef, useEffect } from "react";
import { ApiUser } from "../types";
import { dedupeByEmail } from "../../../utils/jsonUtil";

export const useFetchUsers = () => {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const fetchUsers = (urlInput: string) => {
    setLoading(true);
    setError(null);
    // will use dynamice URL later
    // will add error handling later chapter
    // will update with async/await later chapter
    getUsers(urlInput)
      .then((u) => {
        if (!mounted.current) return;
        setUsers(dedupeByEmail(u));
      })
      .catch((err) => {
        if (!mounted.current) return;
        setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (mounted.current) setLoading(false);
      });
  };

  const clear = () => {
    setUsers([]);
    setError(null);
  };

  return { users, loading, error, fetchUsers, clear };
};

function getUsers(url: string): Promise<ApiUser[]> {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<ApiUser[]>;
  });
}
