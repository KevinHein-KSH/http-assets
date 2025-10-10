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