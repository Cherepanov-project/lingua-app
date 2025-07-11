import { useGetUserProfileQuery } from '../features/auth/authApi';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../utils/cookies';

interface JwtPayload {
  sub: string; // userId в JWT
}

const Profile: React.FC = () => {

  const navigate = useNavigate();

  const token = getCookie('auth_token')


  let userId: string | undefined;
  let decodedToken: JwtPayload | undefined;
  if (token) {
    try {
      decodedToken = jwtDecode<JwtPayload>(token);
      userId = decodedToken.sub;
    } catch (e) {
      console.error('Ошибка декодирования токена:', e);
    }
  }
  
  const { data: userProfile, isLoading, error } = useGetUserProfileQuery(userId as string, // 
    { skip: !token || !userId, }
  );

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error || !userProfile) {
    return <div>Ошибка загрузки профиля</div>;
  }

  const handleLogout = () => {
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