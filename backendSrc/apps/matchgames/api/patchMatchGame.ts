import { IRequest } from "itty-router";
import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { matchgamesTable } from "../models/MatchGame";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { Env } from "../../..";

const PatchGameSchema = z.object({
  id: z.number(),
  level: z.number().optional(),
  pairs: z.array(
    z.object({
      left: z.string(),
      right: z.string(),
    })
  ),
});

export class PatchMatchGamesApi extends OpenAPIRoute {
  async handle(request: IRequest, env: Env) {
    const db = drizzle(env.DB);

    let data;
    try {
      const body = await request.json();
      data = PatchGameSchema.parse(body);
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

    if (updateFields.pairs) {
      setData.pairs = JSON.stringify(updateFields.pairs);
    }

    try {
      const result = await db
        .update(matchgamesTable)
        .set(setData)
        .where(eq(matchgamesTable.id, id))
        .run();

      if (result.rowsAffected === 0) {
        return Response.json(
          { error: "Match game not found" },
          { status: 404 }
        );
      }

      const updatedRow = await env.DB.prepare(
        "SELECT * FROM matchgames_table WHERE id = ?"
      )
        .bind(id)
        .first<{ id: number; level: number; pairs: string }>();

      if (!updatedRow) {
        throw new Error("Failed to fetch updated match game");
      }

      const response = {
        ...updatedRow,
        pairs: JSON.parse(updatedRow.pairs),
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
