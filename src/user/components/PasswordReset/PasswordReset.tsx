import React, { useState } from 'react';
import { Container, Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useResetPasswordMutation } from '../../features/auth/authApi';
import { stylesObj } from '../../stylesObj';

const LoginLinks = styled('div')({
  ...stylesObj.loginLinks
});

const LoginLink = styled(Link)({
  ...stylesObj.loginLink
});

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState('');
  const [resetPassword, { isLoading, isError, isSuccess }] = useResetPasswordMutation();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword({ email }).unwrap();
      console.log('Запрос на сброс пароля отправлен для:', email);
    } catch (error) {
      console.error('Ошибка восстановления:', error);
    }
  };

  return (
    <Container
      component="form"
      onSubmit={handleReset}
      sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}
    >
      <Box sx={{ ...stylesObj.authBox }}>
        <Container>
          <Typography sx={{ ...stylesObj.title }} variant="h4" color="#1976d2" gutterBottom>
            LinguaStep
          </Typography>
          <Typography sx={{ ...stylesObj.subtitle, fontSize: '1.5rem', marginBottom: 0 }} variant="h6" color="text.secondary" gutterBottom>
            Восстановление пароля
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
          variant="outlined"
        />
        <Button
          sx={{ ...stylesObj.loginButton,  mt: 2  }}
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
        >
          Отправить
        </Button>

        <LoginLinks>
          <LoginLink to="/login">
            Вернуться к входу
          </LoginLink>
        </LoginLinks>

        {isError && (
          <Typography color="error" sx={{ mt: 2 }}>
            Ошибка при отправке запроса. Проверьте email.
          </Typography>
        )}
        {isSuccess && (
          <Typography color="success" sx={{ mt: 2 }}>
            Письмо для сброса пароля отправлено!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default PasswordReset;