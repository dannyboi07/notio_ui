import axios from "axios";
import config from "../../config";

const axiosInstance = axios.create({
    baseURL: `${config.BASE_API_URL}${config.BASE_API_URI}`
});

export default axiosInstance;
