// import { useAuth0 } from '@auth0/auth0-react';
import { useGetUserProfileQuery } from '../features/auth/authApi';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import { getCookie, removeCookie } from '../utils/cookies';

interface JwtPayload {
  sub: string; // userId в JWT
}

const Profile: React.FC = () => {

  const navigate = useNavigate();

  // const [mswReady, setMswReady] = useState(false);

  // useEffect(() => {
  //   if (window.__MSW_STARTED__) {
  //     setMswReady(true);
  //   } else {
  //     const interval = setInterval(() => {
  //       if (window.__MSW_STARTED__) {
  //         setMswReady(true);
  //         clearInterval(interval);
  //       }
  //     }, 100);
  //     return () => clearInterval(interval);
  //   }
  // }, []);

  // const token = localStorage.getItem('token');
  const token = getCookie('auth_token')
  if (!token) {
    return <Navigate to="/login" />;
  }

  const decodedToken = jwtDecode<JwtPayload>(token);
  const userId = decodedToken.sub; // userId из access_token
  console.log(decodedToken.sub); // "auth0|658a1c2f3b4d5e6f78901234"
  const { data: userProfile, isLoading, error } = useGetUserProfileQuery(userId, // 
  // { skip: !mswReady, }
);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error || !userProfile) {
    return <div>Ошибка загрузки профиля</div>;
  }

  const handleLogout = () => {
    // localStorage.removeItem('token');
    removeCookie('auth_token');
    navigate('/login');
  };

  return (
    <div>
      <h2>Профиль</h2>
      <p>Email: {userProfile.email}</p>
      <p>Имя: {userProfile.name}</p>
      {userProfile.picture && <img src={userProfile.picture} alt="Аватар" />}
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default Profile;