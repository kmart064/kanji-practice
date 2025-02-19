import express from 'express';
import * as dotenv from 'dotenv';
import { initializeDB } from './utils/database.js';

// Create an instance of Express
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Load environment-specific configuration
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

console.log('API URL:', process.env.API_URL);

// Get the DB_PATH from environment variables
const dbPath = process.env.DB_PATH;

if (dbPath) {
  await initializeDB(dbPath);
}
else process.exit("DB_PATH not specified.");

export default app;