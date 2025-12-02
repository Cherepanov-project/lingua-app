import { OpenAPIRoute } from 'chanfana'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import type { Env } from '../../..'
import { exerciseInsertTextSchema, exerciseInsertTextTable } from '../models/exerciseInsertText'

export class GetExerciseInsertTextByLevelApi extends OpenAPIRoute {
  schema = {
    tags: ['insert_text'],
    summary: 'Get exercise insert text by level',
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
            schema: exerciseInsertTextSchema,
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

    const rows = await db.select().from(exerciseInsertTextTable).where(eq(exerciseInsertTextTable.level, level)).limit(1)

    if (!rows.length) {
      return Response.json({ error: 'No exercises found for this level' }, { status: 404 })
    }
    const row = rows[0]

    const exerciseInsertText = {
      id: row.id,
      level: row.level,
      sentence: row.sentence,
      missing_words: JSON.parse(row.missing_words),
    }

    return Response.json(exerciseInsertTextSchema.parse(exerciseInsertText))
  }
}
