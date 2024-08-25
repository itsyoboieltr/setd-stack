import { Elysia, t } from 'elysia';

const {
  models: { serverSchema },
} = new Elysia().model({
  serverSchema: t.Object({
    DATABASE_URL: t.String({ minLength: 1 }),
  }),
});

const serverEnvResult = serverSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL ?? 'memory://dbest',
});

if (!serverEnvResult.data) {
  const firstError = serverEnvResult.errors[0];
  if (firstError)
    throw new Error(
      `Invalid server environment variable ${firstError.path.slice(1)}: ${firstError.summary.replaceAll('  ', ' ')}`
    );
  else throw new Error(`Invalid server environment ${serverEnvResult.error}`);
}

export const serverEnv = serverEnvResult.data;
