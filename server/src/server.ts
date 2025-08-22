import "./preload.js";

import app from "./app.js";
import authRoutes from "./routes/authRoutes.js";
import deckManagerRouter from "./routes/deckManagerRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import path from "path";
import express from "express";

const port = Number(process.env.PORT) || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://kanji-practice-omega.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Also add explicit OPTIONS handler to respond to preflight for all routes
app.options("*", cors());

app.use("/api/auth", authRoutes);
app.use("/api", deckManagerRouter);
app.use("/review", reviewRouter);

// Serve static files from React build
app.use(express.static(path.join(__dirname, "build"))); // or "dist" if that’s your folder

// Catch-all for frontend routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Global error middleware should be the last middleware
app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on port ${port}`);
});
