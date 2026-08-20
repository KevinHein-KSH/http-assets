  // Accepts either a JSON string or a JS value, and returns a object/array/etc
export function toJson(input: string | unknown): unknown {
  if (typeof input === "string") {
    return JSON.parse(input); // may throw → caller handles try/catch
  }
  return input;
}

// Accepts either an object/array/etc and returns a pretty JSON string
// Throws if input is an invalid JSON string
export function toJsonString(input: string | unknown): string {
  const value =
    typeof input === "string" ? JSON.parse(input) : input;
  return JSON.stringify(value, null, 2);
}

export function isValidJsonObject(input: string): boolean {
  // 1. Must start/end with braces
  if (!input.trim().startsWith("{") || !input.trim().endsWith("}")) {
    return false;
  }

  try {
    const parsed = JSON.parse(input);

    // 2. Must be a real object (not a string)
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed);
  } catch {
    return false;
  }
}

export function dedupeByEmail<T extends { email: string }>(array: T[]): T[] {
  return [...new Map(array.map((u) => [u.email, u])).values()];
}