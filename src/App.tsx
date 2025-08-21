import { Route, Routes } from "react-router-dom";
import Auth0ProviderWithNavigate from "./user/auth0/auth0-provider";
import Login from "./user/components/Login/Login";
import Register from "./user/components/Register/Register";
import Profile from "./user/components/Profile/Profile";
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
import AdminPanel from './pages/AdminPanel';

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
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/auth-callback" element={<AuthCallback />} />
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
            <Route path='/admin/*' element={<AdminPanel />} />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </Auth0ProviderWithNavigate>
  );
};

export default App;
