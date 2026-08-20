import { useMemo, useState } from "react";
import {
  Alert,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type LogTone = "info" | "error" | "success";

type LogEntry = {
  id: string;
  text: string;
  tone: LogTone;
};

const id = () => Math.random().toString(36).slice(2, 8);

export default function ErrorDemo() {
  const [username, setUsername] = useState("");
  const [validationMsg, setValidationMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchState, setFetchState] = useState<string | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);

  const addLog = (text: string, tone: LogTone = "info") =>
    setLog((prev) => [...prev.slice(-7), { id: id(), text, tone }]);

  const validationHint = useMemo(
    () =>
      "Only letters and spaces are allowed. Punctuation mimics bad user input and triggers error handling.",
    [],
  );

  const validateInput = () => {
    try {
      if (!username.trim()) throw new Error("Name is required");
      if (/[^a-zA-Z\s]/.test(username))
        throw new Error("Punctuation not allowed in this field");

      setValidationMsg("Looks good — no error thrown");
      addLog(`Validation passed for "${username.trim()}"`, "success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown validation error";
      setValidationMsg(message);
      addLog(`Validation failed: ${message}`, "error");
    }
  };

  const runSynchronousError = () => {
    try {
      addLog("Attempting to read property on undefined (will throw)...");
      const speed = (undefined as any).speed;
      addLog(`Speed is ${speed}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      addLog(`Caught runtime error: ${message}`, "error");
    }
  };

  const fetchTodo = async (url: string) => {
    setLoading(true);
    setFetchState(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const todo = await res.json();
      setFetchState(`Success: Todo ${todo.id} → ${todo.title}`);
      addLog(`Fetch succeeded (${url})`, "success");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setFetchState(`Handled error: ${message}`);
      addLog(`Fetch failed (${url}): ${message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, m: 3 }}>
      <Typography variant="h6" gutterBottom>
        Error handling in action (sync + async)
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Three quick experiments: input validation (expected errors), catching a runtime bug,
        and handling failed API responses with async/await.
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="stretch">
        {/* Left column */}
        <Stack spacing={2} flex={1} minWidth={0}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1">1) Guard bad user input</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {validationHint}
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems="flex-start">
              <TextField
                size="small"
                label="Character name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Luke Skywalker"
              />
              <Button variant="contained" size="small" className="branch-btn" onClick={validateInput}>
                Validate
              </Button>
            </Stack>
            {validationMsg && (
              <Alert
                severity={/looks good/i.test(validationMsg) ? "success" : "warning"}
                sx={{ mt: 1 }}
              >
                {validationMsg}
              </Alert>
            )}
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1">2) Catch a thrown runtime error</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Press the button to intentionally trigger a reference error and catch it with
              try/catch so the UI keeps running.
            </Typography>
            <Button variant="contained" size="small" className="branch-btn" onClick={runSynchronousError}>
              Trigger sync error
            </Button>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1">3) Async fetch with success & failure</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Success calls a valid endpoint; failure calls one that returns HTTP 500. Both are handled.
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Button
                variant="contained"
                size="small"
                className="branch-btn"
                disabled={loading}
                onClick={() => fetchTodo("https://jsonplaceholder.typicode.com/todos/1")}
              >
                Fetch ok
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                disabled={loading}
                onClick={() => fetchTodo("https://httpstat.us/500")}
              >
                Fetch error
              </Button>
              <Button
                variant="text"
                size="small"
                className="branch-btn"
                onClick={() => setFetchState(null)}
                disabled={loading}
              >
                Clear
              </Button>
            </Stack>
            {fetchState && (
              <Alert severity={fetchState.startsWith("Success") ? "success" : "error"} sx={{ mt: 1 }}>
                {fetchState}
              </Alert>
            )}
          </Paper>
        </Stack>

        {/* Right column */}
        <Paper variant="outlined" sx={{ p: 2, flex: 1, minWidth: 0 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Recent events</Typography>
            <Button size="small" variant="contained" className="branch-btn" onClick={() => setLog([])}>
              Clear
            </Button>
          </Stack>
          <Divider sx={{ mb: 1 }} />
          {log.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Run any action to see how errors are handled and logged.
            </Typography>
          ) : (
            <Stack spacing={0.75}>
              {[...log].reverse().map((entry) => (
                <Typography
                  key={entry.id}
                  variant="body2"
                  color={entry.tone === "error" ? "error" : entry.tone === "success" ? "success.main" : "text.primary"}
                >
                  • {entry.text}
                </Typography>
              ))}
            </Stack>
          )}
        </Paper>
      </Stack>
    </Paper>
  );
}
