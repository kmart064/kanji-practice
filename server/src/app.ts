import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { getDB, initializeDB } from "./utils/database.js";
import { syncSrsScheduleFromEnv } from "./utils/srsSchedule.js";

// Create an instance of Express
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin); // Allow all origins dynamically
    },
    credentials: true,
  })
);

// Load environment-specific configuration
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

console.log("API URL:", process.env.API_URL);

// Get the DB_PATH from environment variables
const dbPath = process.env.DB_PATH;

if (dbPath) {
  await initializeDB(dbPath);
  await syncSrsScheduleFromEnv(getDB()); // sync the srs schedule from settings
} else process.exit("DB_PATH not specified.");

export default app;
