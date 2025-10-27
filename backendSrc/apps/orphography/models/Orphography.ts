import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import type { TOrphography } from "../../../types";

export const orphographiesTable = sqliteTable("orphography_table", {
  id: int().primaryKey({ autoIncrement: true }),
  word: text().notNull(),
  image: text().notNull(),
  description: text().notNull(),
});

export const orphographiesSchema = z.object({
  id: z.number(),
  word: z.string(),
  image: z.string(),
  description: z.string(),
}) satisfies z.ZodType<TOrphography>;
