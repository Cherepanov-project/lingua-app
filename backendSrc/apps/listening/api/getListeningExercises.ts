import { OpenAPIRoute } from "chanfana";
import { drizzle } from "drizzle-orm/d1";
import { listeningExercisesTable, userListeningProgressTable, listeningExercisesResponseSchema } from "../models/Listening";
import type { Env } from "../../../";
import { eq, and } from "drizzle-orm";

interface RequestWithUser extends Request {
  user?: { sub: string };
}

export class GetListeningExercisesApi extends OpenAPIRoute {
  schema = {
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: listeningExercisesResponseSchema,
          },
        },
      },
    },
    security: [{ BearerAuth: [] }],
  };

  async handle(request: RequestWithUser, env: Env) {
    const db = drizzle(env.DB);
    const userId = request.user?.sub;

    const rows = await db.select().from(listeningExercisesTable).all();

    const exercises = await Promise.all(
      rows.map(async (row) => {
        const exercise = {
          id: row.id,
          name: row.name,
          description: row.description,
          level: row.level,
          imageUrl: row.image_url,
          audioUrl: row.audio_url,
          questions: JSON.parse(row.questions),
          progress: 0,
        };

        if (userId) {
          const progress = await db
            .select({ progress: userListeningProgressTable.progress })
            .from(userListeningProgressTable)
            .where(
              and(
                eq(userListeningProgressTable.user_id, userId),
                eq(userListeningProgressTable.exercise_id, row.id)
              )
            )
            .get();
          exercise.progress = progress?.progress || 0;
        }

        return exercise;
      })
    );

    return Response.json(listeningExercisesResponseSchema.parse(exercises));
  }
}