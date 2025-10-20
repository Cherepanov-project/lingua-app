import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { lessonsTable } from "../models/Lesson";
import { drizzle } from "drizzle-orm/d1";
import type { Env } from "../../..";

const RequestSchema = z.object({
  id: z.string(),
  name: z.string(),
  exercises: z.array(z.string()),
});

export class PostLessonsApi extends OpenAPIRoute {
  schema = {
    tags: ["lessons"],
    summary: "Post new lesson",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              id: { type: "string" as const },
              name: { type: "string" as const },
              exercises: {
                type: "array" as const,
                items: {
                  type: "string" as const,
                },
              },
            },
            required: ["id", "name", "exercises"],
          },
        },
      },
    },
  };

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB);

    try {
      const body = await request.json();
      const { id, name, exercises } = RequestSchema.parse(body);

      await db.insert(lessonsTable).values({
        id,
        name,
        exercises: JSON.stringify(exercises),
      });

      const inserted = await env.DB.prepare(
        "SELECT * FROM lessons_table WHERE id = ?"
      )
        .bind(id)
        .first<{
          id: string;
          name: string;
          exercises: string;
        }>();

      if (!inserted) {
        throw new Error("Failed to fetch inserted lesson");
      }

      const response = {
        ...inserted,
        exercises: JSON.parse(inserted.exercises) as string[],
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
