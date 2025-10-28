import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { z } from 'zod';

export const orthographyExercise = sqliteTable('orthography_exercise', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  word: text('word').notNull(),
  image_url: text('image_url').notNull(),
  description: text('description').notNull(),
  created_at: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const orthographyExerciseSchema = z.object({
  id: z.number(),
  word: z.string(),
  imageUrl: z.string(),
  description: z.string(),
});
