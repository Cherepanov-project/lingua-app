import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { truthorlieGamesTable } from "../models/TruthOrLieGame";
import { drizzle } from "drizzle-orm/d1";
import type { Env } from "../../..";

const RequestSchema = z.object({
  id: z.number().optional(),
  level: z.number(),
  statements: z.array(
    z.object({
      statement: z.string(),
      correctValue: z.string(),
    })
  ),
});

export class PostTruthOrLieGamesApi extends OpenAPIRoute {
  schema = {
    tags: ["truthorliegames"],
    summary: "Post new truth or lie game",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              id: { type: "number" as const },
              level: { type: "number" as const },
              statements: {
                type: "array" as const,
                items: {
                  type: "object" as const,
                  properties: {
                    statement: { type: "string" as const },
                    correctValue: { type: "string" as const },
                  },
                  required: ["statement", "correctValue"],
                },
              },
            },
            required: ["level", "statements"],
          },
        },
      },
    },
  };

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB);

    try {
      const body = await request.json();
      const { id: providedId, level, statements } = RequestSchema.parse(body);

      let id = providedId;

      if (id === undefined) {
        const result = await env.DB.prepare(
          "SELECT MAX(id) AS maxId FROM truthorlie_table"
        ).first<{ maxId: number | null }>();

        id =
          result?.maxId !== null && result?.maxId !== undefined
            ? result.maxId + 1
            : 0;
      }

      await db.insert(truthorlieGamesTable).values({
        id,
        level,
        statements: JSON.stringify(statements),
      });

      const inserted = await env.DB.prepare(
        "SELECT * FROM truthorlie_table WHERE id = ?"
      )
        .bind(id)
        .first<{ id: number; level: number; statements: string }>();

      if (!inserted) {
        throw new Error("Failed to fetch inserted truth or lie game");
      }

      const response = {
        ...inserted,
        statements: JSON.parse(inserted.statements) as {
          statement: string;
          correctValue: string;
        },
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
