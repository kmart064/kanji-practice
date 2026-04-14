const LOCAL = import.meta.env.VITE_LOCAL_MODE === "true" ? true : false;
const HOST = import.meta.env.VITE_HOST || "localhost";

export async function apiFetch(
  path: string,
  options: RequestInit = {},
  retry = true
) {
  let url = `http://${HOST}:3001${path}`;
  if (!LOCAL) url = `https://${HOST}${path}`;

  let accessToken = localStorage.getItem("accessToken");

  const baseHeaders: Record<string, string> = {
    "Content-Type": "application/json",
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
    credentials: "include",
  });

  // Retry once after refreshing the access token.
  if ((response.status === 401 || response.status === 403) && retry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
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
    const response = await apiFetch(
      "/api/auth/refresh",
      { method: "POST", credentials: "include" },
      false
    );

    if (!response || !response.accessToken) {
      handleAuthFailure();
      return false;
    }

    localStorage.setItem("accessToken", response.accessToken);
    return true;
  } catch {
    handleAuthFailure();
    return false;
  }
}

function handleAuthFailure() {
  localStorage.removeItem("accessToken");
  fetch("/api/auth/logout", { method: "POST", credentials: "include" }).catch(
    () => {}
  );
  window.location.href = "/api/auth/login";
}
