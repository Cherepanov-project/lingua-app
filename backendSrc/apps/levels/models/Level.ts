import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import { TLevel } from "../../../types";

export const levelsTable = sqliteTable("levels_table", {
  id: int().primaryKey({ autoIncrement: true }),
  label: text().notNull(),
});

export const levelsSchema = z.object({
  id: z.number(),
  label: z.string(),
}) satisfies z.ZodType<TLevel>;
