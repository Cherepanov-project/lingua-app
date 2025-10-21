import { RouterType } from "../../router";
import { DeleteTruthOrLieGamesApi } from "./api/deleteTruthOrLieGame";
import { GetTruthOrLieGamesApi } from "./api/getTruthOrLieGames";
import { PatchTruthOrLieGamesApi } from "./api/patchTruthOrLieGame";
import { PostTruthOrLieGamesApi } from "./api/postTruthOrLieGames";

export default function registerTruthOrLieGamesRoutes(router: RouterType) {
  router.get("/api/truthlie", GetTruthOrLieGamesApi);
  router.post("/api/truthlie", PostTruthOrLieGamesApi);
  router.delete("/api/truthlie/:id", DeleteTruthOrLieGamesApi);
  router.patch("/api/truthlie/", PatchTruthOrLieGamesApi);
}
