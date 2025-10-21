import { IRequest } from "itty-router";
import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { lessonsTable } from "../models/Lesson";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { Env } from "../../..";

const DeleteLessonSchema = z.object({
  id: z.string(),
});

export class DeleteLessonsApi extends OpenAPIRoute {
  async handle(request: IRequest, env: Env) {
    const db = drizzle(env.DB);
    const params = DeleteLessonSchema.safeParse(request.params);

    if (!params.success) {
      return Response.json(
        { error: "Invalid request params", details: params.error.errors },
        { status: 400 }
      );
    }

    const lessonId = params.data.id;

    try {
      const result = await db
        .delete(lessonsTable)
        .where(eq(lessonsTable.id, lessonId))
        .run();

      if (result.rowsAffected === 0) {
        return Response.json({ error: "Lesson not found" }, { status: 404 });
      }

      return Response.json(
        { success: true, deleted: result.rowsAffected },
        { status: 200 }
      );
    } catch (error) {
      return Response.json(
        { error: "Internal server error", details: (error as Error).message },
        { status: 500 }
      );
    }
  }
}
