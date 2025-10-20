import { RouterType } from "../../router";
import { DeleteModulesApi } from "./api/deleteModule";
import { GetModulesApi } from "./api/getModules";
import { PatchModulesApi } from "./api/patchModule";
import { PostModulesApi } from "./api/postModules";

export default function registerModulesRoutes(router: RouterType) {
  router.get("/api/modules/", GetModulesApi);
  router.post("/api/modules/", PostModulesApi);
  router.delete("/api/modules/:id", DeleteModulesApi);
  router.patch("/api/modules/", PatchModulesApi);
}
