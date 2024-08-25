import { Elysia, t } from 'elysia';

const {
  models: { clientSchema },
} = new Elysia().model({
  clientSchema: t.Object({}),
});

const clientResult = clientSchema.safeParse({});

if (!clientResult.data) {
  const firstError = clientResult.errors[0];
  if (firstError)
    throw new Error(
      `Invalid client environment variable ${firstError.path.slice(1)}: ${firstError.summary.replaceAll('  ', ' ')}`
    );
  else throw new Error(`Invalid client environment ${clientResult.error}`);
}

export const client = clientResult.data;
