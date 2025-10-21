import { RouterType } from "../../router";
import { DeleteLessonsApi } from "./api/deleteLesson";
import { GetLessonsApi } from "./api/getLessons";
import { PostLessonsApi } from "./api/postLessons";

export default function registerLessonsRoutes(router: RouterType) {
  router.get("/api/lessons/", GetLessonsApi);
  router.post("/api/lessons/", PostLessonsApi);
  router.delete("/api/lessons/:id", DeleteLessonsApi);
}
