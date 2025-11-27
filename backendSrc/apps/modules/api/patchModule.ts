import { IRequest } from "itty-router";
import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { modulesTable } from "../models/Module";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { Env } from "../../..";

const PatchModuleSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  lessons: z.array(z.string()).optional(),
  grammar: z.array(z.string()).optional(),
});

export class PatchModulesApi extends OpenAPIRoute {
  async handle(request: IRequest, env: Env) {
    const db = drizzle(env.DB);

    let data;
    try {
      const body = await request.json();
      data = PatchModuleSchema.parse(body);
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

    if (updateFields.lessons) {
      setData.lessons = JSON.stringify(updateFields.lessons);
    }

    if (updateFields.grammar) {
      setData.grammar = JSON.stringify(updateFields.grammar);
    }
    try {
      const result = await db
        .update(modulesTable)
        .set(setData)
        .where(eq(modulesTable.id, id))
        .run();

      if (result.rowsAffected === 0) {
        return Response.json({ error: "Module not found" }, { status: 404 });
      }

      const updatedRow = await env.DB.prepare(
        "SELECT * FROM modules_table WHERE id = ?"
      )
        .bind(id)
        .first<{
          id: string;
          name: string;
          lessons: string;
          grammar: string;
        }>();

      if (!updatedRow) {
        throw new Error("Failed to fetch updated module");
      }

      const response = {
        ...updatedRow,
        lessons: JSON.parse(updatedRow.lessons),
        grammar: JSON.parse(updatedRow.grammar),
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
