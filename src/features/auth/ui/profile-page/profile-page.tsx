import { useGetMeQuery } from "@/features/auth/api/auth-api";

export const ProfilePage = () => {
  const { data } = useGetMeQuery();

  return (
    <div>
      <h1>{data?.login}</h1>
    </div>
  );
};
