import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { languagesSchema, languagesTable } from "../models/Language";
import { drizzle } from "drizzle-orm/d1";
import { TLanguagesResponse } from "../../../types";
import type { Env } from "../../../";

const RESPONSE_SCHEMA = z.array(
  languagesSchema
) satisfies z.ZodType<TLanguagesResponse>;

const responseSchema = z.array(
  z.object({
    label: z.string(),
    code: z.string(),
    emoji: z.string(),
  })
);

export class GetLanguagesApi extends OpenAPIRoute {
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
    const rows = await db.select().from(languagesTable);

    const languages = rows.map((row) => ({
      label: row.label,
      code: row.code,
      emoji: row.emoji,
    }));
    return Response.json(responseSchema.parse(languages));
  }
}
