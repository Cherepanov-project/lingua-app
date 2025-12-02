import { OpenAPIRoute } from 'chanfana'
import { z } from 'zod'
import { drizzle } from 'drizzle-orm/d1'
import type { Env } from '../../../'
import type { TExerciseInsertTextResponse } from '../../../types'
import { exerciseInsertTextSchema, exerciseInsertTextTable } from '../models/exerciseInsertText'

const RESPONSE_SCHEMA = z.array(exerciseInsertTextSchema) satisfies z.ZodType<TExerciseInsertTextResponse>

const responseSchema = z.array(
  z.object({
    id: z.number(),
    level: z.string(),
    sentence: z.string(),
    missing_words: z.array(z.string()),
  }),
) satisfies z.ZodType<TExerciseInsertTextResponse>

export class GetExerciseInsertTextApi extends OpenAPIRoute {
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
    const rows = await db.select().from(exerciseInsertTextTable)

    const exerciseInsertText = rows.map(row => ({
      id: row.id,
      level: row.level,
      sentence: row.sentence,
      missing_words: JSON.parse(row.missing_words),
    }))
    return Response.json(responseSchema.parse(exerciseInsertText))
  }
}
