import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import App from "./App.tsx";
import Courses from "./pages/admin/Courses.tsx";
import CreateCourse from "./pages/admin/CreateCourse.tsx";
import Course from "./pages/admin/Course.tsx";
import EditModule from "./pages/admin/EditModule.tsx";
import EditLesson from "./pages/admin/EditLesson.tsx";
import ListeningExercise from "./pages/admin/ListeningExercise.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/:id" element={<Course />} />
          <Route
            path="/course/:courseId/module/:moduleId"
            element={<EditModule />}
          />
          <Route
            path="/course/:courseId/module/:moduleId/lesson/:lessonId"
            element={<EditLesson />}
          />
          <Route
            path="/course/:courseId/module/:moduleId/lesson/:lessonId/listening"
            element={<ListeningExercise />}
          />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
