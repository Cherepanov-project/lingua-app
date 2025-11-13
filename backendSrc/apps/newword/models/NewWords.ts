import { sqliteTable, int, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'
import { TopicWithWords } from '../../../types'

export const topicsTable = sqliteTable('topics', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
})

export const wordsTable = sqliteTable('words', {
  id: int().primaryKey({ autoIncrement: true }),
  topic_id: int().notNull().default(1),
  ru: text().notNull(),
  en: text().notNull(),
})

export const newWordsSchema = z.object({
  id: z.number(),
  title: z.string(),
  words: z.array(
    z.object({
      id: z.number(),
      topic_id: z.number(),
      ru: z.string(),
      en: z.string(),
    }),
  ),
}) satisfies z.ZodType<TopicWithWords>
