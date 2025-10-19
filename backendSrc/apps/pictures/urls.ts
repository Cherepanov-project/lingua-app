import { RouterType } from "../../router";
import { GetPicturesApi } from "../pictures/api/getPictures";
import { PostPicturesApi } from "./api/postPictures";

export default function registerPicturesApi(router: RouterType) {
  router.get("/api/pictures/", GetPicturesApi);
  router.post("/api/pictures/", PostPicturesApi);
}
