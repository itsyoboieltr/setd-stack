import { Elysia, t } from 'elysia';

const {
  models: { serverSchema },
} = new Elysia().model({
  serverSchema: t.Object({
    DATABASE_URL: t.String({ minLength: 1 }),
  }),
});

const serverResult = serverSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL as string,
});

if (!serverResult.data && typeof window === 'undefined') {
  const firstError = serverResult.errors[0];
  if (firstError)
    throw new Error(
      `Invalid server environment variable ${firstError.path.slice(1)}: ${firstError.summary.replaceAll('  ', ' ')}`
    );
  else throw new Error(`Invalid server environment ${serverResult.error}`);
}

export const server = serverResult.data;
