import { OpenAPIRoute } from "chanfana";
import { drizzle } from "drizzle-orm/d1";
import { grammarTable } from "../models/Grammar";
import { eq } from "drizzle-orm";
import { z } from "zod";
import type { Env } from "../../../";

export class DeleteGrammarApi extends OpenAPIRoute {
  schema = {
    params: z.object({
      id: z.string(),
    }),
    responses: {
      200: {
        description: "Grammar entry deleted successfully",
        content: {
          "application/json": {
            schema: z.object({
              success: z.boolean(),
              deletedId: z.number(),
            }),
          },
        },
      },
    },
  };

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB);

    const url = new URL(request.url);
    const idString = url.pathname.split("/").pop();
    const id = Number(idString);

    if (isNaN(id)) {
      return Response.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    await db.delete(grammarTable).where(eq(grammarTable.id, id));

    return Response.json({ success: true, deletedId: id });
  }
}
