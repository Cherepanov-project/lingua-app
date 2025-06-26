import { useAuth0 } from '@auth0/auth0-react';
import { useGetUserProfileQuery } from '../features/auth/authApi';

const Profile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const { data: userProfile, isLoading } = useGetUserProfileQuery(user?.sub ?? '', {
    skip: !isAuthenticated,
  });

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (isLoading || !userProfile) {
    return <div>Загрузка...</div>;
  }

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