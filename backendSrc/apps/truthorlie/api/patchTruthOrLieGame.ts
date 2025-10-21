import { IRequest } from "itty-router";
import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { truthorlieGamesTable } from "../models/TruthOrLieGame";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { Env } from "../../..";

const PatchGameSchema = z.object({
  id: z.number(),
  level: z.number().optional(),
  statements: z
    .array(
      z.object({
        statement: z.string(),
        correctValue: z.string(),
      })
    )
    .optional(),
});

export class PatchTruthOrLieGamesApi extends OpenAPIRoute {
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

    if (updateFields.statements) {
      setData.statements = JSON.stringify(updateFields.statements);
    }

    try {
      const result = await db
        .update(truthorlieGamesTable)
        .set(setData)
        .where(eq(truthorlieGamesTable.id, id))
        .run();

      if (result.rowsAffected === 0) {
        return Response.json(
          { error: "Truth or lie game not found" },
          { status: 404 }
        );
      }

      const updatedRow = await env.DB.prepare(
        "SELECT * FROM truthorlie_table WHERE id = ?"
      )
        .bind(id)
        .first<{ id: number; level: number; statements: string }>();

      if (!updatedRow) {
        throw new Error("Failed to fetch updated truth or lie game");
      }

      const response = {
        ...updatedRow,
        statements: JSON.parse(updatedRow.statements),
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
