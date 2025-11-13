import { RouterType } from "../../router";
import { DeleteGrammarExercisesApi } from "./api/deleteGrammarExercises";
import { GetGrammarExerciseApi } from "./api/getGrammarExercises";
import { GetGrammarExercisesByLevelApi } from "./api/getGrammarExercisesByLevel";
import { PatchGrammarExercisesApi } from "./api/patchGrammarExercises";
import { PostGrammarExercisesApi } from "./api/postGrammarExercises";

export default function registerGrammarExerciseRoutes(router: RouterType) {
  router.get("/api/grammar-exercises", GetGrammarExerciseApi);
  router.delete("/api/grammar-exercises/:id", DeleteGrammarExercisesApi)
  router.post("/api/grammar-exercises", PostGrammarExercisesApi);
  router.patch("/api/grammar-exercises", PatchGrammarExercisesApi);
  router.get("/api/grammar-exercises/level/:level", GetGrammarExercisesByLevelApi);
}