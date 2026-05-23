import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,

  headers: {
    "Content-type": "application/json",
  },
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
