import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { drizzle } from "drizzle-orm/d1";
import { userListeningProgressTable } from "../models/Listening";
import type { Env } from "../../../";
import { sql } from "drizzle-orm";

interface RequestWithUser extends Request {
  user?: { sub: string };
}

const requestSchema = z.object({
  exerciseId: z.string(),
  progress: z.boolean(),
});

export class UpdateListeningProgressApi extends OpenAPIRoute {
  static schema = {
    tags: ["Listening"],
    summary: "Update listening exercise progress",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["exerciseId", "progress"],
            properties: {
              exerciseId: { type: "string" },
              progress: { type: "boolean" },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
          },
        },
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: { type: "string" },
              },
            },
          },
        },
      },
    },
    security: [{ BearerAuth: [] }],
  };

  async handle(request: RequestWithUser, env: Env) {
    if (!request.user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const body = await request.json();
    const { exerciseId, progress } = requestSchema.parse(body);

    const db = drizzle(env.DB);
    await db
      .insert(userListeningProgressTable)
      .values({
        user_id: request.user.sub,
        exercise_id: exerciseId,
        progress: progress ? 1 : 0,
      })
      .onConflictDoUpdate({
        target: [userListeningProgressTable.user_id, userListeningProgressTable.exercise_id],
        set: { progress: progress ? 1 : 0, updated_at: sql`CURRENT_TIMESTAMP` },
      });

    return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
  }
}