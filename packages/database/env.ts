import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().describe("The URL for the database connection"),
});

function createEnv(env: NodeJS.processEnv) {
  const safeParseResults = envSchema.safeParse(env);
  if (!safeParseResults.success) {
    throw new Error(
      `Invalid environment variables: ${safeParseResults.error.message}`,
    );
  }
  return safeParseResults.data;
}

export const env = createEnv(process.env);
