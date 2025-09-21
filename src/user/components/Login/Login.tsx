import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  styled,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
// import GitHubIcon from '@mui/icons-material/GitHub';
import { useAuthUserMutation } from "../../features/auth/authApi";
import { setCookie } from "../../utils/cookies";
import { stylesObj } from "../../stylesObj";

const LoginLinks = styled("div")({
  ...stylesObj.loginLinks,
});

const LoginLink = styled(Link)({
  ...stylesObj.loginLink,
});

const SocialButton = styled(Button)({
  margin: "8px 0",
  textTransform: "none",
  fontSize: "1rem",
});

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authUser, { isLoading, isError }] = useAuthUserMutation();
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authUser({ username: email, password }).unwrap();
      setCookie("auth_token", response.access_token);
      navigate("/profile");
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };

  const handleSocialLogin = async (connection: "google-oauth2" | "github") => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection,
          redirect_uri: `${window.location.origin}/auth-callback`,
          scope: "openid profile email",
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
    } catch (error) {
      console.error("Ошибка социального входа:", error);
    }
  };

  return (
    <Container sx={{ display: "flex", alignItems: "center", height: "100vh" }}>
      <Box
        sx={{ ...stylesObj.authBox }}
        component="form"
        onSubmit={handleLogin}
      >
        <Container>
          <Typography
            variant="h4"
            sx={{
              ...stylesObj.title,
            }}
          >
            LinguaStep
          </Typography>
          <Typography
            variant="h6"
            sx={{
              ...stylesObj.subtitle,
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

        <Button
          sx={{ ...stylesObj.loginButton }}
          type="submit"
          disabled={isLoading}
        >
          Войти
        </Button>

        <Divider sx={{ my: 2 }}>или</Divider>

        <SocialButton
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={() => handleSocialLogin("google-oauth2")}
          fullWidth
        >
          Войти через Google
        </SocialButton>

        {/* <SocialButton
          variant="outlined"
          startIcon={<GitHubIcon />}
          onClick={() => handleSocialLogin('github')}
          fullWidth
        >
          Войти через GitHub
        </SocialButton> */}

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
