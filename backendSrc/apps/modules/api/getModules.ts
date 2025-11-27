import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { modulesSchema, modulesTable } from "../models/Module";
import { drizzle } from "drizzle-orm/d1";
import { TModulesResponse } from "../../../types";
import type { Env } from "../../../";

const RESPONSE_SCHEMA = z.array(
  modulesSchema
) satisfies z.ZodType<TModulesResponse>;

const responseSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    lessons: z.array(z.string()),
    grammar: z.array(z.string()),
  })
);

export class GetModulesApi extends OpenAPIRoute {
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
    const rows = await db.select().from(modulesTable);

    const modules = rows.map((row) => ({
      id: row.id,
      name: row.name,
      lessons: JSON.parse(row.lessons) as string[],
      grammar: JSON.parse(row.grammar),
    }));
    return Response.json(responseSchema.parse(modules));
  }
}
