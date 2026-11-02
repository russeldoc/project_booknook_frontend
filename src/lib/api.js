import { API_URL } from "./constants";

// The Express API wants a JWT. BetterAuth hands one out for the logged-in user
// at /api/auth/token; keep it in memory for a while instead of asking every time.
let cached = { token: null, expires: 0 };

export function clearToken() {
  cached = { token: null, expires: 0 };
}

export async function getToken() {
  if (cached.token && Date.now() < cached.expires) return cached.token;

  const res = await fetch("/api/auth/token", { credentials: "include" });
  if (!res.ok) throw new Error("Please log in to continue.");
  const { token } = await res.json();

  cached = { token, expires: Date.now() + 30 * 60 * 1000 };
  return token;
}

export async function api(path, { method = "GET", body, auth = true } = {}) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const headers = {};
    if (body) headers["Content-Type"] = "application/json";
    if (auth) headers.Authorization = `Bearer ${await getToken()}`;

    let res;
    try {
      res = await fetch(`${API_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch {
      throw new Error("Can't reach the server. Check your connection and try again.");
    }

    // A stale token: fetch a fresh one and try once more.
    if (res.status === 401 && auth && attempt === 0) {
      clearToken();
      continue;
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const error = new Error(data.message || "Something went wrong. Please try again.");
      error.status = res.status;
      throw error;
    }
    return data;
  }
}
