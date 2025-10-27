import { OpenAPIRoute } from 'chanfana';
import { drizzle } from 'drizzle-orm/d1';
import { orthographyExercise, orthographyExerciseSchema } from '../models/Orthography';
import type { Env } from '../../../';

export class getOrthographyExerciseApi extends OpenAPIRoute {
  schema = {
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: orthographyExerciseSchema,
          },
        },
      },
      404: {
        description: 'Not Found',
      },
    },
  };

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB);

    const rows = await db.select().from(orthographyExercise).all();

    const data = rows.map((row) => ({
      id: row.id,
      word: row.word,
      imageUrl: row.image_url,
      description: row.description,
    }));

    return Response.json(data);
  }
}
