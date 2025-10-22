import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { picturesTable } from "../models/Pictures";
import { drizzle } from "drizzle-orm/d1";
import type { Env } from "../../..";

const RequestSchema = z.object({
  id: z.number().optional(),
  img: z.string(),
  title: z.string(),
  tag: z.string(),
});

export class PostPicturesApi extends OpenAPIRoute {
  schema = {
    tags: ["pictures"],
    summary: "Post new picture",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              id: { type: "number" as const },
              img: { type: "string" as const },
              title: { type: "string" as const },
              tag: { type: "string" as const },
            },
            required: ["img", "title", "tag"],
          },
        },
      },
    },
  };

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB);

    try {
      const body = await request.json();
      const { id: providedId, img, title, tag } = RequestSchema.parse(body);

      let id = providedId;

      if (id === undefined) {
        const result = await env.DB.prepare(
          "SELECT MAX(id) AS maxId FROM pictures_table"
        ).first<{ maxId: number | null }>();

        id =
          result?.maxId !== null && result?.maxId !== undefined
            ? result.maxId + 1
            : 0;
      }

      await db.insert(picturesTable).values({
        id,
        img,
        title,
        tag,
      });

      const inserted = await env.DB.prepare(
        "SELECT * FROM pictures_table WHERE id = ?"
      )
        .bind(id)
        .first<{ id: number; img: string; title: string; tag: string }>();

      if (!inserted) {
        throw new Error("Failed to fetch inserted picture");
      }

      return Response.json(inserted, { status: 201 });
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
