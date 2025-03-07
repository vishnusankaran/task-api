// Make sure to install the 'pg' package
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

import * as dbSchema from '../schema/index.ts';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_DATABASE_URL,
});
export const db = drizzle({ client: pool, schema: dbSchema });

// Create Table the first time the app is run
function initializeDatabase() {
  db.execute(sql`
      CREATE TABLE IF NOT EXISTS task (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT,
        user JSONB,
      )
    `);
}

initializeDatabase();
