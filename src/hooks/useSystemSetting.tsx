import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "./useAxiosPublic";

const useSystemSetting = () => {
  const {
    data: settings = null,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["system-setting"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/system-setting");
      return data.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  return { settings, isLoading, isError, refetch };
};

export default useSystemSetting;
