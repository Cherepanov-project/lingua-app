import { Route, Routes } from 'react-router-dom';
import Auth0ProviderWithNavigate from './user/auth0/auth0-provider';
import Login from './user/components/Login/Login';
import Register from './user/components/Register/Register';
import Profile from './user/components/Profile';
import ProtectedRoute from './user/components/ProtectedRoute';
import PasswordReset from './user/components/PasswordReset/PasswordReset';

const App: React.FC = () => {
  return (
    <Auth0ProviderWithNavigate>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password" element={<PasswordReset />} />
      </Routes>
    </Auth0ProviderWithNavigate>
  );
};

export default App;