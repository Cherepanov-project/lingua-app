import { IRequest } from "itty-router";
import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { coursesTable } from "../models/Course";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { Env } from "../../..";

const PatchCourseSchema = z.object({
  id: z.number(),
  language: z.string().optional(),
  level: z.string().optional(),
  description: z.string().optional(),
  amountTime: z.number().optional(),
  modules: z.array(z.string()).optional(),
  published: z.boolean().optional(),
});

export class PatchCoursesApi extends OpenAPIRoute {
  async handle(request: IRequest, env: Env) {
    const db = drizzle(env.DB);

    let data;
    try {
      const body = await request.json();
      data = PatchCourseSchema.parse(body);
    } catch (error) {
      return Response.json(
        { error: "Invalid request body", details: (error as Error).message },
        { status: 400 }
      );
    }

    const { id, ...updateFields } = data;

    if (Object.keys(updateFields).length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    const setData: Record<string, unknown> = { ...updateFields };

    if (updateFields.modules) {
      setData.modules = JSON.stringify(updateFields.modules);
    }

    try {
      const result = await db
        .update(coursesTable)
        .set(setData)
        .where(eq(coursesTable.id, id))
        .run();

      if (result.rowsAffected === 0) {
        return Response.json({ error: "Course not found" }, { status: 404 });
      }

      const updatedRow = await env.DB.prepare(
        "SELECT * FROM courses_table WHERE id = ?"
      )
        .bind(id)
        .first<{
          id: number;
          language: string;
          level: string;
          description: string;
          amountTime: number;
          modules: string;
          published: boolean;
        }>();

      if (!updatedRow) {
        throw new Error("Failed to fetch updated course");
      }

      const response = {
        ...updatedRow,
        modules: JSON.parse(updatedRow.modules),
      };

      return Response.json(response, { status: 200 });
    } catch (error) {
      return Response.json(
        { error: (error as Error).message },
        { status: 500 }
      );
    }
  }
}
