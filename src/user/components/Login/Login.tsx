import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { Container, Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import stylesObj from '../../stylesObj';
import { useAuthUserMutation } from '../../features/auth/authApi';
import { setCookie } from '../../utils/cookies';
import styles from './Login.module.scss';

const RoundedTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    ...stylesObj.RoundedTextField,
  },
});

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authUser, { isLoading, isError, data }] = useAuthUserMutation();
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authUser({ username: email, password }).unwrap();
      // console.log('Токен получен:', response.access_token);
      // localStorage.setItem('token', response.access_token);
      setCookie('auth_token', response.access_token);
      navigate('/profile')
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <Container sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          ...stylesObj.styleBox,
        }}
      >
        <Container>
          <Typography className={styles.title} variant="h4" color="#1976d2" gutterBottom>
            LinguaStep
          </Typography>
          <Typography className={styles.subtitle} variant="h6" color="text.secondary" gutterBottom>
            Вход
          </Typography>
        </Container>
        <RoundedTextField
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          autoComplete="username"
        />
        <RoundedTextField
          placeholder="Ваш пароль"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          autoComplete="current-password"
        />
        <Button
          className={styles.button}
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          Войти
        </Button>
        <div className={styles.links}>
          <Link to="/reset-password" className={styles.link}>
            Забыли пароль?
          </Link>
          <Link to="/register" className={styles.link}>
            Нет аккаунта?
          </Link>
        </div>
        {isError && (
          <Typography color="error" sx={{ mt: 2 }}>
            Ошибка входа. Проверьте данные.
          </Typography>
        )}
        {data && (
          <Typography color="success" sx={{ mt: 2 }}>
            Успешный вход!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Login;