import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { setCookie } from '../utils/cookies'
import { ProgressBar } from '../../shared/components/ProgressBar'

const AuthCallback: React.FC = () => {
  const { getAccessTokenSilently, isLoading, user } = useAuth0()
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = await getAccessTokenSilently()
        setCookie('auth_token', token)

        const isGoogle = user?.sub?.startsWith('google-oauth2|')
        const isNewUser = user?.['https://linguaapp/new_user']

        if (isGoogle && isNewUser) {
          navigate('/profile/after-login', { replace: true })
        } else {
          navigate('/profile', { replace: true })
        }
      } catch {
        navigate('/login', {
          replace: true,
          state: { error: 'Ошибка обработки callback' },
        })
      }
    }

    if (!isLoading) handleCallback()
  }, [isLoading, getAccessTokenSilently, navigate, user])

  return <ProgressBar />
}

export default AuthCallback
