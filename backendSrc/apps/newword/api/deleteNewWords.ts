import { IRequest } from 'itty-router'
import { OpenAPIRoute } from 'chanfana'
import { z } from 'zod'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import type { Env } from '../../..'
import { topicsTable, wordsTable } from '../models/NewWords'

const DeleteWordsSchema = z.object({
  id: z.string().regex(/^\d+$/, 'id is number'),
})

export class DeleteNewWordsApi extends OpenAPIRoute {
  async handle(request: IRequest, env: Env) {
    const db = drizzle(env.DB)
    const params = DeleteWordsSchema.safeParse(request.params)

    if (!params.success) {
      return Response.json({ error: 'Invalid request params', details: params.error.errors }, { status: 400 })
    }

    const newWordsId = Number(params.data.id)

    try {
      await db.delete(wordsTable).where(eq(wordsTable.topic_id, newWordsId)).run();
      const result = await db.delete(topicsTable).where(eq(topicsTable.id, newWordsId)).run();

      if (result.rowsAffected === 0) {
        return Response.json({ error: "Topic not found" }, { status: 404 });
      }

      return Response.json({ success: true, deleted: result.rowsAffected }, { status: 200 });
    } catch (error) {
      return Response.json(
        { error: "Internal server error", details: (error as Error).message },
        { status: 500 }
      );
    }
  }
}
