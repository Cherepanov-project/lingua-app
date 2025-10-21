import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import { TLesson } from "../../../types";

export const lessonsTable = sqliteTable("lessons_table", {
  id: text().primaryKey(),
  name: text().notNull(),
  exercises: text().notNull(),
});

export const lessonsSchema = z.object({
  id: z.string(),
  name: z.string(),
  exercises: z.string().transform((val) => JSON.parse(val) as string[]),
}) satisfies z.ZodType<TLesson>;
