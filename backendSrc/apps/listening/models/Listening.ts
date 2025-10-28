import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { z } from "zod";

export const listeningExercisesTable = sqliteTable("listening_exercises", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  level: text("level").notNull(),
  image_url: text("image_url").notNull(),
  audio_url: text("audio_url").notNull(),
  questions: text("questions").notNull(),
  created_at: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const userListeningProgressTable = sqliteTable("user_listening_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: text("user_id").notNull(),
  exercise_id: text("exercise_id").notNull().references(() => listeningExercisesTable.id),
  progress: integer("progress").notNull().default(0),
  updated_at: text("updated_at").default("CURRENT_TIMESTAMP"),
});

export const listeningExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  level: z.string(),
  imageUrl: z.string(),
  audioUrl: z.string(),
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()),
      correct: z.string(),
    })
  ),
  progress: z.number().default(0),
});

export const listeningExercisesResponseSchema = z.array(listeningExerciseSchema);