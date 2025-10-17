import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import {
  truthorlieGamesTable,
  truthorlieGamesSchema,
} from "../models/TruthOrLieGame";
import { drizzle } from "drizzle-orm/d1";
import { TTruthOrLieGamesResponse } from "../../../types";
import type { Env } from "../../../";

const RESPONSE_SCHEMA = z.array(
  truthorlieGamesSchema
) satisfies z.ZodType<TTruthOrLieGamesResponse>;

const responseSchema = z.array(
  z.object({
    id: z.number(),
    level: z.number(),
    statements: z.array(
      z.object({
        statement: z.string(),
        correctValue: z.string(),
      })
    ),
  })
);

export class GetTruthOrLieGamesApi extends OpenAPIRoute {
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
    const rows = await db.select().from(truthorlieGamesTable);

    const truthorlieGames = rows.map((row) => ({
      id: row.id,
      level: row.level,
      statements: JSON.parse(row.statements) as {
        statement: string;
        correctValue: string;
      }[],
    }));
    return Response.json(responseSchema.parse(truthorlieGames));
  }
}
