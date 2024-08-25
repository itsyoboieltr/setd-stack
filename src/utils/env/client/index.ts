import { Elysia, t } from 'elysia';

const {
  models: { clientSchema },
} = new Elysia().model({
  clientSchema: t.Object({
    HOST_URL: t.String({ minLength: 1 }),
  }),
});

const clientEnvResult = clientSchema.safeParse({
  HOST_URL: import.meta.env.VITE_HOST_URL ?? 'http://localhost:3000',
});

if (!clientEnvResult.data) {
  const firstError = clientEnvResult.errors[0];
  if (firstError)
    throw new Error(
      `Invalid client environment variable ${firstError.path.slice(1)}: ${firstError.summary.replaceAll('  ', ' ')}`
    );
  else throw new Error(`Invalid client environment ${clientEnvResult.error}`);
}

export const clientEnv = clientEnvResult.data;
