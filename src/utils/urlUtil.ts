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

export type ValidationErrorCode =
  | "bad_scheme"
  | "no_tld"
  | "single_label_disallowed"
  | "invalid_chars"
  | "label_too_long"
  | "host_too_long"
  | "ip_disallowed"
  | "localhost_disallowed";

export interface ValidationPolicy {
  allowedSchemes: ReadonlyArray<"http" | "https">;
  requireTld: boolean;
  allowSingleLabel: boolean;
  allowLocalhost: boolean;
  allowIP: boolean;
  enforceDnsLabels: boolean;
}

// export interface ParseResultOk {
//   ok: true;
//   url: URL;
// }
// export interface ParseResultErr {
//   ok: false;
//   reason: string;
// }
// export type ParseResult = ParseResultOk | ParseResultErr;

export interface ValidationOk {
  valid: true;
  hostname: string;
}
export interface ValidationErr {
  valid: false;
  code: ValidationErrorCode;
  message: string;
}
export type ValidationResult = ValidationOk | ValidationErr;

export interface ParseAndValidateOk {
  ok: true;
  url: URL;
  hostname: string;
}
export interface ParseAndValidateErr {
  ok: false;
  code: ValidationErrorCode | "parse_failed";
  message: string;
}
export type ParseAndValidateResult = ParseAndValidateOk | ParseAndValidateErr;

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

// last
function praseURL(raw: string): URL | string {
  try {
    const trimmed = raw.trim();
    if (!trimmed) return "";
    const url = trimmed.includes("://")
      ? new URL(trimmed)
      : new URL("http://" + trimmed);
    return url;
  } catch {
    return raw.trim();
  }
}

function validateURL(url: URL, policy: ValidationPolicy): ValidationResult {
  const scheme = url.protocol.replace(":", "") as "http" | "https" | string;
  if (!policy.allowedSchemes.includes(scheme as "http" | "https")) {
    return {
      valid: false,
      code: "bad_scheme",
      message: "Only http and https are supported.",
    };
  }
  const host = url.hostname;
  const hostname = host.endsWith(".") ? host.slice(0, -1) : host;
  const labels = hostname.split(".");
  const LABEL_RE = /^[a-z0-9-]+$/i;

  if (policy.enforceDnsLabels) {
    for (const label of labels) {
      if (label.length < 1 || label.length > 63) {
        return {
          valid: false,
          code: "label_too_long",
          message: "A label length must be 1–63 characters.",
        };
      }
      if (label.startsWith("-") || label.endsWith("-")) {
        return {
          valid: false,
          code: "invalid_chars",
          message: "Labels cannot start or end with a hyphen.",
        };
      }
      if (!LABEL_RE.test(label)) {
        return {
          valid: false,
          code: "invalid_chars",
          message: "Invalid characters in hostname.",
        };
      }
    }
  }
  return { valid: true, hostname: v.hostname };  // Placeholder for actual validation logic
}