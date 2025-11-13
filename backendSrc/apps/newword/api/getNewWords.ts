import { NewWords } from "../../../types";
import { newWordsSchema, topicsTable, wordsTable } from "../models/NewWords";
import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { drizzle } from "drizzle-orm/d1";
import type { Env } from "../../../";

const RESPONSE_SCHEMA = z.array(
  newWordsSchema
) satisfies z.ZodType<NewWords>;

export const responseSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    words: z.array(
      z.object({
        id: z.number(),
        topic_id: z.number(),
        ru: z.string(),
        en: z.string(),
      })
    ),
  })
) satisfies z.ZodType<NewWords>;

export class GetNewWordsApi extends OpenAPIRoute {
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

    const topics = await db.select().from(topicsTable);

    const words = await db.select().from(wordsTable);

    const groupedWords = topics.map(topic => ({
      id: topic.id,
      title: topic.title,
      words: words.filter(word => word.topic_id === topic.id),
    }));

    return Response.json(responseSchema.parse(groupedWords));
  }
}