import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import type { TPicture } from "../../../types";

export const picturesTable = sqliteTable("pictures_table", {
  id: int().primaryKey({ autoIncrement: true }),
  img: text().notNull(),
  title: text().notNull(),
  tag: text().notNull(),
});

export const picturesSchema = z.object({
  id: z.number(),
  img: z.string(),
  title: z.string(),
  tag: z.string(),
}) satisfies z.ZodType<TPicture>;
