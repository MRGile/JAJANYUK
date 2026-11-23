import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Singleton connection pool untuk Next.js (hindari multiple pools saat hot reload)
const globalForDb = globalThis as unknown as { dbPool: Pool | undefined };

function createPool() {
  return new Pool({ connectionString: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/jajan_yuk' });
}

if (!globalForDb.dbPool) {
  globalForDb.dbPool = createPool();
}

export const pool = globalForDb.dbPool;
export const db = drizzle(pool, { schema });
export type DB = typeof db;
