
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Singleton connection pool untuk Next.js
const globalForDb = globalThis as unknown as {
  dbPool: Pool | undefined;
};

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      'DATABASE_URL belum dikonfigurasi. Periksa file .env.local.'
    );
  }

  return new Pool({
    connectionString,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });
}

if (!globalForDb.dbPool) {
  globalForDb.dbPool = createPool();
}

export const pool = globalForDb.dbPool;
export const db = drizzle(pool, { schema });
export type DB = typeof db;
