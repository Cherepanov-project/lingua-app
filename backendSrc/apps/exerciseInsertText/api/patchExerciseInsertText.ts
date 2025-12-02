import { IRequest } from 'itty-router'
import { OpenAPIRoute } from 'chanfana'
import { z } from 'zod'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import type { Env } from '../../..'
import { exerciseInsertTextTable } from '../models/exerciseInsertText'

const ExerciseInsertTextSchema = z.object({
  id: z.number(),
  level: z.string(),
  sentence: z.string(),
  missing_words: z.array(z.string()),
})

export class PatchExerciseInsertTextApi extends OpenAPIRoute {
  async handle(request: IRequest, env: Env) {
    const db = drizzle(env.DB)

    let data
    try {
      const body = await request.json()
      data = ExerciseInsertTextSchema.parse(body)
    } catch (error) {
      return Response.json({ error: 'Invalid request body', details: (error as Error).message }, { status: 400 })
    }

    const { id, ...updateFields } = data

    if (Object.keys(updateFields).length === 0) {
      return Response.json({ error: 'No fields to update' }, { status: 400 })
    }

    const setData: Record<string, unknown> = { ...updateFields }

    if (updateFields.missing_words) {
      setData.missing_words = JSON.stringify(updateFields.missing_words)
    }

    try {
      const result = await db.update(exerciseInsertTextTable).set(setData).where(eq(exerciseInsertTextTable.id, id)).run()

      if (result.rowsAffected === 0) {
        return Response.json({ error: 'Grammar exercise not found' }, { status: 404 })
      }

      const updatedRow = await env.DB.prepare('SELECT * FROM insert_text WHERE id = ?')
        .bind(id)
        .first<{ id: number; level: string; sentence: string; missing_words: string }>()

      if (!updatedRow) {
        throw new Error('Failed to fetch updated text')
      }

      const response = {
        ...updatedRow,
        missing_words: JSON.parse(updatedRow.missing_words),
      }

      return Response.json(response, { status: 200 })
    } catch (error) {
      return Response.json({ error: (error as Error).message }, { status: 500 })
    }
  }
}
