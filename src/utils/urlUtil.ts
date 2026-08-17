// urlUtil - everything URL, in two halves:
//
//   PART 1  CHECK  (Ch3) - take an untrusted string, parse + validate it.
//                          Returns null on failure, never throws.
//   PART 2  BUILD  (Ch9) - take trusted parts, compose a request URL.
//                          Throws on a bad base - that's a bug, not user input.
//
// The halves are independent except for describeUrl(), which reuses getUrl()
// from PART 1 rather than writing a second parser.

// ============================================================
// PART 1 - CHECK: parse + validate untrusted input (Chapter 3)
// ============================================================

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
  policy: ValidationPolicy = DEFAULT_PUBLIC_POLICY,
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

// ==================================================================
// PART 2 - BUILD: compose request URLs from trusted parts (Chapter 9)
// ==================================================================
//
// Return types are intentionally left off the stubs below so the empty bodies
// still type-check. Add them back as you implement each one.

// ---------- types ----------

// TODO: a query param value. Include undefined/null so "omit empty" works
//       without tripping exactOptionalPropertyTypes.
// export type QueryValue = string | number | boolean | null | undefined;

// TODO: the bag of params handed to buildUrl
// export type QueryParams = Record<string, QueryValue>;

// ---------- Lesson 2: REST resource contract ----------

// TODO: the base url for the demo API
// export const DUMMYJSON_BASE = "https://dummyjson.com";

// TODO: the resources this API exposes. A union type means a typo is a
//       compile error instead of a 404 at runtime.
// export type Resource = "users" | "posts" | "products" | "comments";

// TODO: which sort keys each resource actually supports.
//       Drives the sortBy dropdown in the UI, and proves the point that
//       different resources support different params.
//       Shape: { users: ["id","firstName",...], posts: [...], ... }
//       Use `as const satisfies Record<Resource, readonly string[]>`
// export const SORT_KEYS = {} as const;

// ---------- Lesson 1 + 5: build the url ----------

// Returns: string - the fully composed URL
//
// buildUrl("https://dummyjson.com", ["products"], { sortBy: "price", limit: 5 })
//   -> "https://dummyjson.com/products?sortBy=price&limit=5"
//
// buildUrl("https://dummyjson.com", ["products", "category", "smartphones"], { limit: 1 })
//   -> "https://dummyjson.com/products/category/smartphones?limit=1"
export function buildUrl(base: string, segments: string[], params?: object) {
  // TODO (Lesson 1 + 5):
  //  1. use `new URL()` + `URLSearchParams` - NO string concatenation,
  //     no template literals. That restriction IS the exercise.
  //  2. strip leading/trailing "/" from base and from every segment, then
  //     join with a single "/" so a trailing slash can never produce "//".
  //  3. skip any param whose value is undefined, null or "" (omit-empty).
  //     This is what makes blank fields vanish from the URL in the UI.
  //  4. let URLSearchParams do the encoding - `q=john doe` and
  //     `select=title,price` then come out correct for free.
  //  5. return url.toString()
  //
  //  NOTE: do NOT route the base through getUrl() above. That validates
  //  untrusted input and returns null; here a bad base is a bug in your own
  //  code, so let `new URL()` throw.
  try {
    const url = new URL(base);
    const cleanSegments = segments
      .map((segment) => {
        return segment.trim().replace(/^\/+|\/+$/g, "");
      })
      .filter((segment) => segment.length > 0);
    const urlPath = cleanSegments.join("/");
    if (!url.pathname.endsWith("/")) {
      url.pathname += "/";
    }
    url.pathname += urlPath;

    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      }
      url.search = searchParams.toString();
    }

    return url.toString();
  } catch (err) {
    console.error("Error building URL:", err);
    throw err;
  }
}

// ---------- PARKED: buildQueryString ----------
//
// WHY IT IS COMMENTED OUT, NOT DELETED
// Written and verified (8/8 cases: omit-empty, keeps 0, encodes " " and ",",
// returns "" not "?" when everything drops). It is parked because nothing
// calls it - buildUrl runs its own copy of the same omit-empty loop inline,
// so this is currently dead code and the rule exists in two places.
//
// Two ways to un-park it, decide once the UI is built:
//   A. Wire it into buildUrl:  url.search = buildQueryString(params ?? {});
//      The `url.search` setter strips a leading "?", so this Just Works, and
//      it collapses the duplicated omit-empty rule to one copy.
//   B. Call it from UrlPreview to show the "?..." tail on its own, which is
//      what Ch9 lessons 3 and 5 are actually demonstrating.
// If the UI ends up needing neither, delete this block.
//
// NOTE "Lesson 3 + 5" below means CHAPTER 9's lessons 3 and 5, not Chapters
// 3 and 5. (PART 1's "Ch3" above does mean Chapter 3 - same numeral, two
// different meanings in this file.)
//
// Returns: string - just the "?a=1&b=2" tail (or "" when no params survive)
// export function buildQueryString(params: object) {
//   // (Ch9 Lesson 3 + 5)
//   //  - same omit-empty rule as buildUrl
//   //  - one "?" to open, "&" between each pair - URLSearchParams handles this
//   //  - return "" (not "?") when every param was dropped
//   const searchParams = new URLSearchParams();
//
//   Object.entries(params).forEach(([key, value]) => {
//     if (value !== "" && value !== null && value !== undefined) {
//       searchParams.append(key, value);
//     }
//   });
//
//   const queryString = searchParams.toString();
//
//   return queryString ? `?${queryString}` : "";
// }

// ---------- Lesson 1: take the url back apart, for the UI preview ----------

// Returns: { origin, segments, params } | null
export function describeUrl(href: string) {
  // TODO (Lesson 1):
  //  - parse with getUrl() from PART 1 above - it already returns URL | null
  //    and handles bad input. Do NOT write a second parser. Same file now,
  //    so no import needed.
  //  - return null when getUrl returns null
  //  - origin:   url.origin
  //  - segments: url.pathname split on "/", empty strings filtered out
  //  - params:   [...url.searchParams] mapped to { key, value }
  //
  //  Heads up 1: noUncheckedIndexedAccess makes segments[0] `string | undefined`.
  //  Prefer for...of / .map over index access.
  //
  //  Heads up 2: getUrl defaults to DEFAULT_PUBLIC_POLICY, which rejects
  //  localhost and raw IPs. Fine for dummyjson.com; if you ever preview a
  //  localhost URL you'll need to pass a looser policy.
  const url = getUrl(href);
  if (!url) return null;

  const origin = url.origin;
  const urlPath = url.pathname;
  const segments = urlPath.split("/").filter((s)=> s.length > 0);
  const params = [...url.searchParams].map(([key, value]) => ({ key, value }));

  return { origin, segments, params };
}
