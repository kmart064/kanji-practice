import { createLogger, format, transports } from "winston";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config();

const logFilePath = process.env.LOG_FILE_PATH || path.join(process.cwd(), "logs/error.log");

const logger = createLogger({
  level: "error",
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: logFilePath }),
  ],
});

export default logger;