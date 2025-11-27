import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { lessonsSchema, lessonsTable } from "../models/Lesson";
import { drizzle } from "drizzle-orm/d1";
import type { Env } from "../../../";

export class GetLessonsApi extends OpenAPIRoute {
  schema = {
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: z.array(lessonsSchema),
          },
        },
      },
    },
  };

  async handle(_req: Request, env: Env) {
    const db = drizzle(env.DB);

    const rows = await db.select().from(lessonsTable);

    const lessons = rows.map((row) =>
      lessonsSchema.parse({
        ...row,
        exercises: row.exercises,
        listening: row.listening,
        grammar_exercises: row.grammar_exercises,
        orthography: row.orthography,
        newWords: row.newWords,
        reading: row.reading,
      })
    );

    return Response.json(lessons);
  }
}
