import registerSwaggerRoutes from "./apps/swagger/urls";
import { RouterType } from "./router";
import registerMatchGamesRoutes from "./apps/matchgames/urls";
import registerTruthOrLieGamesRoutes from "./apps/truthorlie/urls";
import registerPicturesRoutes from "./apps/pictures/urls";
import registerLanguagesRoutes from "./apps/languages/urls";

export function registerAllRoutes(router: RouterType) {
  registerSwaggerRoutes(router);
  registerMatchGamesRoutes(router);
  registerTruthOrLieGamesRoutes(router);
  registerPicturesRoutes(router);
  registerLanguagesRoutes(router);
}
