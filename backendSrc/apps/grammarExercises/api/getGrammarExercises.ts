import { OpenAPIRoute } from 'chanfana'
import { z } from 'zod'
import { drizzle } from 'drizzle-orm/d1'
import type { Env } from '../../../'
import { grammarExercisesSchema, grammarExercisesTable } from '../models/GrammarExercises'
import type { TGrammarExerciseResponse } from '../../../types'

const RESPONSE_SCHEMA = z.array(grammarExercisesSchema) satisfies z.ZodType<TGrammarExerciseResponse>

const responseSchema = z.array(
  z.object({
    id: z.number(),
    grammar_id: z.number(),
    level: z.string(),
    sentence: z.string(),
    missing_words: z.array(z.string()),
  }),
) satisfies z.ZodType<TGrammarExerciseResponse>

export class GetGrammarExerciseApi extends OpenAPIRoute {
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
    const rows = await db.select().from(grammarExercisesTable)

    const grammarExercises = rows.map(row => ({
      id: row.id,
      grammar_id: row.grammar_id,
      level: row.level,
      sentence: row.sentence,
      missing_words: JSON.parse(row.missing_words),
    }))
    return Response.json(responseSchema.parse(grammarExercises))
  }
}
