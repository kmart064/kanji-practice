import pg, { Pool } from "pg";

pg.types.setTypeParser(1082, (value) => value);

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
