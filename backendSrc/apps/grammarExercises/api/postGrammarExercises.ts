import { OpenAPIRoute } from 'chanfana'
import { z } from 'zod'
import { drizzle } from 'drizzle-orm/d1'
import type { Env } from '../../../'
import { grammarExercisesTable } from '../models/GrammarExercises'

const RequestSchema = z.object({
  id: z.number().optional(),
  grammar_id: z.number(),
  level: z.string(),
  sentence: z.string(),
  missing_words: z.array(z.string()),
})

export class PostGrammarExercisesApi extends OpenAPIRoute {
  schema = {
    tags: ['grammar_exercises'],
    summary: 'Post new grammar exercise',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object' as const,
            properties: {
              id: { type: 'number' as const },
              grammar_id: { type: 'number' as const },
              level: { type: 'string' as const },
              sentence: { type: 'string' as const },
              missing_words: { type: 'array' as const },
            },
          },
        },
      },
    },
    responses: {
      '201': { description: 'Grammar exercise was successfully posted' },
      '400': { description: 'Bad request' },
      '500': { description: 'Internal server error' },
    },
  }

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB)

    try {
      const body = await request.json()
      const { id: providedId, grammar_id, level, sentence, missing_words } = RequestSchema.parse(body)

      let id = providedId

      if (id === undefined) {
        const result = await env.DB.prepare('SELECT MAX(id) AS maxId FROM grammar_exercises').first<{
          maxId: number | null
        }>()

        id = result?.maxId !== null && result?.maxId !== undefined ? result.maxId + 1 : 0
      }

      const [inserted] = await db
        .insert(grammarExercisesTable)
        .values({ id, grammar_id, level, sentence, missing_words: JSON.stringify(missing_words) })
        .returning()

      if (!inserted) {
        throw new Error('Failed to fetch inserted grammar exercise')
      }

      return Response.json(inserted, { status: 201 })
    } catch (error) {
      console.error(error)

      if (error instanceof z.ZodError) {
        return Response.json({
          error: 'Validation failed',
          details: error.errors,
        })
      }

      return Response.json({ error: 'Internal server error', details: String(error) }, { status: 500 })
    }
  }
}
