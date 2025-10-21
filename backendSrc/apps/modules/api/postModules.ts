import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { modulesTable } from "../models/Module";
import { drizzle } from "drizzle-orm/d1";
import type { Env } from "../../..";

const RequestSchema = z.object({
  id: z.string(),
  name: z.string(),
  lessons: z.array(z.string()),
});

export class PostModulesApi extends OpenAPIRoute {
  schema = {
    tags: ["modules"],
    summary: "Post new module",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              id: { type: "string" as const },
              name: { type: "string" as const },
              lessons: {
                type: "array" as const,
                items: {
                  type: "string" as const,
                },
              },
            },
            required: ["id", "name", "lessons"],
          },
        },
      },
    },
  };

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB);

    try {
      const body = await request.json();
      const { id, name, lessons } = RequestSchema.parse(body);

      await db.insert(modulesTable).values({
        id,
        name,
        lessons: JSON.stringify(lessons),
      });

      const inserted = await env.DB.prepare(
        "SELECT * FROM modules_table WHERE id = ?"
      )
        .bind(id)
        .first<{
          id: string;
          name: string;
          lessons: string;
        }>();

      if (!inserted) {
        throw new Error("Failed to fetch inserted module");
      }

      const response = {
        ...inserted,
        lessons: JSON.parse(inserted.lessons) as string[],
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
