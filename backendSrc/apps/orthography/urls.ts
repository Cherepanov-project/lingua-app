import { RouterType } from '../../router';
import { getOrthographyExerciseApi } from './api/getOrthographyExerciseApi';

export default function registerOrthographyRoutes(router: RouterType) {
  router.get('/api/orthography/words', getOrthographyExerciseApi);
}
