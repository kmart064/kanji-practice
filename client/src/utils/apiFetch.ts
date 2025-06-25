const API_BASE_URL = process.env.REACT_APP_API_URL || "";
const API_USER = process.env.REACT_APP_API_USER || "";
const API_PASS = process.env.REACT_APP_API_PASS || "";

const authHeader = "Basic " + btoa(`${API_USER}:${API_PASS}`);

/**
 * A wrapper for fetch that automatically includes basic auth and base URL
 * @param path The endpoint path
 * @param options Optional fetch options
 */
export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${path}`;

  const baseHeaders = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  };

  // Ensure headers are valid objects before merging
  const mergedHeaders =
    typeof options.headers === "object" && options.headers !== null
      ? { ...baseHeaders, ...options.headers }
      : baseHeaders;

  try {
    const response = await fetch(url, {
      ...options,
      headers: mergedHeaders,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API Error ${response.status}: ${text}`);
    }

    return response.json();
  } catch (err) {
    console.error(`Fetch failed for ${url}`, err);
    throw new Error(`Failed to fetch from ${url}: ${err}`);
  }
}
