import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Link,
  Alert,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { stylesObj } from "../../stylesObj";
import { Notification } from "../../../shared/components/Notification";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const { loginWithRedirect, isLoading } = useAuth0();
  const { state } = useLocation();
  const [loginError, setLoginError] = useState("");
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection: "Username-Password-Authentication",
          login_hint: email,
          redirect_uri: `${window.location.origin}/auth-callback`,
          scope: "openid profile email",
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      setLoginError(`Ошибка входа: ${message}`);
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
      const message = error instanceof Error ? error.message : "";
      setLoginError(`Ошибка входа: ${message}`);
    }
  };

  return (
    <>
      {state?.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.error}
        </Alert>
      )}
      {loginError && (
        <Notification
          message={loginError}
          open={!!loginError}
          onClose={() => setLoginError("")}
        ></Notification>
      )}
      <Container
        sx={{ display: "flex", alignItems: "center", height: "100vh" }}
      >
        <Box
          sx={{ ...stylesObj.authBox }}
          component="form"
          onSubmit={handleLogin}
        >
          <Container>
            <Typography variant="h4" sx={stylesObj.title}>
              LinguaStep
            </Typography>
            <Typography variant="h6" sx={stylesObj.subtitle}>
              Вход
            </Typography>
          </Container>

          <TextField
            sx={stylesObj.authTextField}
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />

          <Button
            sx={stylesObj.loginButton}
            type="submit"
            disabled={isLoading || !email}
          >
            Войти по Email
          </Button>

          <Divider sx={{ my: 2 }}>или</Divider>

          <Button
            sx={{ margin: "8px 0", textTransform: "none", fontSize: "1rem" }}
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={() => handleSocialLogin("google-oauth2")}
            fullWidth
          >
            Войти через Google
          </Button>

          <Box sx={{ ...stylesObj.loginLinks }}>
            <Link
              component={RouterLink}
              sx={{ ...stylesObj.loginLink }}
              to="/reset-password"
            >
              Забыли пароль?
            </Link>
            <Link
              component={RouterLink}
              sx={{ ...stylesObj.loginLink }}
              to="/register"
            >
              Нет аккаунта?
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
