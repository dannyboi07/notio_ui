import axios from "axios";
// import type { AxiosError } from "axios";
import config from "../../config";

const axiosInstance = axios.create({
    baseURL: `${config.BASE_API_URL}${config.BASE_API_URI}`
});

// let refreshed = false;

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error: AxiosError) => {
//         if (error.response?.status === 401 && !refreshed) {
//             try {
//                 refreshed = true;
//                 await axiosInstance.get("/auth/refresh", {
//                     withCredentials: true
//                 });
//                 return axiosInstance.request(error.config);
//             } catch (err: AxiosError) {
//                 return Promise.reject(err);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
