import { OpenAPIRoute } from "chanfana";
import { drizzle } from "drizzle-orm/d1";
import { grammarSchema, grammarTable } from "../models/Grammar";
import { z } from "zod";
import type { Env } from "../../../";

const RESPONSE_SCHEMA = z.array(grammarSchema);

export class GetGrammarApi extends OpenAPIRoute {
  schema = {
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: RESPONSE_SCHEMA,
          },
        },
      },
    },
  };

  async handle(_request: Request, env: Env) {
    const db = drizzle(env.DB);
    const rows = await db.select().from(grammarTable);
    return Response.json(RESPONSE_SCHEMA.parse(rows));
  }
}
