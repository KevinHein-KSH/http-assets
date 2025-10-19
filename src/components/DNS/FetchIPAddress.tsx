import { useState } from "react";

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
  function getDomainFromURL(url: string) {
    const u = new URL(url);
    return u.hostname;
  }

  async function fetchIPAddress(rawDomain: string) {
    const name = normalizeDomain(rawDomain);

    // console.log("Fetching IP for domain:", getDomainFromURL(rawDomain));

    if (!name) {
      setError("Please enter a domain.");
      return;
    }

    setLoading(true);
    setError(null);
    setIpAddress("");

    const resp = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${name}&type=A`,
      { headers: { Accept: "application/dns-json" } }
    );

    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();

    // data.Answer can be undefined on NXDOMAIN / NOERROR-NODATA
    const answers = Array.isArray(data.Answer) ? data.Answer : [];
    const aRecords = answers.filter(
      (ans: any) => ans.type === 1 && typeof ans.data === "string"
    );

    if (aRecords.length === 0) {
      setError("No A records found for this domain.");
      setLoading(false);
      return;
    }

    // If you want just the first, keep the first; otherwise join.
    setIpAddress(aRecords.map((a: any) => a.data).join(", "));
    setLoading(false);
  }

  return (
    <>
      <h2>Fetch IP Address Example</h2>

      <input
        type="text"
        placeholder="Enter domain name"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && domain.trim()) {
            e.preventDefault();
            fetchIPAddress(domain);
          }
        }}
      />

      <button
        onClick={() => fetchIPAddress(domain)}
        disabled={loading || !domain.trim()}
      >
        {loading ? "Loading..." : "IP Fetch"}
      </button>

      {error && <p role="alert">Error: {error}</p>}
      {!error && !loading && !ipAddress && <p>No data fetched yet.</p>}
      {ipAddress && <p>IP Address: {ipAddress}</p>}
    </>
  );
}
