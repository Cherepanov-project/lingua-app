import { RouterType } from "../../router";
import { GetGrammarApi } from "./api/getGrammar";
import { PostGrammarApi } from "./api/postGrammar";
import { DeleteGrammarApi } from "./api/deleteGrammar";
import { PatchGrammarApi } from "./api/patchGrammar";

export default function registerGrammarRoutes(router: RouterType) {
  router.get("/api/grammar/", GetGrammarApi);
  router.post("/api/grammar/", PostGrammarApi);
  router.delete("/api/grammar/:id", DeleteGrammarApi);
  router.patch("/api/grammar/:id", PatchGrammarApi);
}
