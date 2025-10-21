import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import type { TMatchGame } from "../../../types";

export const matchgamesTable = sqliteTable("matchgames_table", {
  id: int().primaryKey({ autoIncrement: true }),
  level: int().notNull().default(1),
  pairs: text().notNull(),
});

export const matchgamesSchema = z.object({
  id: z.number(),
  level: z.number(),
  pairs: z
    .string()
    .transform((val) => JSON.parse(val) as { left: string; right: string }[]),
}) satisfies z.ZodType<TMatchGame>;
