import registerSwaggerRoutes from "./apps/swagger/urls";
import { RouterType } from "./router";
import registerMatchGamesRoutes from "./apps/matchgames/urls";
import registerTruthOrLieGamesRoutes from "./apps/truthorlie/urls";

export function registerAllRoutes(router: RouterType) {
  registerSwaggerRoutes(router);
  registerMatchGamesRoutes(router);
  registerTruthOrLieGamesRoutes(router);
}
