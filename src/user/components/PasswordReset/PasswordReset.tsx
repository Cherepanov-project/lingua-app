import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useResetPasswordMutation } from '../../features/auth/authApi';
import styles from './PasswordReset.module.scss';
import stylesObj from '../../stylesObj';

const RoundedTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    ...stylesObj.RoundedTextField,
  },
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
      <Box sx={{ ...stylesObj.styleBox }}>
        <Container>
          <Typography className={styles.title} variant="h4" color="#1976d2" gutterBottom>
            LinguaStep
          </Typography>
          <Typography className={styles.subtitle} variant="h6" color="text.secondary" gutterBottom>
            Восстановление пароля
          </Typography>
        </Container>
        <RoundedTextField
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button
          className={styles.button}
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          Отправить
        </Button>
        <Link to="/login" className={styles.link}>
          Вернуться к входу
        </Link>
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