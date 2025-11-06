import { OpenAPIRoute } from "chanfana";
import { drizzle } from "drizzle-orm/d1";
import { grammarTable } from "../models/Grammar";
import { eq } from "drizzle-orm";
import { z } from "zod";
import type { Env } from "../../../";

export class PatchGrammarApi extends OpenAPIRoute {
  schema = {
    body: z.object({
      title: z.string().optional(),
      slug: z.string().optional(),
      text: z.string().optional(),
    }),
    responses: {
      200: {
        description: "Grammar entry updated successfully",
        content: {
          "application/json": {
            schema: z.object({
              success: z.boolean(),
              updatedId: z.number(),
            }),
          },
        },
      },
      400: {
        description: "Invalid input or missing fields",
      },
      500: {
        description: "Database update failed",
      },
    },
  };

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB);
    const id = Number(new URL(request.url).pathname.split("/").pop());

    if (isNaN(id)) {
      return Response.json(
        { success: false, message: "Invalid or missing ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validated = this.schema.body.parse(body);

    if (!Object.keys(validated).length) {
      return Response.json(
        { success: false, message: "No fields provided for update" },
        { status: 400 }
      );
    }

    try {
      await db
        .update(grammarTable)
        .set(validated)
        .where(eq(grammarTable.id, id));
      return Response.json({ success: true, updatedId: id });
    } catch (err) {
      console.error("DB update error:", err);
      return Response.json(
        {
          success: false,
          message: "Database update failed",
          error: String(err),
        },
        { status: 500 }
      );
    }
  }
}
