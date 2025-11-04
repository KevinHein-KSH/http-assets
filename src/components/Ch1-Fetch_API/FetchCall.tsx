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
  
  async function getUsers(url: string): Promise<ApiUser[]> {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as Promise<ApiUser[]>;
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

  const message = users.length === 0 ? (
    <Typography variant="body2" color="text.secondary">
      Data haven't fetch yet!
    </Typography>
  ) : null;

  const getMessage = () => {
    return message;
  };

  return (
    <Paper sx={{ p: 2, m: 3 }} className="space-y-2">
      <Typography variant="h6">Fetch API Example</Typography>
      <Typography variant="body2" color="text.secondary">
        Check the console for fetched data.
      </Typography>

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

      <ul id="userList" className="list-disc pl-5">
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}) - Role: {user.role}
          </li>
        ))}
      </ul>
    </Paper>
  );
}
