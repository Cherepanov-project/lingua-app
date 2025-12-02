import { OpenAPIRoute } from 'chanfana'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import type { Env } from '../../..'
import { wordsTranslateSchema, wordsTranslateTable } from '../models/wordsTranslate'

export class GetWordsTranslateByLevelApi extends OpenAPIRoute {
  schema = {
    tags: ['words_translate'],
    summary: 'Get words by level',
    parameters: [
      {
        name: 'level',
        in: 'path' as const,
        required: true,
        schema: { type: 'string' as const },
        description: 'Level of exercises (A1, A2, B1, B2, C1, C2)',
      },
    ],
    responses: {
      200: {
        description: 'Exercises for given level',
        content: {
          'application/json': {
            schema: wordsTranslateSchema,
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

    const rows = await db.select().from(wordsTranslateTable).where(eq(wordsTranslateTable.level, level)).limit(1)

    if (!rows.length) {
      return Response.json({ error: 'No exercises found for this level' }, { status: 404 })
    }
    const row = rows[0]

    const wordsTranslate = {
      id: row.id,
      level: row.level,
      words_ru: JSON.parse(row.words_ru),
      words_en: JSON.parse(row.words_en),
    }

    return Response.json(wordsTranslateSchema.parse(wordsTranslate))
  }
}
