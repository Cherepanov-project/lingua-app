import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Button, 
  TextField, 
  Typography,
  styled 
} from '@mui/material';
import { useAuthUserMutation } from '../../features/auth/authApi';
import { setCookie } from '../../utils/cookies';
import { stylesObj} from '../../stylesObj';

const LoginLinks = styled('div')({
  ...stylesObj.loginLinks
});

const LoginLink = styled(Link)({
  ...stylesObj.loginLink
});

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authUser, { isLoading, isError }] = useAuthUserMutation();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authUser({ username: email, password }).unwrap();
      setCookie('auth_token', response.access_token);
      navigate('/profile');
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <Container sx={{ display: 'flex', alignItems: 'center', height: '100vh',  }}>
      <Box sx={{...stylesObj.authBox}} component="form" onSubmit={handleLogin}>
        <Container>
          <Typography 
            variant="h4" 
            sx={{ 
              ...stylesObj.title
            }}
          >
            LinguaStep
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
            ...stylesObj.subtitle
            }}
          >
            Вход
          </Typography>
        </Container>

        <TextField
          sx={{ ...stylesObj.authTextField }}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          sx={{ ...stylesObj.authTextField }}
          placeholder="Ваш пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button sx={{ ...stylesObj.loginButton }} type="submit" disabled={isLoading}>
          Войти
        </Button>

        <LoginLinks>
          <LoginLink to="/reset-password">Забыли пароль?</LoginLink>
          <LoginLink to="/register">Нет аккаунта?</LoginLink>
        </LoginLinks>

        {isError && (
          <Typography color="error" sx={{ mt: 2 }}>
            Ошибка входа. Проверьте данные.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Login;