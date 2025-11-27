import { useState } from "react";
import { Button, Paper, TextField, Alert, Typography, Stack } from "@mui/material";
import { getHostname } from "../../utils/urlUtil";

export default function FetchIPAddress() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [domain, setDomain] = useState("");
  const [ipAddress, setIpAddress] = useState<string>("");

  // this require the input to be a full URL if it has protocol
  // function getDomainFromURL(url: string) {
  //   const u = new URL(url);
  //   return u.hostname;
  // }

  async function fetchIPAddress(rawDomain: string) {
    const name = getHostname(rawDomain) ?? "";
    
    // console.log("Fetching IP for domain:", getDomainFromURL(rawDomain));

    if (!name) {
      setError("Please enter a domain.");
      return;
    }

    setLoading(true);
    setError(null);
    setIpAddress("");

    try {
      const resp = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${name}&type=A`,
        { headers: { Accept: "application/dns-json" } }
      );

      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();

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
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 2, m: 3 }} className="space-y-2">
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
