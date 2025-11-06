import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { z } from "zod";

export const grammarTable = sqliteTable("grammar_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  slug: text().notNull(),
  text: text().notNull(),
});

export const grammarSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  text: z.string(),
});

export type TGrammar = z.infer<typeof grammarSchema>;
