import { eq } from "drizzle-orm";
import { customAlphabet } from "nanoid/non-secure";
import slugify from "slug";

import type { LOCATION } from "~/lib/db/schema";

import db from "~/lib/db";
import { location } from "~/lib/db/schema";

const nanoid = customAlphabet("1234567890abcdef", 5);

export async function findLocationBySlug(slug: string): Promise<LOCATION | undefined> {
  return await db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
}

export async function findUniqueSlugLocation(name: string) {
  let slug = slugify(name);
  let existsLocation = await findLocationBySlug(slug);

  while (existsLocation) {
    const id = nanoid();
    const uniqueSlug = `${slug}-${id}`;

    existsLocation = await findLocationBySlug(uniqueSlug);

    if (!existsLocation) {
      slug = uniqueSlug;
    }
  }
  return slug;
}

export async function createLocation(validatedData: { data: LOCATION }, slug: string, userId: number) {
  return await db.insert(location).values({
    ...validatedData.data,
    slug,
    userId,
  }).returning().get();
}
