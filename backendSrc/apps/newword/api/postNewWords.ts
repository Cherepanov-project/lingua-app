import { OpenAPIRoute } from 'chanfana'
import { z } from 'zod'
import { drizzle } from 'drizzle-orm/d1'
import type { Env } from '../../../'
import { topicsTable, wordsTable } from '../models/NewWords'
import { eq } from 'drizzle-orm'

const RequestSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  words: z.array(
    z.object({
      id: z.number(),
      topic_id: z.number(),
      ru: z.string(),
      en: z.string(),
    }),
  ),
})

export class PostNewWordsApi extends OpenAPIRoute {
  schema = {
    tags: ['newwords'],
    summary: 'Post new words',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object' as const,
            properties: {
              id: { type: 'number' as const },
              title: { type: 'string' as const },
              words: {
                type: 'array' as const,
                items: {
                  type: 'object' as const,
                  properties: {
                    id: { type: 'number' as const },
                    topic_id: { type: 'number' as const },
                    ru: { type: 'string' as const },
                    en: { type: 'string' as const },
                  },
                  required: ['id', 'topic_id', 'ru', 'en'],
                },
              },
            },
            required: ['title', 'words'],
          },
        },
      },
    },
    responses: {
      '201': { description: 'New words was successfully posted' },
      '400': { description: 'Bad request' },
      '500': { description: 'Internal server error' },
    },
  }

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB)

    try {
      const body = await request.json()
      const { title, words } = RequestSchema.parse(body)

      const [insertedTopic] = await db.insert(topicsTable).values({ title }).returning({ id: topicsTable.id })

      for (const word of words) {
        await db.insert(wordsTable).values({
          topic_id: insertedTopic.id,
          ru: word.ru,
          en: word.en,
        })
      }

      const topic = await db.select().from(topicsTable).where(eq(topicsTable.id, insertedTopic.id)).get()

      const insertedWords = await db.select().from(wordsTable).where(eq(wordsTable.topic_id, insertedTopic.id))

      return Response.json(
        {
          message: 'Topic and words successfully created',
          topic,
          words: insertedWords,
        },
        { status: 201 },
      )
    } catch (error) {
      console.error(error)

      if (error instanceof z.ZodError) {
        return Response.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
      }

      return Response.json({ error: 'Internal server error', details: (error as Error).message }, { status: 500 })
    }
  }
}
