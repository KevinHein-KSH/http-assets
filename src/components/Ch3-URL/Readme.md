/**
 * 🌐 URL Hostname Validation Policies
 *
 * These options define how strictly hostnames (domain parts of URLs)
 * are validated according to DNS and TLD rules.
 *
 * ---
 *
 * 1️⃣ requireTld
 * ----------------
 * Meaning:
 *   The hostname must include a valid Top-Level Domain (TLD)
 *   such as `.com`, `.org`, `.net`, `.io`, etc.
 *
 * Purpose:
 *   Ensures that the domain looks like a real, fully qualified
 *   domain name (FQDN), not just a local or incomplete one.
 *
 * Rules:
 *   - Must contain at least one dot (`.`)
 *   - The part after the last dot must look like a TLD
 *     (letters only, 2–63 chars)
 *   - Single-word hostnames like `localhost` or `youtube` are NOT allowed
 *
 * Examples:
 *   ✅ youtube.com        → valid (has TLD)
 *   ✅ api.service.io     → valid (has TLD)
 *   ❌ youtube            → invalid (missing TLD)
 *   ❌ localhost          → invalid (local-only name)
 *
 * ---
 *
 * 2️⃣ allowSingleLabel
 * --------------------
 * Meaning:
 *   Allows hostnames that consist of a single label (no dots).
 *   Examples include `localhost`, `intranet`, or custom dev hostnames.
 *
 * Purpose:
 *   Useful for local development or internal networks where
 *   single-label hostnames are commonly used.
 *
 * Relation to other rules:
 *   - It is the *opposite* of `requireTld`.
 *   - If `allowSingleLabel` is true, then `requireTld` should be false
 *     to avoid validation conflicts.
 *
 * Examples:
 *   ✅ localhost          → valid (single label allowed)
 *   ✅ myserver           → valid (single label allowed)
 *   ❌ youtube.com        → still valid, but this rule doesn’t affect it
 *   ❌ my_site            → invalid (bad label syntax; see enforceDnsLabels)
 *
 * Common usage:
 *   - Production: `requireTld: true`, `allowSingleLabel: false`
 *   - Development: `requireTld: false`, `allowSingleLabel: true`
 *
 * ---
 *
 * 3️⃣ enforceDnsLabels
 * --------------------
 * Meaning:
 *   Each part (label) of the hostname must follow DNS RFC rules
 *   for characters and length.
 *
 * Purpose:
 *   Ensures that every label (e.g. `www`, `youtube`, `com`)
 *   is syntactically valid under DNS standards.
 *
 * Rules:
 *   - Only letters (a–z), digits (0–9), and hyphens (-)
 *   - Labels cannot start or end with a hyphen
 *   - Each label: 1–63 characters
 *   - Entire hostname: ≤ 253 characters
 *   - Case-insensitive (normalized to lowercase)
 *
 * Examples:
 *   ✅ youtube.com        → valid (all labels fine)
 *   ✅ my-site.co.uk      → valid (hyphen okay)
 *   ❌ -youtube.com       → invalid (leading hyphen)
 *   ❌ you_tube.com       → invalid (underscore not allowed)
 *   ❌ a..b.com           → invalid (empty label)
 *
 * ---
 *
 * 🧩 Combined Usage
 * -----------------
 * Typical configurations:
 *
 *   Production:
 *     requireTld: true
 *     allowSingleLabel: false
 *     enforceDnsLabels: true
 *
 *   Development / Localhost:
 *     requireTld: false
 *     allowSingleLabel: true
 *     enforceDnsLabels: true
 *
 * ---
 *
 * 💡 Summary
 * ----------
 * | Policy            | Focus                         | Purpose / Effect                          |
 * |--------------------|--------------------------------|-------------------------------------------|
 * | requireTld         | Domain extension (.com, .org) | Ensure it's a real internet domain        |
 * | allowSingleLabel   | Single label (no dots)        | Allow local/internal hostnames like `api` |
 * | enforceDnsLabels   | Label syntax & structure      | Enforce RFC-compliant hostname rules      |
 */

