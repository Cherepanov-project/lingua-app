import { IRequest } from "itty-router";
import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { modulesTable } from "../models/Module";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { Env } from "../../..";

const DeleteModuleSchema = z.object({
  id: z.string(),
});

export class DeleteModulesApi extends OpenAPIRoute {
  async handle(request: IRequest, env: Env) {
    const db = drizzle(env.DB);
    const params = DeleteModuleSchema.safeParse(request.params);

    if (!params.success) {
      return Response.json(
        { error: "Invalid request params", details: params.error.errors },
        { status: 400 }
      );
    }

    const moduleId = params.data.id;

    try {
      const result = await db
        .delete(modulesTable)
        .where(eq(modulesTable.id, moduleId))
        .run();

      if (result.rowsAffected === 0) {
        return Response.json({ error: "Module not found" }, { status: 404 });
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
