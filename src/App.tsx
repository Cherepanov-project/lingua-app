import { Route, Routes } from 'react-router-dom';
import Auth0ProviderWithNavigate from './user/auth0/auth0-provider';
import Login from './user/components/Login/Login';
import Register from './user/components/Register/Register';
import Profile from './user/components/Profile/Profile';
import AuthCallback from './user/components/AuthCallback';
import ProtectedRoute from './user/components/ProtectedRoute';
import PasswordReset from './user/components/PasswordReset/PasswordReset';
import HomePage from "./pages/HomePage";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { authTheme } from './user/stylesObj';
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
            <Route path='/auth-callback' element={<AuthCallback />} />
            <Route path='/admin' element={<AdminPanel />} />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </Auth0ProviderWithNavigate>
  );
};

export default App;