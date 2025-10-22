import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { levelsSchema, levelsTable } from "../models/Level";
import { drizzle } from "drizzle-orm/d1";
import { TLevelsResponse } from "../../../types";
import type { Env } from "../../../";

const RESPONSE_SCHEMA = z.array(
  levelsSchema
) satisfies z.ZodType<TLevelsResponse>;

const responseSchema = z.array(
  z.object({
    id: z.number(),
    label: z.string(),
  })
);

export class GetLevelsApi extends OpenAPIRoute {
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
    const rows = await db.select().from(levelsTable);

    const levels = rows.map((row) => ({
      id: row.id,
      label: row.label,
    }));
    return Response.json(responseSchema.parse(levels));
  }
}
