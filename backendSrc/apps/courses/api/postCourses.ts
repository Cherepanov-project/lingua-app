import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { coursesTable } from "../models/Course";
import { drizzle } from "drizzle-orm/d1";
import type { Env } from "../../..";

const RequestSchema = z.object({
  id: z.number().optional(),
  language: z.string(),
  level: z.string(),
  description: z.string(),
  amountTime: z.number(),
  modules: z.array(z.string()),
  published: z.boolean(),
});

export class PostCoursesApi extends OpenAPIRoute {
  schema = {
    tags: ["courses"],
    summary: "Post new course",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              id: { type: "number" as const },
              language: { type: "string" as const },
              level: { type: "string" as const },
              description: { type: "string" as const },
              amountTime: { type: "number" as const },
              modules: {
                type: "array" as const,
                items: {
                  type: "string" as const,
                },
              },
              published: { type: "boolean" as const },
            },
            required: [
              "language",
              "level",
              "description",
              "amountTime",
              "modules",
              "published",
            ],
          },
        },
      },
    },
  };

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB);

    try {
      const body = await request.json();
      const {
        id: providedId,
        language,
        level,
        description,
        amountTime,
        modules,
        published,
      } = RequestSchema.parse(body);

      let id = providedId;

      if (id === undefined) {
        const result = await env.DB.prepare(
          "SELECT MAX(id) AS maxId FROM courses_table"
        ).first<{ maxId: number | null }>();

        id =
          result?.maxId !== null && result?.maxId !== undefined
            ? result.maxId + 1
            : 0;
      }

      await db.insert(coursesTable).values({
        id,
        language,
        level,
        description,
        amountTime,
        modules: JSON.stringify(modules),
        published,
      });

      const inserted = await env.DB.prepare(
        "SELECT * FROM courses_table WHERE id = ?"
      )
        .bind(id)
        .first<{
          id: number;
          language: string;
          level: string;
          description: string;
          amountTime: number;
          modules: string;
          published: boolean;
        }>();

      if (!inserted) {
        throw new Error("Failed to fetch inserted course");
      }

      const response = {
        ...inserted,
        modules: JSON.parse(inserted.modules) as string[],
      };

      return Response.json(response, { status: 201 });
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        return Response.json({
          error: "Validation failed",
          details: error.errors,
        });
      }

      return Response.json(
        { error: "Internal server error", details: String(error) },
        { status: 500 }
      );
    }
  }
}
