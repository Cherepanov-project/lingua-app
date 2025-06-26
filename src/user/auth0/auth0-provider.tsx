import { Auth0Provider } from '@auth0/auth0-react';
// import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Auth0ProviderWithNavigateProps {
  children: ReactNode;
}

const Auth0ProviderWithNavigate: React.FC<Auth0ProviderWithNavigateProps> = ({ children }) => {
  // const navigate = useNavigate();

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      // clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID_SPA} // SPA
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;