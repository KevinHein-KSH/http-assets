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
  
  async function getUsers(url: string): Promise<ApiUser[]> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<ApiUser[]>;
  }

  async function insertUrl() {
    setLoading(true);
    setError(null);
    // will use dynamice URL later
    // will add error handling later chapter
    const res = await getUsers("https://api.escuelajs.co/api/v1/users");
    setUsers(res);
    setLoading(false);
    console.log("Fetched users in App:", res);
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
        { users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}) - Role: {user.role}
          </li>
        )) }
      </ul>
    </>
  );
}
