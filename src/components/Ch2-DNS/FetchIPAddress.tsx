import { useState } from "react";
import { Button, Paper, TextField, Alert, Typography, Stack } from "@mui/material";

export default function FetchIPAddress() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [domain, setDomain] = useState("");
  const [ipAddress, setIpAddress] = useState<string>("");

  function normalizeDomain(raw: string) {
    const trimmed = raw.trim();
      if (!trimmed) return "";
      // Strip protocol and path if user pastes a full URL
      const url = trimmed.includes("://")
        ? new URL(trimmed)
        : new URL("http://" + trimmed);
      return url.hostname.replace(/\.$/, ""); // remove trailing dot
  }

  // this require the input to be a full URL if it has protocol
  // function getDomainFromURL(url: string) {
  //   const u = new URL(url);
  //   return u.hostname;
  // }

  function fetchIPAddress(rawDomain: string) {
    const name = normalizeDomain(rawDomain);

    // console.log("Fetching IP for domain:", getDomainFromURL(rawDomain));

    if (!name) {
      setError("Please enter a domain.");
      return;
    }

    setLoading(true);
    setError(null);
    setIpAddress("");

    fetch(
      `https://cloudflare-dns.com/dns-query?name=${name}&type=A`,
       { headers: { Accept: "application/dns-json" } }
    ).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      // console.log("DNS response data:", data);
      const answers = Array.isArray(data.Answer) ? data.Answer : [];
      const aRecords = answers.filter(
        (ans: any) => ans.type === 1 && typeof ans.data === "string"
      );

      if (aRecords.length === 0) {
        setError("No A records found for this domain.");
        return;
      }

      // If you want just the first, keep the first; otherwise join.
      setIpAddress(aRecords.map((a: any) => a.data).join(", "));
    })
    .catch((err) => {
      setError(err instanceof Error ? err.message : String(err));
    })
    .finally(() => setLoading(false));
  }

  return (
    <Paper sx={{ p: 2, m: 3 }} className="space-y-2">
      <Typography variant="h6">Fetch IP Address Example</Typography>

      <TextField
        placeholder="Enter domain name"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && domain.trim()) {
            e.preventDefault();
            fetchIPAddress(domain);
          }
        }}
        size="small"
        sx={{ maxWidth: 420 }}
      />

      <Stack direction="row" spacing={1} className="mt-1">
        <Button
          variant="contained"
          onClick={() => fetchIPAddress(domain)}
          disabled={loading || !domain.trim()}
        >
          {loading ? "Loading..." : "IP Fetch"}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setIpAddress("");
            setDomain("");
            setError(null);
          }}
          disabled={
            loading || (domain.trim() === "" && ipAddress === "" && !error)
          }
        >
          Clear
        </Button>
      </Stack>

      {error && (
        <Alert role="alert" severity="error">
          Error: {error}
        </Alert>
      )}
      {!error && !loading && !ipAddress && (
        <Typography variant="body2" color="text.secondary">
          No IPs yet!
        </Typography>
      )}
      {ipAddress && <Typography>IP Address: {ipAddress}</Typography>}
    </Paper>
  );
}
