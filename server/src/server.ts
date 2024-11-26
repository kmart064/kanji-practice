import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { body, validationResult } from 'express-validator';
import path from 'path';
//import { Database } from 'sqlite3';

interface KanjiRow {
  kanji: string;
}

// Create an instance of Express
const app = express();
const port = 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Load environment-specific configuration
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

console.log('API URL:', process.env.API_URL);

// Get the DB_PATH from environment variables
const dbPath = process.env.DB_PATH || path.resolve(__dirname, 'kanji-database.db');

// Open the SQLite database (or create it if it doesn’t exist)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }

  // Create the words table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kanji TEXT NOT NULL UNIQUE,
      interval INTEGER DEFAULT 1,
      review_date DATE
    )`,
    (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table kanji_entries is ready.');
      }
    }
  );
});

// Route to get data from the SQLite database
app.get('/api/words', (req: Request, res: Response) => {
  const sql = 'SELECT * FROM words';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})

const isStringArray = (value: unknown): boolean => {
  return Array.isArray(value) && value.every((k) => typeof k === 'string');
};

// Route to add a kanji word to the SQLite database
app.post('/api/add',
[
  body('kanji')
      .isArray()
      .withMessage('Kanji must be an array')
      .custom(isStringArray)
      .withMessage('Each Kanji must be a string'),
], (req: Request, res: Response) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { kanji } = req.body as { kanji: string[] };;

  // Check for existing Kanji
  const placeholders = kanji.map(() => '?').join(', ');
  const selectSql = `SELECT kanji FROM words WHERE kanji IN (${placeholders})`;

  db.all(selectSql, kanji, (err, rows: KanjiRow[]) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
      return;
    }

    const existingKanji = rows.map((row) => row.kanji); // Kanji already in the database
    const newKanji = kanji.filter((k) => !existingKanji.includes(k)); // Kanji to be added

    if (newKanji.length > 0) {
      // Insert new Kanji into the database
      const insertSql = `INSERT INTO words (kanji) VALUES ${newKanji.map(() => '(?)').join(', ')}`;
      db.run(insertSql, newKanji, function (insertErr) {
        if (insertErr) {
          res.status(500).json({ error: 'Failed to add Kanji to the database' });
          return;
        }
      });
    }

    if (existingKanji.length === 0) {
      res.status(200).json({
        message: 'Kanji added successfully',
        addedKanji: newKanji,
      });
    }
    else {
      res.status(201).json({
        message: 'Some or all kanji have already been added',
        addedKanji: newKanji,
        duplicateKanji: existingKanji,
      });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});