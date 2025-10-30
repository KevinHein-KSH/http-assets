# 🌐 URL Hostname Validation Policies

These options define how strictly hostnames (domain parts of URLs) are validated according to DNS and TLD rules.

---

## 1️⃣ requireTld

**Meaning:**  
The hostname must include a valid Top-Level Domain (TLD) such as `.com`, `.org`, `.net`, `.io`, etc.

**Purpose:**  
Ensures that the domain looks like a real, fully qualified domain name (FQDN), not just a local or incomplete one.

**Rules:**
- Must contain at least one dot (`.`)
- The part after the last dot must look like a TLD (letters only, 2–63 chars)
- Single-word hostnames like `localhost` or `youtube` are **not** allowed

**Examples:**
| Hostname | Valid? | Reason |
|-----------|--------|--------|
| youtube.com | ✅ | Has TLD |
| api.service.io | ✅ | Has TLD |
| youtube | ❌ | Missing TLD |
| localhost | ❌ | Local-only name |

---

## 2️⃣ allowSingleLabel

**Meaning:**  
Allows hostnames that consist of a single label (no dots). Examples include `localhost`, `intranet`, or custom dev hostnames.

**Purpose:**  
Useful for local development or internal networks where single-label hostnames are common.

**Relation to Other Rules:**
- It is the **opposite** of `requireTld`.  
- If `allowSingleLabel` is `true`, then `requireTld` should be `false` to avoid conflicts.

**Examples:**
| Hostname | Valid? | Reason |
|-----------|--------|--------|
| localhost | ✅ | Single label allowed |
| myserver | ✅ | Single label allowed |
| youtube.com | ✅ | Still valid; this rule doesn’t affect it |
| my_site | ❌ | Invalid characters (see enforceDnsLabels) |

**Common usage:**
- **Production:** `requireTld: true`, `allowSingleLabel: false`
- **Development:** `requireTld: false`, `allowSingleLabel: true`

---

## 3️⃣ enforceDnsLabels

**Meaning:**  
Each part (label) of the hostname must follow DNS RFC rules for characters and length.

**Purpose:**  
Ensures that every label (e.g. `www`, `youtube`, `com`) is syntactically valid under DNS standards.

**Rules:**
- Only letters (`a–z`), digits (`0–9`), and hyphens (`-`)
- Labels cannot start or end with a hyphen
- Each label: 1–63 characters
- Entire hostname: ≤ 253 characters
- Case-insensitive (normalized to lowercase)

**Examples:**
| Hostname | Valid? | Reason |
|-----------|--------|--------|
| youtube.com | ✅ | All labels valid |
| my-site.co.uk | ✅ | Hyphen used correctly |
| -youtube.com | ❌ | Leading hyphen |
| you_tube.com | ❌ | Underscore not allowed |
| a..b.com | ❌ | Empty label |

---

## 🔍 TLD Validation Helper

The `hasValidTld(hostname)` helper ensures that the top-level domain portion is syntactically valid.

**Rules checked:**
- Hostname has at least one dot (`.`)
- TLD length between 2–63 characters
- Accepts Punycode (`xn--...`) and ASCII alpha TLDs

**Examples:**
| Hostname | Valid? | Reason |
|-----------|--------|--------|
| example.com | ✅ | Normal ASCII TLD |
| example.io | ✅ | Short ASCII TLD |
| example.c | ❌ | Too short |
| example.123 | ❌ | TLD must be letters only |
| xn--e1afmkfd.xn--p1ai | ✅ | Punycode TLD |

---

## 💡 Summary

| Policy | Focus | Purpose / Effect |
|--------|--------|------------------|
| **requireTld** | Domain extension (.com, .org) | Ensure it’s a real internet domain |
| **allowSingleLabel** | Single label (no dots) | Allow local/internal hostnames like `api` |
| **enforceDnsLabels** | Label syntax & structure | Enforce RFC-compliant hostname rules |
