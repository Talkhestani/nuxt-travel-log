import { findLocations } from "~/lib/db/queries/location";
import defineAuthenticateEventHandler from "~/utils/define-authenticate-event-handler";

export default defineAuthenticateEventHandler(async (event) => {
  return await findLocations(event.context.user.id);
});
