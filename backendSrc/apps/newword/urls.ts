import { RouterType } from "../../router";
import { DeleteNewWordsApi } from "./api/deleteNewWords";
import { GetNewWordsApi } from "./api/getNewWords";
import { PatchNewWordsApi } from "./api/patchNewWords";
import { PostNewWordsApi } from "./api/postNewWords";

export default function registerNewWordsRoutes(router: RouterType) {
  router.get("/api/new-words/", GetNewWordsApi);
  router.delete("/api/new-words/:id", DeleteNewWordsApi)
  router.patch("/api/new-words/", PatchNewWordsApi)
  router.post("/api/new-words/", PostNewWordsApi)
}