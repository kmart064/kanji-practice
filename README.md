# KaizenKanji

## What is KaizenKanji?

KaizenKanji is a Japanese kanji learning application designed to provide a more varied approach to kanji study than traditional flashcards.

Instead of relying on a fixed set of example sentences, KaizenKanji uses AI to dynamically generate sentences containing the target kanji. This allows learners to encounter kanji in a variety of contexts while testing their ability to read, understand, and distinguish different meanings and usages.

The application uses a Spaced Repetition System (SRS) to schedule reviews based on the user's performance and provides statistics to help track learning progress and identify areas that may require additional practice.

### Kanji Review

The primary review mode uses AI-generated sentences to test the user's understanding of individual kanji.

<img width="753" height="520" alt="image" src="https://github.com/user-attachments/assets/bf32d81f-a619-4785-8529-631b9959cdb0" />

### Grammar Review

A grammar review mode has also been added to study Japanese grammar structures using a similar approach. AI-generated sentences are presented as fill-in-the-blank questions with multiple-choice answers.

<img width="756" height="745" alt="image" src="https://github.com/user-attachments/assets/0a66407b-8950-47b2-ab48-342a20f1312f" />

## Key Features

* **Kanji review system** — Flashcard-style kanji review using AI-generated sentences from multiple AI providers, including OpenAI and Groq.
* **Kanji database** — PostgreSQL database hosted on Supabase for managing kanji, review history, SRS settings, study sessions, user credentials, access tokens, and other application data.
* **Grammar review system** — Multiple-choice grammar exercises using dynamically generated fill-in-the-blank questions.
* **Statistics** — Tracks performance metrics such as accuracy, difficult kanji, and the relationship between review pacing and accuracy.
* **Watch list** — Identifies kanji that may require additional attention based on performance metrics such as error frequency, time between mistakes, and accuracy patterns. *(Work in progress)*

## Tech Stack

* **React / TypeScript** — Frontend
* **Express / Node.js** — Backend API
* **PostgreSQL** — Database
* **Google Cloud Compute Engine** — Backend hosting
* **Supabase** — PostgreSQL hosting
* **Vercel** — Frontend hosting
* **nginx** — Reverse proxy and SSL termination
* **Docker** — Backend containerization and deployment

## Architecture

```text
React SPA (Vercel)
        ↓
nginx (reverse proxy / SSL)
        ↓
Express API (GCE / Docker)
        ↓
PostgreSQL (Supabase)
```

## Live Demo

A demo of the kanji reading mode, grammar mode, and sample statistics is available at [kaizenkanji.com](https://kaizenkanji.com).

## Development / Setup

### Prerequisites

* Node.js 20+ and npm
* A PostgreSQL-compatible database (Supabase Postgres recommended)
* A database connection string configured as `SUPABASE_DB_URL`
* A Groq and/or OpenAI API key for AI-generated sentence requests
* Authentication environment variables, if authentication is enabled:

  * `ACCESS_SECRET`
  * `REFRESH_SECRET`
* Client environment variables for the API connection (see `env.example`)

### Setup

1. Clone the repository.
2. Install dependencies in the `client` and `server` directories.
3. Configure the required environment variables using `env.example`.
4. Start the development server:

```bash
cd server
npm run start:dev
```

Start the client separately according to the instructions in the `client` directory.

In a separate terminal:

```bash
cd client
npm run dev
```
