import { eq } from "drizzle-orm";
import { customAlphabet } from "nanoid/non-secure";
import slugify from "slug";

import db from "~/lib/db";
import { InsertLocation, location } from "~/lib/db/schema";

const nanoid = customAlphabet("1234567890abcdef", 5);

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }

  const result = await readValidatedBody(event, InsertLocation.safeParse);

  if (!result.success) {
    const statusMessage = result.error.issues.map(
      issue => `${issue.path.join()}: ${issue.message}`,
    ).join("; ");

    const data = result.error.issues.reduce((errors, issue) => {
      errors[issue.path.join()] = issue.message;
      return errors;
    }, {} as Record<string, string>);

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  let slug = slugify(result.data.name);
  let existsLocation = await db.query.location.findFirst({
    where: eq(location.slug, slug),
  });

  while (existsLocation) {
    const id = nanoid();
    const uniqueSlug = `${slug}-${id}`;

    existsLocation = await db.query.location.findFirst({
      where: eq(location.slug, uniqueSlug),
    });

    if (!existsLocation) {
      slug = uniqueSlug;
    }
  }

  try {
    const created = await db.insert(location).values({
      ...result.data,
      slug,
      userId: event.context.user.id,
    }).returning().get();

    return created;
  }
  catch {
    return sendError(event, createError({
      statusCode: 422,
      statusMessage: "You have already registered this location in the database.",
    }));
  }
});
