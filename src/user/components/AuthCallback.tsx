import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { setCookie } from "../utils/cookies";

const AuthCallback: React.FC = () => {
  const { getAccessTokenSilently, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = await getAccessTokenSilently();
        setCookie("auth_token", token);
        navigate("/profile");
      } catch (error) {
        console.error("Ошибка обработки callback:", error);
        navigate("/login");
      }
    };

    if (!isLoading) {
      handleCallback();
    }
  }, [isLoading, getAccessTokenSilently, navigate]);

  return <div>Обработка входа...</div>;
};

export default AuthCallback;
