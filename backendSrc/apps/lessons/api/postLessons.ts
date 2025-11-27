import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { lessonsTable } from "../models/Lesson";
import { drizzle } from "drizzle-orm/d1";
import type { Env } from "../../..";

const RequestSchema = z.object({
  id: z.string(),
  name: z.string(),
  exercises: z.array(z.string()),
  listening: z.array(z.string()),
  grammar_exercises: z.array(z.string()),
  orthography: z.array(z.string()),
  newWords: z.array(z.string()),
  reading: z.array(z.string()),
});

export class PostLessonsApi extends OpenAPIRoute {
  schema = {
    tags: ["lessons"],
    summary: "Create new lesson",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              id: { type: "string" as const },
              name: { type: "string" as const },

              exercises: {
                type: "array" as const,
                items: { type: "string" as const },
              },

              listening: {
                type: "array" as const,
                items: { type: "string" as const },
              },

              grammar_exercises: {
                type: "array" as const,
                items: { type: "string" as const },
              },

              orthography: {
                type: "array" as const,
                items: { type: "string" as const },
              },

              newWords: {
                type: "array" as const,
                items: { type: "string" as const },
              },

              reading: {
                type: "array" as const,
                items: { type: "string" as const },
              },
            },
            required: [
              "id",
              "name",
              "exercises",
              "listening",
              "grammar_exercises",
              "orthography",
              "newWords",
              "reading",
            ],
          },
        },
      },
    },
  };

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB);

    try {
      const body = RequestSchema.parse(await request.json());

      await db.insert(lessonsTable).values({
        id: body.id,
        name: body.name,

        exercises: JSON.stringify(body.exercises),
        listening: JSON.stringify(body.listening),
        grammar_exercises: JSON.stringify(body.grammar_exercises),
        orthography: JSON.stringify(body.orthography),
        newWords: JSON.stringify(body.newWords),
        reading: JSON.stringify(body.reading),
      });

      const inserted = await env.DB.prepare(
        "SELECT * FROM lessons_table WHERE id = ?"
      )
        .bind(body.id)
        .first<{
          id: string;
          name: string;
          exercises: string;
          listening: string;
          grammar_exercises: string;
          orthography: string;
          newWords: string;
          reading: string;
        }>();

      if (!inserted) {
        throw new Error("Failed to fetch inserted lesson");
      }

      const response = {
        ...inserted,
        exercises: JSON.parse(inserted.exercises),
        listening: JSON.parse(inserted.listening),
        grammar_exercises: JSON.parse(inserted.grammar_exercises),
        orthography: JSON.parse(inserted.orthography),
        newWords: JSON.parse(inserted.newWords),
        reading: JSON.parse(inserted.reading),
      };

      return Response.json(response, { status: 201 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return Response.json(
          { error: "Validation failed", details: error.errors },
          { status: 400 }
        );
      }

      return Response.json(
        { error: "Internal server error", details: String(error) },
        { status: 500 }
      );
    }
  }
}
