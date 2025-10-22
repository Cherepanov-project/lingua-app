import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import { TCourse } from "../../../types";

export const coursesTable = sqliteTable("courses_table", {
  id: int().primaryKey({ autoIncrement: true }),
  language: text().notNull(),
  level: text().notNull(),
  description: text().notNull(),
  amountTime: int().notNull(),
  modules: text().notNull(),
  published: int({ mode: "boolean" }).notNull().default(false),
});

export const coursesSchema = z.object({
  id: z.number(),
  language: z.string(),
  level: z.string(),
  description: z.string(),
  amountTime: z.number(),
  modules: z.string().transform((val) => JSON.parse(val) as string[]),
  published: z.boolean(),
}) satisfies z.ZodType<TCourse>;
