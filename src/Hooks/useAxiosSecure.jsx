import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://opinio-nation-server.vercel.app'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        axiosSecure.interceptors.request.use(function (config) {
            const token = localStorage.getItem('token');
            console.log(token);
            config.headers.authorization = `Bearer ${token}`;
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        axiosSecure.interceptors.response.use(
            function (response) {
                return response;
            },
            async (error) => {
                if (error.response) {
                    const status = error.response.status;
                    console.log(status);

                    if (status === 401 || status === 403) {
                        await logout();
                        navigate('/login');
                    }
                }

                return Promise.reject(error);
            }
        );
    }, [logout, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
