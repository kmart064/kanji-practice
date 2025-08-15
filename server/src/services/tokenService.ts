import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export function generateAccessToken(user: { id: string; username: string }) {
  return jwt.sign(user, ACCESS_SECRET, { expiresIn: "1d" });
}

export function generateRefreshToken(user: { id: string; username: string }) {
  return jwt.sign(user, REFRESH_SECRET, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET);
}
