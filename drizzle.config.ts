import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL belum dikonfigurasi. Periksa file .env.local atau .env.');
}

export default {
  schema: './src/lib/db/schema.ts',
  out: './src/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
} satisfies Config;
