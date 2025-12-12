import { useGetMeQuery } from "@/features/auth/api/auth-api";

export const MainPage = () => {
  const { data } = useGetMeQuery();

  return (
    <div>
      <h1>Main page</h1>
      <div> login:{data?.login}</div>
    </div>
  );
};
