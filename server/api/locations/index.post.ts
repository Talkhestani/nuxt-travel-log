import { createLocation, findUniqueSlugLocation } from "~/lib/db/queries/location";
import { InsertLocation } from "~/lib/db/schema";
import defineAuthenticateEventHandler from "~/utils/define-authenticate-event-handler";

export default defineAuthenticateEventHandler(async (event) => {
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
  const slug = await findUniqueSlugLocation(result.data.name);

  try {
    const created = await createLocation(result, slug, event.context.user.id);
    return created;
  }
  catch {
    return sendError(event, createError({
      statusCode: 422,
      statusMessage: "You have already registered this location in the database.",
    }));
  }
});
