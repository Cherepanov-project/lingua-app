import { RouterType } from "../../router";
import { GetTruthOrLieGamesApi } from "./api/getTruthOrLieGames";

export default function registerTruthOrLieGamesRoutes(router: RouterType) {
  router.get("/api/truthlie", GetTruthOrLieGamesApi);
}
