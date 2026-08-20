import { useFetchUsers } from "./hooks/useFetchUsers";
import { Button, Paper, Alert, Typography, Stack } from "@mui/material";

export default function FetchData() {
  const { users, loading, error, fetchUsers, clear } = useFetchUsers();

  const url = "https://api.escuelajs.co/api/v1/users";

  return (
    <Paper elevation={3} sx={{ p: 2, m: 3 }} className="space-y-2">
      <Typography variant="h6">Fetch API Example</Typography>

      <Stack direction="row" spacing={1} className="mt-1">
        <Button
          variant="contained"
          onClick={() => {
            fetchUsers(url);
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch Users"}
        </Button>
        <Button
          variant="outlined"
          onClick={clear}
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
      {!error && !loading && users.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          Data hasn't been fetched yet!
        </Typography>
      )}

      {users.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="font-semibold">User Name</div>
          <div className="font-semibold">Email</div>
          <div className="font-semibold">Role</div>

          {users.map((user) => (
            <div key={user.id} className="col-span-3 grid grid-cols-3">
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div>{user.role}</div>
            </div>
          ))}
        </div>
      )}
    </Paper>
  );
}
