import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { matchgamesSchema, matchgamesTable } from "../models/MatchGame";
import { drizzle } from "drizzle-orm/d1";
import type { TMatchGamesResponse } from "../../../types";
import type { Env } from "../../../";

const RESPONSE_SCHEMA = z.array(
  matchgamesSchema
) satisfies z.ZodType<TMatchGamesResponse>;

const responseSchema = z.array(
  z.object({
    id: z.number(),
    level: z.number(),
    pairs: z.array(
      z.object({
        left: z.string(),
        right: z.string(),
      })
    ),
  })
) satisfies z.ZodType<TMatchGamesResponse>;

export class GetMatchGamesApi extends OpenAPIRoute {
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
    const rows = await db.select().from(matchgamesTable);

    const matchGames = rows.map((row) => ({
      id: row.id,
      level: row.level,
      pairs: JSON.parse(row.pairs) as { left: string; right: string }[],
    }));
    return Response.json(responseSchema.parse(matchGames));
  }
}
