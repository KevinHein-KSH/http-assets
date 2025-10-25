export type URLParts = {
  hash: string;     // fragment including leading #
  host: string;     // hostname[:port]
  domain: string;   // hostname without trailing : without port
  href: string;     // full URL
  origin: string;   // scheme + domain + port
  password: string; // from user:password@domain
  pathname: string; // path after domain + port
  port: string;     
  protocol: string; // scheme: http:, https:, etc.
  search: string;   // query string including leading ?
  userinfo: string; // from user:password@domain
};

export interface ValidationPolicy {
  allowedSchemes: ReadonlyArray<"http" | "https">;
  requireTld: boolean;
  allowSingleLabel: boolean;
  allowLocalhost: boolean;
  allowIP: boolean;
  enforceDnsLabels: boolean;
}

// ---------- Default policies ----------
export const DEFAULT_PUBLIC_POLICY: ValidationPolicy = {
  allowedSchemes: ["http", "https"],
  requireTld: true,
  allowSingleLabel: false,
  allowLocalhost: false,
  allowIP: true, // flip to false if you want domains-only
  enforceDnsLabels: true,
};

export function normalizeDomain(raw: string): URL | string {
    try {
      const trimmed = raw.trim();
      if (!trimmed) return "";
      // Strip protocol and path if user pastes a full URL
      const url = trimmed.includes("://") ? new URL(trimmed) : new URL("http://" + trimmed);
        console.log("url", url);
      return url;
    } catch {
      return raw.trim();
    }
}

function validateURL(url: URL, policy: ValidationPolicy): boolean {
  const scheme = url.protocol.replace(":", "") as "http" | "https" | string;
  if (!policy.allowedSchemes.includes(scheme as "http" | "https")) {
    return false;
  }
  return true; // Placeholder for actual validation logic
}