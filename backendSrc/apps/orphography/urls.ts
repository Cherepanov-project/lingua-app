import { RouterType } from "../../router";
import { GetOrphographiesApi } from "./api/getOrphographies";

export default function registerOrphographiesRoutes(router: RouterType) {
  router.get("/api/orphography/", GetOrphographiesApi);
}
