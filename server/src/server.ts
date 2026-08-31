import "./preload.js";

import app from "./app.js";
import authRoutes from "./routes/authRoutes.js";
import deckManagerRouter from "./routes/deckManagerRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors, { CorsOptions, CorsOptionsDelegate } from "cors";
import statsRoutes from "./routes/statsRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = Number(process.env.PORT) || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://kanji-practice-omega.vercel.app",
];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Use CORS for all routes
app.use(cors(corsOptions));

// Explicitly handle preflight with the same options
app.options("*", cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api", deckManagerRouter);
app.use("/review", reviewRouter);
app.use("/api/stats", statsRoutes);

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
