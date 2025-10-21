import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { picturesSchema, picturesTable } from "../models/Pictures";
import { drizzle } from "drizzle-orm/d1";
import { TPicturesResponse } from "../../../types";
import type { Env } from "../../../";

const RESPONSE_SCHEMA = z.array(
  picturesSchema
) satisfies z.ZodType<TPicturesResponse>;

const responseSchema = z.array(
  z.object({
    id: z.number(),
    img: z.string(),
    title: z.string(),
    tag: z.string(),
  })
);

export class GetPicturesApi extends OpenAPIRoute {
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
    const rows = await db.select().from(picturesTable);

    const pictures = rows.map((row) => ({
      id: row.id,
      img: row.img,
      title: row.title,
      tag: row.tag,
    }));
    return Response.json(responseSchema.parse(pictures));
  }
}
