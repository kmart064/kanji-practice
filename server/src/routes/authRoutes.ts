import express from "express";
import {
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "../services/authService.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const { accessToken, refreshToken } = await loginUser(username, password);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ accessToken });
  } catch (err) {
    res.status(401).json({ message: getErrorMessage(err) });
  }
});

router.post("/refresh", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "Refresh token missing" });

  try {
    const accessToken = await refreshAccessToken(token);
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: getErrorMessage(err) });
  }
});

router.post("/logout", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    await logoutUser(token);
  }
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.sendStatus(204);
});

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

export default router;
