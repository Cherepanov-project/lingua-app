import { Route, Routes } from "react-router-dom";
import Auth0ProviderWithNavigate from "./user/auth0/auth0-provider";
import Login from "./user/components/Login/Login";
import Register from "./user/components/Register/Register";
import AuthCallback from "./user/components/AuthCallback";
import ProtectedRoute from "./user/components/ProtectedRoute";
import PasswordReset from "./user/components/PasswordReset/PasswordReset";
import HomePage from "./pages/HomePage";
import Courses from "./pages/admin/Courses.tsx";
import CreateCourse from "./pages/admin/CreateCourse.tsx";
import Course from "./pages/admin/Course.tsx";
import EditModule from "./pages/admin/EditModule.tsx";
import EditLesson from "./pages/admin/EditLesson.tsx";
import ListeningExercise from "./pages/admin/ListeningExercise.tsx";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { authTheme } from "./user/stylesObj";
import { ProfileLayout } from "./user/components/ProfileLayout/ProfileLayout.tsx";
import { ProfileCoursesPage } from "./user/components/ProfilePages/ProfileCoursesPage.tsx";
import { ProfilePage } from "./user/components/ProfilePages/ProfilePage.tsx";
import { ProfileExercisesPage } from "./user/components/ProfilePages/ProfileExercisesPage.tsx";
import { ProfileGrammarPage } from "./user/components/ProfilePages/ProfileGrammarPage.tsx";
import { ProfileGamesPage } from "./user/components/ProfilePages/ProfileGamesPage.tsx";
import { ProfileSettingsPage } from "./user/components/ProfilePages/ProfileSettingsPage.tsx";
import { GamesLayout } from "./user/components/GamesLayout/GamesLayout.tsx";
import { MatchGame } from "./user/components/Profile/MatchGame.tsx";
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute.tsx";
import AdminContent from "./pages/admin/adminComponents/AdminContent.tsx";
import AdminHome from "./pages/admin/AdminHome.tsx";
import Users from "./pages/admin/Users.tsx";
import Pictures from "./pages/admin/Pictures.tsx";
import Reviews from "./pages/admin/Reviews.tsx";

const App: React.FC = () => {
  return (
    <Auth0ProviderWithNavigate>
      <ThemeProvider theme={authTheme}>
        <CssBaseline>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<ProfilePage />} />
              <Route path="courses" element={<ProfileCoursesPage />} />
              <Route path="exercises" element={<ProfileExercisesPage />} />
              <Route path="grammar" element={<ProfileGrammarPage />} />
              <Route path="games" element={<ProfileGamesPage />} />
              <Route path="settings" element={<ProfileSettingsPage />} />
            </Route>
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/auth-callback" element={<AuthCallback />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/create" element={<CreateCourse />} />
            <Route path="/course/:id" element={<Course />} />
            <Route path="/games" element={<GamesLayout />}>
              <Route path="matchgame" element={<MatchGame />} />
            </Route>

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
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminProtectedRoute>
                    <AdminContent />
                  </AdminProtectedRoute>
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminHome />} />
              <Route path="users" element={<Users />} />
              <Route path="courses" element={<Courses />} />
              <Route path="games" element={<div>Игры</div>} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="stats" element={<div>Статистика</div>} />
              <Route path="settings" element={<div>Настройки</div>} />
              <Route path="pictures" element={<Pictures />} />
            </Route>
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </Auth0ProviderWithNavigate>
  );
};

export default App;
