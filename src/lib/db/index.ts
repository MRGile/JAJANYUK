import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

// Singleton connection pool untuk Next.js (hindari multiple pools saat hot reload)
const globalForDb = globalThis as unknown as { dbPool: mysql.Pool | undefined };

function createPool() {
  return mysql.createPool({
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: Number(process.env.DATABASE_PORT ?? 3306),
    user: process.env.DATABASE_USER ?? 'root',
    password: process.env.DATABASE_PASSWORD ?? '',
    database: process.env.DATABASE_NAME ?? 'jajan_yuk',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

if (!globalForDb.dbPool) {
  globalForDb.dbPool = createPool();
}

export const pool = globalForDb.dbPool;
export const db = drizzle(pool, { schema, mode: 'default' });
export type DB = typeof db;
