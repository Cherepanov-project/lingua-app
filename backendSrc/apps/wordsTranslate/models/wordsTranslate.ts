import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import type { TWordsTranslate } from "../../../types"; 

export const wordsTranslateTable = sqliteTable("words_translate", {
  id: int().primaryKey({ autoIncrement: true }),
  level: text().notNull(),
  words_ru: text().notNull(), 
  words_en: text().notNull(), 
});

export const wordsTranslateSchema = z.object({
  id: z.number(),
  level: z.string(),
  words_ru: z.array(z.string()), 
  words_en: z.array(z.string()),
}) satisfies z.ZodType<TWordsTranslate>;