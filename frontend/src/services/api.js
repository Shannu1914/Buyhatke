const API = import.meta.env.VITE_API_URL;

export const api = async (
  path,
  { method = "GET", body, auth = false } = {}
) => {
  const headers = body ? { "Content-Type": "application/json" } : {};

  // 🔑 If `auth` is true, try to attach JWT token from localStorage
  if (auth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include", // ✅ keeps cookies for session auth
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }

  return res.json();
};
