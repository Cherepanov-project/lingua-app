import { OpenAPIRoute } from 'chanfana'
import { z } from 'zod'
import { drizzle } from 'drizzle-orm/d1'
import type { Env } from '../../../'
import { wordsTranslateSchema, wordsTranslateTable } from '../models/wordsTranslate'
import { TWordsTranslateResponse } from '../../../types'

const RESPONSE_SCHEMA = z.array(wordsTranslateSchema) satisfies z.ZodType<TWordsTranslateResponse>

const responseSchema = z.array(
  z.object({
    id: z.number(),
    level: z.string(),
    words_ru: z.array(z.string()),
    words_en: z.array(z.string()),
  }),
) satisfies z.ZodType<TWordsTranslateResponse>

export class GetWordsTranslateApi extends OpenAPIRoute {
  schema = {
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: RESPONSE_SCHEMA,
          },
        },
      },
    },
  }

  async handle(_request: Request, env: Env) {
    const db = drizzle(env.DB)
    const rows = await db.select().from(wordsTranslateTable)

    const wordsTranslate = rows.map(row => ({
      id: row.id,
      level: row.level,
      words_ru: JSON.parse(row.words_ru),
      words_en: JSON.parse(row.words_en),
    }))
    return Response.json(responseSchema.parse(wordsTranslate))
  }
}
