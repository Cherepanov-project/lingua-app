import { IRequest } from 'itty-router'
import { OpenAPIRoute } from 'chanfana'
import { z } from 'zod'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import type { Env } from '../../..'
import { topicsTable, wordsTable } from '../models/NewWords'

const PatchWordsSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  words: z
    .array(
      z.object({
        id: z.number(),
        topic_id: z.number(),
        ru: z.string(),
        en: z.string(),
      }),
    )
    .optional(),
})

export class PatchNewWordsApi extends OpenAPIRoute {
  async handle(request: IRequest, env: Env) {
    const db = drizzle(env.DB)

    let data
    try {
      const body = await request.json()
      data = PatchWordsSchema.parse(body)
    } catch (error) {
      return Response.json({ error: 'Invalid request body', details: (error as Error).message }, { status: 400 })
    }

    const { id, title, words } = data

    if (!title && !words) {
      return Response.json({ error: 'No fields to update' }, { status: 400 })
    }

    try {
      let updatedTopic
      if (title) {
        const result = await db.update(topicsTable).set({ title }).where(eq(topicsTable.id, id)).run()

        if (result.rowsAffected === 0) {
          return Response.json({ error: 'Topic not found' }, { status: 404 })
        }

        updatedTopic = await db.select().from(topicsTable).where(eq(topicsTable.id, id)).get()
      }

      if (words && words.length > 0) {
        for (const word of words) {
          await db.update(wordsTable).set({ ru: word.ru, en: word.en }).where(eq(wordsTable.id, word.id)).run()
        }
      }

      const updatedWords = await db.select().from(wordsTable).where(eq(wordsTable.topic_id, id))

      return Response.json(
        {
          id,
          title: updatedTopic?.title ?? title,
          words: updatedWords,
        },
        { status: 200 },
      )
    } catch (error) {
      return Response.json({ error: 'Internal server error', details: (error as Error).message }, { status: 500 })
    }
  }
}
