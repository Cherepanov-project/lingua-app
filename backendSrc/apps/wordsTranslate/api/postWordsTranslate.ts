import { OpenAPIRoute } from 'chanfana'
import { z } from 'zod'
import { drizzle } from 'drizzle-orm/d1'
import type { Env } from '../../../'
import { wordsTranslateTable } from '../models/wordsTranslate'

const RequestSchema = z.object({
  id: z.number().optional(),
  level: z.string(),
  words_ru: z.array(z.string()), 
  words_en: z.array(z.string()),
})

export class PostWordsTranslateApi extends OpenAPIRoute {
  schema = {
    tags: ['words_translate'],
    summary: 'Post new words',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object' as const,
            properties: {
              id: { type: 'number' as const },
              level: { type: 'string' as const },
              words_ru: { type: 'array' as const },
              words_en: { type: 'array' as const },
            },
          },
        },
      },
    },
    responses: {
      '201': { description: 'Words was successfully posted' },
      '400': { description: 'Bad request' },
      '500': { description: 'Internal server error' },
    },
  }

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB)

    try {
      const body = await request.json()
      const { id: providedId, level, words_ru, words_en } = RequestSchema.parse(body)

      let id = providedId

      if (id === undefined) {
        const result = await env.DB.prepare('SELECT MAX(id) AS maxId FROM words_translate').first<{
          maxId: number | null
        }>()

        id = result?.maxId !== null && result?.maxId !== undefined ? result.maxId + 1 : 0
      }

      const [inserted] = await db
        .insert(wordsTranslateTable)
        .values({ id, level, words_ru: JSON.stringify(words_ru), words_en: JSON.stringify(words_en) })
        .returning()

      if (!inserted) {
        throw new Error('Failed to fetch inserted words')
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
