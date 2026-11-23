import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: './src/lib/db/schema.ts',
  out: './src/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/jajan_yuk',
  },
} satisfies Config;
