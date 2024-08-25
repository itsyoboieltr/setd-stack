import { Elysia, t } from 'elysia';

const {
  models: { clientSchema },
} = new Elysia().model({
  clientSchema: t.Object({}),
});

const clientEnvResult = clientSchema.safeParse({});

if (!clientEnvResult.data) {
  const firstError = clientEnvResult.errors[0];
  if (firstError)
    throw new Error(
      `Invalid client environment variable ${firstError.path.slice(1)}: ${firstError.summary.replaceAll('  ', ' ')}`
    );
  else throw new Error(`Invalid client environment ${clientEnvResult.error}`);
}

export const clientEnv = clientEnvResult.data;
