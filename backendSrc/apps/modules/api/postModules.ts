import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { modulesTable } from "../models/Module";
import { drizzle } from "drizzle-orm/d1";
import type { Env } from "../../..";

const RequestSchema = z.object({
  name: z.string(),
  lessons: z.array(z.string()).default([]),
  grammar: z.array(z.string()).default([]),
});

const ResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  lessons: z.array(z.string()),
  grammar: z.array(z.string()).default([]),
});

export class PostModulesApi extends OpenAPIRoute {
  schema = {
    tags: ["modules"],
    summary: "Create module",
    body: RequestSchema,
    responses: {
      201: {
        description: "Created module",
        content: {
          "application/json": {
            schema: ResponseSchema,
          },
        },
      },
    },
  };

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB);

    try {
      const body = RequestSchema.parse(await request.json());

      const id = crypto.randomUUID();

      await db.insert(modulesTable).values({
        id,
        name: body.name,
        lessons: JSON.stringify(body.lessons),
        grammar: JSON.stringify(body.grammar),
      });

      return Response.json(
        {
          id,
          name: body.name,
          lessons: body.lessons,
          grammar: body.grammar,
        },
        { status: 201 }
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        return Response.json(
          { error: "Validation failed", details: error.errors },
          { status: 400 }
        );
      }

      return Response.json(
        { error: "Internal server error", details: String(error) },
        { status: 500 }
      );
    }
  }
}
