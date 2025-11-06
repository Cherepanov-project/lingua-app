import { OpenAPIRoute } from "chanfana";
import { drizzle } from "drizzle-orm/d1";
import { grammarTable } from "../models/Grammar";
import { z } from "zod";
import type { Env } from "../../../";

export class PostGrammarApi extends OpenAPIRoute {
  schema = {
    body: z.object({
      title: z.string(),
      slug: z.string(),
      text: z.string(),
    }),
    responses: {
      200: {
        description: "Grammar entry created successfully",
        content: {
          "application/json": {
            schema: z.object({
              id: z.number(),
              title: z.string(),
              slug: z.string(),
              text: z.string(),
            }),
          },
        },
      },
    },
  };

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB);
    const body = await request.json();

    const [inserted] = await db
      .insert(grammarTable)
      .values({
        title: body.title,
        slug: body.slug,
        text: body.text,
      })
      .returning();

    return Response.json(inserted);
  }
}
