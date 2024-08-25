import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '@/lib/utils';
import * as schema from '@/server/schema';

export const db = drizzlePostgres(postgres(env.server!.DATABASE_URL), {
  schema,
  logger: process.env.NODE_ENV === 'development',
});
