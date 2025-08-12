const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const LOCAL = import.meta.env.VITE_LOCAL_MODE === "true" ? true : false;
const HOST = import.meta.env.VITE_HOST || "localhost";

export async function apiFetch(
  path: string,
  options: RequestInit = {},
  retry = true
) {
  let url = `https://${HOST}${path}`;
  if (!LOCAL) url = `${API_BASE_URL}${path}`;

  // Read access token from localStorage
  let accessToken = localStorage.getItem("accessToken");

  const baseHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  };

  if (accessToken) {
    baseHeaders.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...baseHeaders,
      ...(options.headers || {}),
    },
    credentials: "include", // needed for refresh token cookies
  });

  // If unauthorized and retry allowed → try refresh
  if (response.status === 401 && retry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Try again with new token
      return apiFetch(path, options, false);
    }
  }

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

async function refreshAccessToken(): Promise<boolean> {
  try {
    const response = await fetch("/api/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    return true;
  } catch {
    return false;
  }
}
