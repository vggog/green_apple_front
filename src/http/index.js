import axios from "axios";

//export const API_URL = "http://localhost:8000";
export const API_URL = "http://79.174.12.190:8000";

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
                var url = originalConfig.url;

                if (url.slice(url.length - "refresh".length) === "refresh")
                    return error.response;

                originalConfig._retry = true;
                var rs;
                if (localStorage.getItem("whoAuth") === "admin") {
                    rs = await api.get("/admin/auth/refresh");
                } else if (localStorage.getItem("whoAuth") === "master") {
                    rs = await api.get("/master/refresh");
                }

                const accessToken = rs.data.access_token;
                localStorage.removeItem("token");
                localStorage.setItem("token", accessToken);

                return api(originalConfig);
            }

            return error.response
        }
    }
)


export default api;
