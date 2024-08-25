import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { drizzle as drizzlePGLite } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite';
import { serverEnv } from '../../utils/env/server';
import * as schema from './schema';
import { DrizzleConfig, sql } from 'drizzle-orm';

const isPostgres = serverEnv.DATABASE_URL.startsWith('postgresql://');

const options: DrizzleConfig<typeof schema> = {
  schema,
  logger: import.meta.env.DEV,
};

export const db = isPostgres
  ? drizzlePostgres(postgres(serverEnv.DATABASE_URL), options)
  : drizzlePGLite(new PGlite(serverEnv.DATABASE_URL), options);

await db.execute(
  sql`CREATE TABLE IF NOT EXISTS todo (id TEXT PRIMARY KEY, data TEXT NOT NULL);`
);
