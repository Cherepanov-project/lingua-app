import { RouterType } from '../../router'
import { DeleteWordsTranslateApi } from './api/deleteWordsTranslate'
import { GetWordsTranslateApi } from './api/getWordsTranslate'
import { GetWordsTranslateByLevelApi } from './api/getWordsTranslateByLevel'
import { PatchWordsTranslateApi } from './api/patchWordsTranslate'
import { PostWordsTranslateApi } from './api/postWordsTranslate'

export default function registerWordsTranslateRoutes(router: RouterType) {
  router.get('/api/words_translate/level/:level', GetWordsTranslateByLevelApi)
  router.get('/api/words_translate', GetWordsTranslateApi)
  router.delete('/api/words_translate/:id', DeleteWordsTranslateApi)
  router.post('/api/words_translate', PostWordsTranslateApi)
  router.patch('/api/words_translate', PatchWordsTranslateApi)
}
