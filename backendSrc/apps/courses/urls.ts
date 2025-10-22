import { RouterType } from "../../router";
import { DeleteCoursesApi } from "./api/deleteCourse";
import { GetCoursesApi } from "./api/getCourses";
import { PatchCoursesApi } from "./api/patchCourse";
import { PostCoursesApi } from "./api/postCourses";

export default function registerCoursesRoutes(router: RouterType) {
  router.get("/api/courses/", GetCoursesApi);
  router.post("/api/courses/", PostCoursesApi);
  router.delete("/api/courses/:id", DeleteCoursesApi);
  router.patch("/api/courses/", PatchCoursesApi);
}
