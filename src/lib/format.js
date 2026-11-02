export function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Only allow same-site paths after login (blocks open redirects).
export function safeRedirect(value) {
  if (value && value.startsWith("/") && !value.startsWith("//")) return value;
  return "/";
}

export function validatePassword(password) {
  if (password.length < 6) return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must include a lowercase letter.";
  return "";
}
