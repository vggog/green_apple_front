import axios from "axios";

export const API_URL = "http://localhost:8000";

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return config;
})


api.interceptors.response.use(
    (res) => {return res},
    async (error) => {
        const originalConfig = error.config;

        if (error.response) {
            if (error.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                const rs = await api.get("/admin/auth/refresh");
        
                const accessToken = rs.data.access_token;
                localStorage.removeItem("token");
                localStorage.setItem("token", accessToken);
        
                return api(originalConfig);
            }        
        }
    }
)


export default api;
