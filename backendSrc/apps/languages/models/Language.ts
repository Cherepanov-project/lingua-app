import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import { TLanguage } from "../../../types";

export const languagesTable = sqliteTable("languages_table", {
  label: text().notNull(),
  code: text().notNull(),
  emoji: text().notNull(),
});

export const languagesSchema = z.object({
  label: z.string(),
  code: z.string(),
  emoji: z.string(),
}) satisfies z.ZodType<TLanguage>;
