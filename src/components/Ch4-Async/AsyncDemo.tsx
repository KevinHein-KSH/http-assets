import React, { useMemo, useState } from "react";
import { Paper, Stack, Typography, Button, Divider, Chip } from "@mui/material";

type Mode = "sync" | "fire" | "await" | "all";

type RequestDef = { id: string; label: string; url: string };

const REQUESTS: RequestDef[] = [
  { id: "post", label: "GET posts", url: "https://jsonplaceholder.typicode.com/posts/1" },
  { id: "comments", label: "GET comments", url: "https://jsonplaceholder.typicode.com/comments?postId=1" },
  { id: "todo", label: "GET todos", url: "https://jsonplaceholder.typicode.com/todos/1" },
];

const stamp = () => new Date().toLocaleTimeString();
const id = () => Math.random().toString(36).slice(2, 7);

export default function AsyncDemo() {
  const [status, setStatus] = useState<Record<Mode, string>>({
    sync: "Idle",
    fire: "Idle",
    await: "Idle",
    all: "Idle",
  });
  const [running, setRunning] = useState<Mode | null>(null);
  const [taps, setTaps] = useState(0);
  const [log, setLog] = useState<{ id: string; text: string }[]>([]);

  const clearAll = () => {
    setStatus({ sync: "Idle", fire: "Idle", await: "Idle", all: "Idle" });
    setTaps(0);
    setLog([]);
    setRunning(null);
  };

  const addLog = (text: string) =>
    setLog((prev) => [...prev.slice(-8), { id: id(), text: `${stamp()} — ${text}` }]);

  const requestChips = useMemo(
    () =>
      REQUESTS.map((r) => (
        <Chip key={r.id} size="small" label={r.label.replace("GET ", "")} variant="outlined" />
      )),
    [],
  );

  async function fetchAndTime(req: RequestDef, start: number) {
    const resp = await fetch(req.url);
    const json = await resp.json();
    const elapsed = Math.round(performance.now() - start);
    const preview =
      typeof json === "object" ? JSON.stringify(json).slice(0, 50) + "…" : String(json);
    return { elapsed, preview };
  }

  const runSync = async () => {
    if (running) return;
    setRunning("sync");
    addLog("Sync run started (sequential awaits)");
    const start = performance.now();
    setStatus((s) => ({ ...s, sync: "Fetching one by one..." }));

    for (const req of REQUESTS) {
      const { elapsed } = await fetchAndTime(req, start);
      addLog(`[Sync] ${req.label} finished at ${elapsed} ms`);
    }

    const total = Math.round(performance.now() - start);
    setStatus((s) => ({ ...s, sync: `Done in ~${total} ms` }));
    addLog(`Sync run done (~${total} ms)`);
    setRunning(null);
  };

  const runFireAndForget = () => {
    if (running) return;
    setRunning("fire");
    addLog("Async started (no await; all fired together)");
    setStatus((s) => ({ ...s, fire: "Requests in flight..." }));
    const start = performance.now();

    let remaining = REQUESTS.length;
    REQUESTS.forEach((req) => {
      fetchAndTime(req, start)
        .then(({ elapsed }) =>
          addLog(`[Async no await] ${req.label} finished at ${elapsed} ms`),
        )
        .catch((err) =>
          addLog(`[Async no await] ${req.label} failed: ${err instanceof Error ? err.message : String(err)}`),
        )
        .finally(() => {
          remaining -= 1;
          if (remaining === 0) {
            const total = Math.round(performance.now() - start);
            setStatus((s) => ({ ...s, fire: `Done in ~${total} ms` }));
            addLog(`Async no await run done (~${total} ms)`);
            setRunning((current) => (current === "fire" ? null : current));
          }
        });
    });
  };

  const runAwaitEach = async () => {
    if (running) return;
    setRunning("await");
    addLog("async/await sequential started");
    const start = performance.now();
    setStatus((s) => ({ ...s, await: "Awaiting each fetch in order..." }));

    for (const req of REQUESTS) {
      const { elapsed } = await fetchAndTime(req, start);
      addLog(`[await] ${req.label} finished at ${elapsed} ms`);
    }

    const total = Math.round(performance.now() - start);
    setStatus((s) => ({ ...s, await: `Done in ~${total} ms` }));
    addLog(`async/await sequential done (~${total} ms)`);
    setRunning(null);
  };

  const runPromiseAll = async () => {
    if (running) return;
    setRunning("all");
    addLog("Promise.all started (concurrent, wait for all)");
    const start = performance.now();
    setStatus((s) => ({ ...s, all: "All fetches running..." }));

    await Promise.all(
      REQUESTS.map((req) =>
        fetchAndTime(req, start).then(({ elapsed, preview }) =>
          addLog(`[Promise.all] ${req.label} finished at ${elapsed} ms`),
        ),
      ),
    );

    const total = Math.round(performance.now() - start);
    setStatus((s) => ({ ...s, all: `All done in ~${total} ms` }));
    addLog(`Promise.all completed (~${total} ms)`);
    setRunning(null);
  };

  return (
    <Paper sx={{ p: 3, m: 3 }}>
      <Typography variant="h6">Async patterns in 4 buttons</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Real network calls (JSONPlaceholder): {requestChips}. Watch finish order and timing.
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="stretch"
      >
        {/* Left: controls */}
        <Stack spacing={2} flex={1} minWidth={0}>
          <Section
            title="Sync (sequential, blocking)"
            description="Awaits one request at a time (sequential)."
            status={status.sync}
            onClick={runSync}
            label="Run sync"
            disabled={!!running}
          />

          <Section
            title="Async (no await) – concurrent, finishes as each completes"
            description="Starts all timers and returns immediately. Logs show whichever finishes first."
            status={status.fire}
            onClick={runFireAndForget}
            label="Fire & forget"
            disabled={!!running}
          />

          <Section
            title="async/await (sequential awaits)"
            description="Awaits each task, so total time is the sum of durations."
            status={status.await}
            onClick={runAwaitEach}
            label="Run async/await"
            disabled={!!running}
          />

          <Section
            title="Promise.all (concurrent, wait for all)"
            description="Starts all tasks together, waits until every one finishes."
            status={status.all}
            onClick={runPromiseAll}
            label="Run Promise.all"
            disabled={!!running}
          />
        </Stack>

        {/* Right: results/log */}
        <Paper
          variant="outlined"
          sx={{ p: 2, flex: 1, minWidth: 0 }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="subtitle2">Recent events</Typography>
            <Button
              size="small"
              variant="contained"
              className="branch-btn"
              onClick={clearAll}
            >
              Clear
            </Button>
          </Stack>
          {log.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Click a button to see what finishes first.
            </Typography>
          ) : (
            <Stack spacing={0.5}>
              {[...log].reverse().map((entry) => (
                <Typography key={entry.id} variant="body2">
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

type SectionProps = {
  title: string;
  description: string;
  status: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

function Section({ title, description, status, label, onClick, disabled }: SectionProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="contained"
            size="small"
            className="branch-btn"
            onClick={onClick}
            disabled={!!disabled}
          >
            {label}
          </Button>
          <Typography variant="body2">{status}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
