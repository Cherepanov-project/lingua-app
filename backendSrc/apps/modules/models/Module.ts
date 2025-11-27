import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import { TModule } from "../../../types";

export const modulesTable = sqliteTable("modules_table", {
  id: text().primaryKey(),
  name: text().notNull(),
  lessons: text().notNull(),
  grammar: text().notNull(),
});

export const modulesSchema = z.object({
  id: z.string(),
  name: z.string(),
  lessons: z.string().transform((val) => JSON.parse(val) as string[]),
  grammar: z.string().transform((val) => JSON.parse(val) as string[]),
}) satisfies z.ZodType<TModule>;
