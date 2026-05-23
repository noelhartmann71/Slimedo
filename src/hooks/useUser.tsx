import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: user = null,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["user-detail"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/user-detail");
      // console.log("User Detail Data:", data);
      return data.data;
    },
    enabled: !!localStorage.getItem("token"),
    retry: 1,
  });

  return { user, isLoading, isError, refetch };
};

export default useUser;
