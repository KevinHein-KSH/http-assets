export type URLParts = {
  hash: string; // fragment including leading #
  host: string; // hostname[:port]
  domain: string; // hostname without trailing : without port
  href: string; // full URL
  origin: string; // scheme + domain + port
  password: string; // from user:password@domain
  pathname: string; // path after domain + port
  port: string;
  protocol: string; // scheme: http:, https:, etc.
  search: string; // query string including leading ?
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

export interface ParseResultOk {
  ok: true;
  url: URL;
}
export interface ParseResultErr {
  ok: false;
  reason: string;
}
export type ParseResult = ParseResultOk | ParseResultErr;

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
  allowIP: false, // flip to false if you want domains-only, true to allow IPs
  enforceDnsLabels: true,
};

// last
function praseURL(raw: string): ParseResult {
  const trimmed = raw?.trim() ?? "";
  if (!trimmed) return { ok: false, reason: "Empty input" };
  try {
    const url = trimmed.includes("://")
      ? new URL(trimmed)
      : new URL("http://" + trimmed);
    return { ok: true, url };
  } catch {
    return { ok: false, reason: "Unable to parse URL" };
  }
}

function isIPv4(s: string): boolean {
  const parts = s.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    if (!/^\d+$/.test(p)) return false;
    const n = Number(p);
    return n >= 0 && n <= 255 && String(n) === String(Number(p));
  });
}

function isIPv6(s: string): boolean {
  // URL.hostname returns IPv6 without brackets; basic heuristic is fine here.
  // Covers compressed (::) and hex groups up to 8.
  return /^([0-9a-f]{0,4}:){2,7}[0-9a-f]{0,4}$/i.test(s) || s === "::";
}

function hasValidTld(hostname: string): boolean {
  const parts = hostname.split(".");
  if (parts.length < 2) return false;
  const tld = parts[parts.length - 1] ?? "";
  // Accept punycode TLDs and ASCII alpha TLDs; reject if empty/too long.
  if (tld.length < 2 || tld.length > 63) return false;
  if (tld.toLowerCase().startsWith("xn--")) return true;
  return /^[a-z]{2,63}$/i.test(tld);
}

function validateHost(url: URL, policy: ValidationPolicy): ValidationResult {
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

  // IP address
  if (isIPv4(hostname) || isIPv6(hostname)) {
    if (!policy.allowIP) {
      return {
        valid: false,
        code: "ip_disallowed",
        message: "IP addresses are not allowed.",
      };
    } else {
      return { valid: true, hostname };
    }
  }

  if (labels.length === 1) {
    if (!policy.allowSingleLabel) {
      return {
        valid: false,
        code: "single_label_disallowed",
        message: "Single-label hosts are not allowed.",
      };
    }
  } else {
    if (policy.requireTld && !hasValidTld(hostname)) {
      return {
        valid: false,
        code: "no_tld",
        message:
          "Host must include a valid top-level domain (e.g., .com, .io).",
      };
    }
  }

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
  return { valid: true, hostname }; // Placeholder for actual validation logic
}

function parseAndValidate(
  raw: string,
  policy: ValidationPolicy = DEFAULT_PUBLIC_POLICY
): ParseAndValidateResult {
  const parseResult = praseURL(raw);
  if (!parseResult.ok) {
    return {
      ok: false,
      code: "parse_failed",
      message: parseResult.reason,
    };
  }
  const url = parseResult.url;
  const validation = validateHost(url, policy);
  if (!validation.valid) {
    return {
      ok: false,
      code: validation.code,
      message: validation.message,
    };
  }
  return {
    ok: true,
    url,
    hostname: validation.hostname,
  };
}

export function getHostname(input: string, policy = DEFAULT_PUBLIC_POLICY) {
  const res = parseAndValidate(input, policy);
  return res.ok ? res.hostname : null;
}

export function getUrl(input: string, policy = DEFAULT_PUBLIC_POLICY) {
  const res = parseAndValidate(input, policy);
  return res.ok ? res.url : null;
}
