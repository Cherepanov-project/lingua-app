import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Box, Button, TextField, Typography, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
// import GitHubIcon from '@mui/icons-material/GitHub';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation, useAuthUserMutation } from '../../features/auth/authApi';
import { setCookie } from '../../utils/cookies';
import { stylesObj } from '../../stylesObj';

const LoginLinks = styled('div')({
  ...stylesObj.loginLinks
});

const LoginLink = styled(Link)({
  ...stylesObj.loginLink
});

const SocialButton = styled(Button)({
  margin: '8px 0',
  textTransform: 'none',
  fontSize: '1rem',
});

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerUser, { isLoading, isError, data }] = useRegisterUserMutation();
   const { loginWithRedirect } = useAuth0();
  const [authUser] = useAuthUserMutation();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      console.error('Пароли не совпадают');
      return;
    }
    try {
      await registerUser({ email, name, password }).unwrap();
      const authResponse = await authUser({ username: email, password }).unwrap();

      sessionStorage.setItem('token', authResponse.access_token);
      setCookie('auth_token', authResponse.access_token);

      navigate('/profile');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };


    const handleSocialLogin = async (connection: 'google-oauth2' | 'github') => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection,
          redirect_uri: `${window.location.origin}/auth-callback`,
          scope: 'openid profile email',
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          // prompt: 'select-account',
        },
      });
    } catch (error) {
      console.error('Ошибка социального входа:', error);
    }
  };

  
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          ...stylesObj.authBox,
        }}
      >
        <Container>
          <Typography sx={{ ...stylesObj.title }} variant="h4" color="#1976d2" gutterBottom>
            LinguaStep
          </Typography>
          <Typography sx={{ ...stylesObj.subtitle }} variant="h6" color="text.secondary" gutterBottom>
            Регистрация
          </Typography>
        </Container>

        <TextField
          sx={{ ...stylesObj.authTextField }}
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          autoComplete="username"
        />

        <TextField
          sx={{ ...stylesObj.authTextField }}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          autoComplete='email'
        />

        <TextField
          sx={{ ...stylesObj.authTextField }}
          placeholder="Ваш пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          autoComplete="new-password"
        />

        <TextField
          sx={{ ...stylesObj.authTextField }}
          placeholder="Повторите пароль"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          autoComplete="new-password"
        />

        <Button
          sx={{...stylesObj.loginButton, mt: 2 }}
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
        >
          Зарегистрироваться
        </Button>

        <Divider sx={{ my: 2 }}>или</Divider>

        <SocialButton
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={() => handleSocialLogin('google-oauth2')}
          fullWidth
        >
          Регистрация через Google
        </SocialButton>

        {/* <SocialButton
          variant="outlined"
          startIcon={<GitHubIcon />}
          onClick={() => handleSocialLogin('github')}
          fullWidth
        >
          Регистрация через GitHub
        </SocialButton> */}

        <LoginLinks >
          <LoginLink to="/login">
            У вас уже есть аккаунт?<p>Войти</p>
          </LoginLink>
        </LoginLinks>
        
        {isError && (
          <Typography color="error" sx={{ mt: 2 }}>
            Ошибка регистрации. Проверьте данные.
          </Typography>
        )}

        {data && (
          <Typography color="success" sx={{ mt: 2 }}>
            Успешная регистрация!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Register;