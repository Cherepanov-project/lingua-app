import { RouterType } from "../../router";
import { GetLevelsApi } from "./api/getLevels";

export default function registerLevelsRoutes(router: RouterType) {
  router.get("/api/levels/", GetLevelsApi);
}
