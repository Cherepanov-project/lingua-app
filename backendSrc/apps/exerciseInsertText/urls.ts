import { RouterType } from "../../router";
import { DeleteExerciseInsertTextApi } from "./api/deleteExerciseInsertText";
import { GetExerciseInsertTextApi } from "./api/getExerciseInsertText";
import { GetExerciseInsertTextByLevelApi } from "./api/getexerciseInsertTextByLevel";
import { PatchExerciseInsertTextApi } from "./api/patchExerciseInsertText";
import { PostExerciseInsertTextApi } from "./api/postExerciseInsertText";

export default function registerExerciseInsertTextRoutes(router: RouterType) {
  router.get("/api/insert-text/level/:level", GetExerciseInsertTextByLevelApi);
  router.get("/api/insert-text", GetExerciseInsertTextApi);
  router.delete("/api/insert-text/:id", DeleteExerciseInsertTextApi)
  router.post("/api/insert-text", PostExerciseInsertTextApi);
  router.patch("/api/insert-text", PatchExerciseInsertTextApi);
}