import type { z } from "zod";

import { int, real, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { user } from "./auth";

export const location = sqliteTable("location", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  lat: real().notNull(),
  long: real().notNull(),
  userId: int().notNull().references(() => user.id),
  createdAt: int({ mode: "timestamp" }).notNull().$default(() => new Date()),
  updatedAt: int({ mode: "timestamp" }).notNull().$default(() => new Date()).$onUpdate(() => new Date()),
}, t => [
  unique().on(t.userId, t.name),
]);

export const InsertLocation = createInsertSchema(location, {
  name: field => field.min(1).max(100),
  description: field => field.max(100),
  lat: field => field.min(-90).max(90),
  long: field => field.min(-180).max(180),
}).omit({
  id: true,
  slug: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const SelectLocation = createSelectSchema(location);

export type SELECT_LOCATION = z.infer<typeof SelectLocation>;
export type INSERT_LOCATION = z.infer<typeof InsertLocation>;
