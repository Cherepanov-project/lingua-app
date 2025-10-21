import { RouterType } from "../../router";
import { GetLanguagesApi } from "./api/getLanguages";

export default function registerLanguagesRoutes(router: RouterType) {
  router.get("/api/languages/", GetLanguagesApi);
}
