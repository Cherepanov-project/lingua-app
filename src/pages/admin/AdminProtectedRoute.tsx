import { useNavigate } from "react-router-dom";
import { useGetUserRolesQuery } from "../../shared/api/usersApi";
import { getCookie } from "../../user/utils/cookies";
import { jwtDecode } from "jwt-decode";
import { AccessFail } from "../../shared/constants/textConsts";

interface AdminProtectedProps {
  children: React.ReactNode;
}

interface JwtPayload {
  sub: string;
}

const AdminProtectedRoute = ({ children }: AdminProtectedProps) => {
  const token = getCookie("auth_token");
  const navigate = useNavigate();

  let userId: string | undefined;
  let decodedToken: JwtPayload | undefined;
  if (token) {
    try {
      decodedToken = jwtDecode<JwtPayload>(token);
      userId = decodedToken.sub;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }
  const { data: userRoles, isLoading } = useGetUserRolesQuery(
    userId as string,
    { skip: !token || !userId }
  );
  if (!isLoading) {
    if (userRoles?.map((role) => role.name).includes("admin")) {
      return { children };
    } else {
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
      return (
        <h2
          style={{ color: "red", margin: "24px auto", maxWidth: "fit-content" }}
        >
          {AccessFail};
        </h2>
      );
    }
  }
};

export default AdminProtectedRoute;
