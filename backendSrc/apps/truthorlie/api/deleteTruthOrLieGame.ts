import { IRequest } from "itty-router";
import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { truthorlieGamesTable } from "../models/TruthOrLieGame";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { Env } from "../../..";

const DeleteGameSchema = z.object({
  id: z.string().regex(/^\d+$/, "id is number"),
});

export class DeleteTruthOrLieGamesApi extends OpenAPIRoute {
  async handle(request: IRequest, env: Env) {
    const db = drizzle(env.DB);
    const params = DeleteGameSchema.safeParse(request.params);

    if (!params.success) {
      return Response.json(
        { error: "Invalid request params", details: params.error.errors },
        { status: 400 }
      );
    }

    const truthorlieGameId = Number(params.data.id);

    try {
      const result = await db
        .delete(truthorlieGamesTable)
        .where(eq(truthorlieGamesTable.id, truthorlieGameId))
        .run();

      if (result.rowsAffected === 0) {
        return Response.json(
          { error: "Truth or lie game not found" },
          { status: 404 }
        );
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
