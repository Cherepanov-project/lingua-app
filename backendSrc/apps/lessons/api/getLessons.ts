import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { lessonsSchema, lessonsTable } from "../models/Lesson";
import { drizzle } from "drizzle-orm/d1";
import { TLessonsResponse } from "../../../types";
import type { Env } from "../../../";

const RESPONSE_SCHEMA = z.array(
  lessonsSchema
) satisfies z.ZodType<TLessonsResponse>;

const responseSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    exercises: z.array(z.string()),
  })
);

export class GetLessonsApi extends OpenAPIRoute {
  schema = {
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: RESPONSE_SCHEMA,
          },
        },
      },
    },
  };

  async handle(_request: Request, env: Env) {
    const db = drizzle(env.DB);
    const rows = await db.select().from(lessonsTable);

    const lessons = rows.map((row) => ({
      id: row.id,
      name: row.name,
      exercises: JSON.parse(row.exercises) as string[],
    }));
    return Response.json(responseSchema.parse(lessons));
  }
}
