import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import { TLesson } from "../../../types";

export const lessonsTable = sqliteTable("lessons_table", {
  id: text().primaryKey(),
  name: text().notNull(),

  exercises: text().notNull(),
  listening: text().notNull(),
  grammar_exercises: text().notNull(),
  orthography: text().notNull(),
  newWords: text().notNull(),
  reading: text().notNull(),
});
export const lessonsSchema = z.object({
  id: z.string(),
  name: z.string(),
  exercises: z.string().transform((v) => JSON.parse(v) as string[]),

  listening: z.string().transform((v) => JSON.parse(v) as string[]),
  grammar_exercises: z.string().transform((v) => JSON.parse(v) as string[]),
  orthography: z.string().transform((v) => JSON.parse(v) as string[]),
  newWords: z.string().transform((v) => JSON.parse(v) as string[]),
  reading: z.string().transform((v) => JSON.parse(v) as string[]),
}) satisfies z.ZodType<TLesson>;
