import { useState } from "react";
import { Button, Paper, Alert, Typography, Stack } from "@mui/material";

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
    return fetch(url).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<ApiUser[]>;
    });
  }

  function insertUrl() {
    setLoading(true);
    setError(null);
    // will use dynamice URL later
    // will add error handling later chapter
    // will update with async/await later chapter
    getUsers("https://api.escuelajs.co/api/v1/users")
      .then((u) => {
        const result = [
          ...new Map(u.map((item) => [item.email, item])).values(),
        ];
        setUsers(result);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : String(err))
      )
      .finally(() => setLoading(false));
  }

  const message = users.length === 0 ? <p>Data haven't fetch yet!</p> : null;

  const getMessage = () => {
    return message;
  };

  return (
    <Paper elevation={3} sx={{ p: 2, m: 3 }} className="space-y-2">
      <Typography variant="h6">Fetch API Example</Typography>

      <Stack direction="row" spacing={1} className="mt-1">
        <Button
          variant="contained"
          onClick={() => {
            insertUrl();
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch Users"}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setUsers([]);
            setError(null);
          }}
          disabled={loading || users.length === 0}
        >
          Clear Users
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" role="alert">
          Error: {error}
        </Alert>
      )}
      {users.length === 0 && getMessage()}

      {users.length > 0 && (<div className="mt-4 grid grid-cols-3 gap-2">
        <div className="font-semibold">User Name</div>
        <div className="font-semibold">Email</div>
        <div className="font-semibold">Role</div>

        {users.map((user) => (
          <>
            <div key={user.id} className="col-span-3 grid grid-cols-3">
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div>{user.role}</div>
            </div>
          </>
        ))}
      </div>)}
    </Paper>
  );
}
