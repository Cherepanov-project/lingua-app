import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { orphographiesSchema, orphographiesTable } from "../models/Orphography";
import { drizzle } from "drizzle-orm/d1";
import { TOrphographiesResponse } from "../../../types";
import type { Env } from "../../../";

const RESPONSE_SCHEMA = z.array(
  orphographiesSchema
) satisfies z.ZodType<TOrphographiesResponse>;

const responseSchema = z.array(
  z.object({
    id: z.number(),
    word: z.string(),
    image: z.string(),
    description: z.string(),
  })
);

export class GetOrphographiesApi extends OpenAPIRoute {
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
    const rows = await db.select().from(orphographiesTable);

    const orphographies = rows.map((row) => ({
      id: row.id,
      word: row.word,
      image: row.image,
      description: row.description,
    }));
    return Response.json(responseSchema.parse(orphographies));
  }
}
