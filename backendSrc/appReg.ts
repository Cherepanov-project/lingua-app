import registerSwaggerRoutes from "./apps/swagger/urls";
import { RouterType } from "./router";
import registerMatchGamesRoutes from "./apps/matchgames/urls";
import registerTruthOrLieGamesRoutes from "./apps/truthorlie/urls";
import registerPicturesRoutes from "./apps/pictures/urls";
import registerLanguagesRoutes from "./apps/languages/urls";
import registerLevelsRoutes from "./apps/levels/urls";
import registerCoursesRoutes from "./apps/courses/urls";
import registerModulesRoutes from "./apps/modules/urls";
import registerLessonsRoutes from "./apps/lessons/urls";
import registerListeningRoutes from "./apps/listening/urls";
import registerOrthographyRoutes from "./apps/orthography/urls";
import registerNewWordsRoutes from './apps/newword/urls';
import registerGrammarRoutes from "./apps/grammar/urs";
import registerGrammarExerciseRoutes from "./apps/grammarExercises/urls";

export function registerAllRoutes(router: RouterType) {
  registerSwaggerRoutes(router);
  registerMatchGamesRoutes(router);
  registerTruthOrLieGamesRoutes(router);
  registerPicturesRoutes(router);
  registerLanguagesRoutes(router);
  registerLevelsRoutes(router);
  registerCoursesRoutes(router);
  registerModulesRoutes(router);
  registerLessonsRoutes(router);
  registerOrthographyRoutes(router);
  registerListeningRoutes(router);
  registerNewWordsRoutes(router)
  registerGrammarRoutes(router);
  registerGrammarExerciseRoutes(router);
}
