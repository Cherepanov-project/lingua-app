import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { coursesSchema, coursesTable } from "../models/Course";
import { drizzle } from "drizzle-orm/d1";
import { TCoursesResponse } from "../../../types";
import type { Env } from "../../../";

const RESPONSE_SCHEMA = z.array(
  coursesSchema
) satisfies z.ZodType<TCoursesResponse>;

const responseSchema = z.array(
  z.object({
    id: z.number(),
    language: z.string(),
    level: z.string(),
    description: z.string(),
    amountTime: z.number(),
    modules: z.array(z.string()),
    published: z.boolean(),
  })
);

export class GetCoursesApi extends OpenAPIRoute {
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
    const rows = await db.select().from(coursesTable);

    const courses = rows.map((row) => ({
      id: row.id,
      language: row.language,
      level: row.language,
      description: row.description,
      amountTime: row.amountTime,
      modules: JSON.parse(row.modules) as string[],
      published: row.published,
    }));
    return Response.json(responseSchema.parse(courses));
  }
}
