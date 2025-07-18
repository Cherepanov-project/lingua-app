import { Auth0Provider } from '@auth0/auth0-react';
import type { ReactNode } from 'react';

interface Auth0ProviderWithNavigateProps {
  children: ReactNode;
}

const Auth0ProviderWithNavigate: React.FC<Auth0ProviderWithNavigateProps> = ({ children }) => {

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      // clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID_SPA} // SPA
      authorizationParams={{
        // redirect_uri: window.location.origin,
        redirect_uri: window.location.origin + '/auth-callback',
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: 'openid profile email', // scope for social logins
        connection_scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;