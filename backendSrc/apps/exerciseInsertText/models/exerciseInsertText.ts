import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import type { TExerciseInsertText } from "../../../types"; 

export const exerciseInsertTextTable = sqliteTable("insert_text", {
  id: int().primaryKey({ autoIncrement: true }),
  level: text().notNull(),
  sentence: text().notNull(), 
  missing_words: text().notNull(), 
});

export const exerciseInsertTextSchema = z.object({
  id: z.number(),
  level: z.string(),
  sentence: z.string(),
  missing_words: z.array(z.string()), 
}) satisfies z.ZodType<TExerciseInsertText>;