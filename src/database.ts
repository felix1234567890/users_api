import { Pool } from 'pg';
import { config } from 'dotenv';
config();
export const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
});
