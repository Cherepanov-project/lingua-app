import { useAuth0 } from "@auth0/auth0-react";
import { useGetUserMetaQuery } from "../../../shared/api/usersApi";

type Meta = {
  language: string;
  level: string;
};

export const useUserMeta = () => {
  const { user, isAuthenticated } = useAuth0();
  const userId = user?.sub ?? "";
  const { data, isFetching, isLoading } = useGetUserMetaQuery(userId, {
    skip: !isAuthenticated || !user?.sub,
  });

  const meta = data?.user_metadata as Meta | undefined;

  return { meta, isFetching, isLoading, userId };
};
