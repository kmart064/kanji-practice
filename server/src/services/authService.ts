import pool from "../utils/db.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./tokenService.js";
import bcrypt from "bcrypt";

export async function loginUser(username: string, password: string) {
  const result = await pool.query(
    "SELECT id, username, password_hash FROM users WHERE username = $1",
    [username]
  );
  if (result.rowCount === 0) {
    throw new Error("Invalid credentials");
  }
  const user = result.rows[0];

  // Verify the provided password against the stored hash
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await pool.query(
    "INSERT INTO refresh_tokens (token, user_id, expires_at) VALUES ($1, $2, $3)",
    [refreshToken, user.id, expiresAt]
  );

  return { accessToken, refreshToken };
}

export async function refreshAccessToken(token: string) {
  try {
    const payload = verifyRefreshToken(token) as {
      id: string;
      username: string;
    };

    const dbToken = await pool.query(
      "SELECT * FROM refresh_tokens WHERE token=$1",
      [token]
    );
    if (dbToken.rowCount === 0) {
      throw new Error("Invalid refresh token");
    }

    const accessToken = generateAccessToken({
      id: payload.id,
      username: payload.username,
    });
    return accessToken;
  } catch {
    throw new Error("Token verification failed");
  }
}

export async function logoutUser(token: string) {
  await pool.query("DELETE FROM refresh_tokens WHERE token=$1", [token]);
}
