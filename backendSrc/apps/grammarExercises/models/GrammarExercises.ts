import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import type { TGrammarExercise } from "../../../types"; 

export const grammarExercisesTable = sqliteTable("grammar_exercises", {
  id: int().primaryKey({ autoIncrement: true }),
  grammar_id: int().notNull(), 
  level: text().notNull(),
  sentence: text().notNull(), 
  missing_words: text().notNull(), 
});

export const grammarExercisesSchema = z.object({
  id: z.number(),
  grammar_id: z.number(),
  level: z.string(),
  sentence: z.string(),
  missing_words: z.array(z.string()), 
}) satisfies z.ZodType<TGrammarExercise>;
