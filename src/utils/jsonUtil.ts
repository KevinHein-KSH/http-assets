  // Accepts either a JSON string or a JS value, and returns a object/array/etc
export function toJson(input: string | unknown): unknown {
  if (typeof input === "string") {
    return JSON.parse(input); // may throw → caller handles try/catch
  }
  return input;
}

// Accepts either an object/array/etc and returns a pretty JSON string
export function toString(input: string | unknown): string {
  const value =
    typeof input === "string" ? JSON.parse(input) : input;
  return JSON.stringify(value, null, 2);
}