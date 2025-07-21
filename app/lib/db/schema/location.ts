import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const location = sqliteTable("location", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  lat: real().notNull(),
  long: real().notNull(),
  createdAt: int({ mode: "timestamp" }).notNull().$default(() => new Date()),
  updatedAt: int({ mode: "timestamp" }).notNull().$default(() => new Date()).$onUpdate(() => new Date()),
});
