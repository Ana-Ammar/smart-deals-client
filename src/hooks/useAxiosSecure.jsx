import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const axiosInstanceSecure = axios.create({
  baseURL: "https://smart-deals-server-beige.vercel.app", 
});
const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate()
  // set token to every requset when use this hook
  useEffect(() => {
    const requestInterceptor = axiosInstanceSecure.interceptors.request.use(
      (config) => {
        const token = user.accessToken  ;
        if(token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    const responseInterceptor = axiosInstanceSecure.interceptors.response.use((res) => {
        return res;
    }, (err) => {
        const status = err.status;
        if(status === 401 || status === 403) {
            signOutUser()
            .then(() => {
                navigate('/login')
            })
        }
    })

    return() => {
        axiosInstanceSecure.interceptors.request.eject(requestInterceptor)
        axiosInstanceSecure.interceptors.response.eject(responseInterceptor)
    }
  }, [user, navigate, signOutUser]);
  return axiosInstanceSecure;
};

export default useAxiosSecure;
