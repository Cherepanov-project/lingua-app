import { OpenAPIRoute } from 'chanfana'
import { z } from 'zod'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import type { Env } from '../../..'
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

export class GetGrammarExercisesByLevelApi extends OpenAPIRoute {
  schema = {
    tags: ['grammar_exercises'],
    summary: 'Get grammar exercises by level',
    parameters: [
      {
        name: 'level',
        in: 'path' as const,
        required: true,
        schema: { type: 'string' as const },
        description: 'Level of exercises (например: A1, A2, B1, B2, C1, C2)',
      },
    ],
    responses: {
      200: {
        description: 'Exercises for given level',
        content: {
          'application/json': {
            schema: RESPONSE_SCHEMA,
          },
        },
      },
      404: { description: 'No exercises found for this level' },
    },
  }

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB)
    const url = new URL(request.url)
    const level = url.pathname.split('/').pop() 

    if (!level) {
      return Response.json({ error: 'Level is required in URL' }, { status: 400 })
    }

    const rows = await db.select().from(grammarExercisesTable).where(eq(grammarExercisesTable.level, level))

    if (!rows.length) {
      return Response.json({ error: 'No exercises found for this level' }, { status: 404 })
    }

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
