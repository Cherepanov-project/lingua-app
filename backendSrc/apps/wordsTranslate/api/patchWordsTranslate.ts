import { IRequest } from 'itty-router'
import { OpenAPIRoute } from 'chanfana'
import { z } from 'zod'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import type { Env } from '../../..'
import { wordsTranslateTable } from '../models/wordsTranslate'

const WordsTranslateSchema = z.object({
  id: z.number(),
  level: z.string(),
  words_ru: z.array(z.string()),
  words_en: z.array(z.string()),
})

export class PatchWordsTranslateApi extends OpenAPIRoute {
  async handle(request: IRequest, env: Env) {
    const db = drizzle(env.DB)

    let data
    try {
      const body = await request.json()
      data = WordsTranslateSchema.parse(body)
    } catch (error) {
      return Response.json({ error: 'Invalid request body', details: (error as Error).message }, { status: 400 })
    }

    const { id, ...updateFields } = data

    if (Object.keys(updateFields).length === 0) {
      return Response.json({ error: 'No fields to update' }, { status: 400 })
    }

    const setData: Record<string, unknown> = { ...updateFields }

    if (updateFields.words_ru) {
      setData.words_ru = JSON.stringify(updateFields.words_ru)
    }
    if (updateFields.words_en) {
      setData.words_en = JSON.stringify(updateFields.words_en)
    }

    try {
      const result = await db.update(wordsTranslateTable).set(setData).where(eq(wordsTranslateTable.id, id)).run()

      if (result.rowsAffected === 0) {
        return Response.json({ error: 'Words not found' }, { status: 404 })
      }

      const updatedRow = await env.DB.prepare('SELECT * FROM words_translate WHERE id = ?')
        .bind(id)
        .first<{ id: number; level: string; words_ru: string; words_en: string }>()

      if (!updatedRow) {
        throw new Error('Failed to fetch updated words')
      }

      const response = {
        ...updatedRow,
        words_ru: JSON.parse(updatedRow.words_ru),
        words_en: JSON.parse(updatedRow.words_en),
      }

      return Response.json(response, { status: 200 })
    } catch (error) {
      return Response.json({ error: (error as Error).message }, { status: 500 })
    }
  }
}
