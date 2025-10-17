import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { matchgamesTable } from "../models/MatchGame";
import { drizzle } from "drizzle-orm/d1";
import type { Env } from "../../../";

const RequestSchema = z.object({
  id: z.number().optional(),
  level: z.number(),
  pairs: z.array(
    z.object({
      left: z.string(),
      right: z.string(),
    })
  ),
});

export class PostMatchGamesApi extends OpenAPIRoute {
  schema = {
    tags: ["matchgames"],
    summary: "Post new match game",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              id: { type: "number" as const },
              level: { type: "number" as const },
              pairs: {
                type: "array" as const,
                items: {
                  type: "object" as const,
                  properties: {
                    left: { type: "string" as const },
                    right: { type: "string" as const },
                  },
                  required: ["left", "right"],
                },
              },
            },
            required: ["level", "pairs"],
          },
        },
      },
    },
    responses: {
      "201": { description: "Match game was successfully posted" },
      "400": { description: "Bad request" },
      "500": { description: "Internal server error" },
    },
  };

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB);

    try {
      const body = await request.json();
      const { id: providedId, level, pairs } = RequestSchema.parse(body);

      let id = providedId;

      if (id === undefined) {
        const result = await env.DB.prepare(
          "SELECT MAX(id) AS maxId FROM matchgames_table"
        ).first<{ maxId: number | null }>();

        id =
          result?.maxId !== null && result?.maxId !== undefined
            ? result.maxId + 1
            : 0;
      }

      await db.insert(matchgamesTable).values({
        id,
        level,
        pairs: JSON.stringify(pairs),
      });

      const inserted = await env.DB.prepare(
        "SELECT * FROM matchgames_table WHERE id = ?"
      )
        .bind(id)
        .first<{ id: number; level: number; pairs: string }>();

      if (!inserted) {
        throw new Error("Failed to fetch inserted match game");
      }

      const response = {
        ...inserted,
        pairs: JSON.parse(inserted.pairs) as { left: string; right: string },
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
