import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'
import { StyledEngineProvider } from '@mui/material'
// import { getCookie, setCookie } from './user/utils/cookies';
import { getCookie } from './user/utils/cookies'
import App from './App'

import './user/variables.scss'

const fetchManagementToken = async () => {
  try {
    const response = await fetch('auth0/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
        client_secret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        grant_type: 'client_credentials',
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`
      )
    }

    const data = await response.json()
    sessionStorage.setItem('management_token', data.access_token)
    console.log('Management token:', getCookie('management_token'))
    return true
  } catch (error) {
    console.error('Ошибка получения токена:', error)
    return false
  }
}

// fetchManagementToken().then((success) => {
//   if (success) {
//     ReactDOM.createRoot(document.getElementById('root')!).render(
//       <StrictMode>
//         <StyledEngineProvider injectFirst>
//           <Provider store={store}>
//             <BrowserRouter>
//               <App />
//             </BrowserRouter>
//           </Provider>
//         </StyledEngineProvider>
//       </StrictMode>
//     );
//   } else {
//     console.error('Не удалось загрузить приложение: management_token не получен');
//   }
// })

fetchManagementToken().then((success) => {
  if (success) {
    console.log('Попытка получения токена управления завершена (возможно, успешно).')
  } else {
    console.log(
      'Не удалось получить токен управления. Приложение будет отображаться в любом случае. Это может повлиять на функции, использующие API управления.'
    )
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </StyledEngineProvider>
    </StrictMode>
  )
})
