const API = import.meta.env.VITE_API_URL;

export const api = async (path, { method = "GET", body } = {}) => {
  const headers = body ? { "Content-Type": "application/json" } : {};

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include", // sends cookie automatically
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }

  return res.json();
};
