import pool from "./utils/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import express from "express";
import { syncSrsScheduleFromEnv } from "./utils/srsSchedule.js";

// Create an instance of Express
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
console.log("API URL:", process.env.API_URL);

await syncSrsScheduleFromEnv(); // sync the srs schedule from settings

export default app;
