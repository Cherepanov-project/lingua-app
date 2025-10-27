import { OpenAPIRoute } from "chanfana";
import { drizzle } from "drizzle-orm/d1";
import { listeningExercisesTable, userListeningProgressTable, listeningExerciseSchema } from "../models/Listening";
import type { Env } from "../../../";
import { eq, and } from "drizzle-orm";

interface RequestWithUser extends Request {
  user?: { sub: string };
}

export class GetListeningExerciseApi extends OpenAPIRoute {
  schema = {
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: listeningExerciseSchema,
          },
        },
      },
      404: {
        description: "Not Found",
      },
    },
    security: [{ BearerAuth: [] }],
  };

  async handle(request: RequestWithUser, env: Env) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return new Response("Missing id", { status: 400 });

    const db = drizzle(env.DB);
    const userId = request.user?.sub;

    const row = await db
      .select()
      .from(listeningExercisesTable)
      .where(eq(listeningExercisesTable.id, id))
      .get();
    if (!row) return new Response("Not found", { status: 404 });

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

    return Response.json(listeningExerciseSchema.parse(exercise));
  }
}