import { IRequest } from "itty-router";
import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { coursesTable } from "../models/Course";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { Env } from "../../..";

const DeleteCourseSchema = z.object({
  id: z.string().regex(/^\d+$/, "id is number"),
});

export class DeleteCoursesApi extends OpenAPIRoute {
  async handle(request: IRequest, env: Env) {
    const db = drizzle(env.DB);
    const params = DeleteCourseSchema.safeParse(request.params);

    if (!params.success) {
      return Response.json(
        { error: "Invalid request params", details: params.error.errors },
        { status: 400 }
      );
    }

    const courseId = Number(params.data.id);

    try {
      const result = await db
        .delete(coursesTable)
        .where(eq(coursesTable.id, courseId))
        .run();

      if (result.rowsAffected === 0) {
        return Response.json({ error: "Course not found" }, { status: 404 });
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
