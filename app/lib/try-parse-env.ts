/* eslint-disable node/no-process-env */
import type { ZodObject, ZodRawShape } from "zod";

export default function tryParseEnv<T extends ZodRawShape>(
  EnvSchema: ZodObject<T>,
  buildEnv: Record<string, string | undefined> = process.env,
) {
  const result = EnvSchema.safeParse(buildEnv);

  if (!result.success) {
    const missingKeys = result.error.issues.map(issue => issue.path.join("."));
    const message = `Missing or invalid values in .env:\n${missingKeys.map(key => `- ${key}`).join("\n")}`;

    const error = new Error(message);
    error.stack = "";
    throw error;
  }
}
