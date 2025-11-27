import { IRequest } from "itty-router";
import { OpenAPIRoute } from "chanfana";
import { coursesTable } from "../models/Course";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { Env } from "../../..";

export class GetCourseByIdApi extends OpenAPIRoute {
  async handle(request: IRequest, env: Env) {
    const db = drizzle(env.DB);
    const id = Number(request.params.id);

    const rows = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.id, id))
      .all();

    const row = rows[0];

    if (!row) {
      return Response.json({ error: "Course not found" }, { status: 404 });
    }

    return Response.json({
      ...row,
      modules: row.modules ? JSON.parse(row.modules) : [],
    });
  }
}
