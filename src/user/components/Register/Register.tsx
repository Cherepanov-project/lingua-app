import React, { useState } from 'react';
import { Container, Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation, useAuthUserMutation } from '../../features/auth/authApi';
import { setCookie } from '../../utils/cookies';
import stylesObj from '../../stylesObj';
import styles from './Register.module.scss';

const RoundedTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    ...stylesObj.RoundedTextField,
  },
});

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerUser, { isLoading, isError, data }] = useRegisterUserMutation();
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

      // localStorage.setItem('token', authResponse.access_token);
      sessionStorage.setItem('token', authResponse.access_token);
      setCookie('auth_token', authResponse.access_token);
      
      navigate('/');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  return (
    <Container sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          ...stylesObj.styleBox,
        }}
      >
        <Container>
          <Typography className={styles.title} variant="h4" color="#1976d2" gutterBottom>
            LinguaStep
          </Typography>
          <Typography className={styles.subtitle} variant="h6" color="text.secondary" gutterBottom>
            Регистрация
          </Typography>
        </Container>
        <RoundedTextField
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          autoComplete="username"
        />
        <RoundedTextField
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          autoComplete='email'
        />
        <RoundedTextField
          placeholder="Ваш пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          autoComplete="new-password"
        />
        <RoundedTextField
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
          className={styles.button}
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          Зарегистрироваться
        </Button>
        <div className={styles.links}>
          <Link to="/login" className={styles.link}>
            У вас уже есть аккаунт?<p>Войти</p>
          </Link>
        </div>
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