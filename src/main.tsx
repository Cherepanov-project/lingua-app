import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import { worker } from './user/mocks/browser';
import { store } from './store/store';
import { StyledEngineProvider } from '@mui/material';
import { getCookie, setCookie } from './user/utils/cookies';

import './user/variables.scss';

// worker.start({
//   serviceWorker: { url: '/mockServiceWorker.js' },
//   options: { scope: '/' }, // Важно!
//   onUnhandledRequest: 'bypass',
//   // onUnhandledRequest: (req) => {
//   //   if (req.url.includes('auth0.com')) return 'bypass'; // Пропускаем запросы к Auth0
//   //   console.warn('Unhandled:', req.method, req.url);
//   // },
// }).then(() => {
//   console.log('MSW started')
//   // window.__USE_MOCKS__ = true; 
//   window.__MSW_STARTED__ = true;
// }
// );


const fetchManagementToken = async () => {
  try {
    const response = await fetch('https://dev-vsjevx5h8rqzm6di.us.auth0.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
        client_secret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        grant_type: 'client_credentials',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    // ! why!!! it is no set 
    setCookie('management_token', data.access_token, 1); 
    // ! for registration
    localStorage.setItem('management_token', data.access_token);

    console.log('Management token:', getCookie('management_token'));
    return true;
  } catch (error) {
    console.error('Ошибка получения токена:', error);
    return false;
  }
};


fetchManagementToken().then((success) => {
  if (success) {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </StyledEngineProvider>
    );
  } else {
    console.error('Не удалось загрузить приложение: management_token не получен');
  }
});