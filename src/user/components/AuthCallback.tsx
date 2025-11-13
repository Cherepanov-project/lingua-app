import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { setCookie } from "../utils/cookies";

const AuthCallback: React.FC = () => {
  const { getAccessTokenSilently, isLoading, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = await getAccessTokenSilently();
        setCookie("auth_token", token);

        const isGoogle = user?.sub?.startsWith("google-oauth2|");
        const isNewUser = user?.["https://linguaapp/new_user"];
        console.log("🔎 isGoogle:", isGoogle, "isNewUser:", isNewUser);

        if (isGoogle && isNewUser) {
          console.log(
            "Новый пользователь Google redirect to /profile/after-login"
          );
          navigate("/profile/after-login", { replace: true });
        } else {
          console.log("Обычный вход redirect to /profile");
          navigate("/profile", { replace: true });
        }
      } catch (error) {
        console.error("❌ Ошибка обработки callback:", error);
        navigate("/login", { replace: true });
      }
    };

    if (!isLoading) handleCallback();
  }, [isLoading, getAccessTokenSilently, navigate, user]);

  return <div>Обработка входа...</div>;
};

export default AuthCallback;
