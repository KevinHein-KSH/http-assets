// usePathsParams - Chapter 9 request hook. Rationale in LESSON_PLAN.md §6.3.

import { useState, useCallback } from "react";
import { fetchResource, extractRecords, Resource } from "../apiResource";

export function usePathsParams() {
  const [data, setData] = useState<unknown[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(async (fullUrl: string, apiKey: string, resource: Resource) => {
    try {
      setLoading(true);
      setError(null);
      const body = await fetchResource(fullUrl, apiKey);
      setData(extractRecords(body, resource));
      setTotal(body.total ?? 0);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setData([]);
    setTotal(0);
    setError(null);
  }, []);

  return { data, total, loading, error, sendRequest, clear };
}
