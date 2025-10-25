import { RouterType } from "../../router";
import { GetListeningExercisesApi } from "./api/getListeningExercises";
import { GetListeningExerciseApi } from "./api/getListeningExercise";
import { UpdateListeningProgressApi } from "./api/updateListeningProgress";

export default function registerListeningRoutes(router: RouterType) {
  router.get("/api/listening/exercises", GetListeningExercisesApi);
  router.get("/api/listening/exercise", GetListeningExerciseApi);
  router.post("/api/listening/progress", UpdateListeningProgressApi);
}