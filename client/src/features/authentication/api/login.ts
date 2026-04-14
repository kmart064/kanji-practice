import { apiFetch } from "@/shared/api";

export async function login(username: string, password: string) {
  const data = await apiFetch(
    "/api/auth/login",
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ username, password }),
    },
    false
  );

  localStorage.setItem("accessToken", data.accessToken);
}
