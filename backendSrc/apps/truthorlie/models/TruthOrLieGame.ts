import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import type { TTruthOrLieGame } from "../../../types";

export const truthorlieGamesTable = sqliteTable("truthorlie_table", {
  id: int().primaryKey({ autoIncrement: true }),
  level: int().notNull().default(1),
  statements: text().notNull(),
});

export const truthorlieGamesSchema = z.object({
  id: z.number(),
  level: z.number(),
  statements: z
    .string()
    .transform(
      (val) => JSON.parse(val) as { statement: string; correctValue: string }[]
    ),
}) satisfies z.ZodType<TTruthOrLieGame>;
