import { useState } from "react";

export type ApiUser = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: "customer" | "admin" | "seller" | string; // widen if unsure
  avatar: string;
  creationAt: string; // ISO string from API
  updatedAt: string; // ISO string from API
};

export default function FetchData() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function getUsers(url: string): Promise<ApiUser[]> {
    return fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<ApiUser[]>;
      })
  }

  function insertUrl() {
    setLoading(true);
    setError(null);
    // will use dynamice URL later
    // will add error handling later chapter
    // will update with async/await later chapter
    getUsers("https://api.escuelajs.co/api/v1/users")
    .then(setUsers)
    .catch(err => setError(err instanceof Error ? err.message : String(err)))
    .finally(() => setLoading(false));
  }

  const message = users.length === 0 ? <p>Data haven't fetch yet!</p> : null;

  const getMessage = () => {
    return message;
  };

  return (
    <>
      <h2>Fetch API Example</h2>
      <p>Check the console for fetched data.</p>

      <button
        onClick={() => {
          insertUrl();
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Users"}
      </button>
      <button
        onClick={() => {
          setUsers([]);
          setError(null);
        }}
        disabled={loading || users.length === 0}
      >
        Clear Users
      </button>

      {/* error handling messages */}
      {error && <p role="alert">Error: {error}</p>}
      {users.length === 0 && getMessage()}

      <ul id="userList">
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}) - Role: {user.role}
          </li>
        ))}
      </ul>
    </>
  );
}
