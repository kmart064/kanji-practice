import { apiFetch } from "../../../utils/apiFetch";

export async function login(username: string, password: string) {
  const data = await apiFetch(
    "/api/login",
    {
      method: "POST",
      credentials: "include", // needed to set the HttpOnly refresh cookie
      body: JSON.stringify({ username, password }),
    },
    false
  );

  localStorage.setItem("accessToken", data.accessToken);
}
