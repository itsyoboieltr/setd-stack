import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { serverEnv } from '@/lib/env/server';
import * as schema from '@/server/schema';

export const db = drizzlePostgres(postgres(serverEnv.DATABASE_URL), {
  schema,
  logger: process.env.NODE_ENV === 'development',
});
