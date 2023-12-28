import api from "../http";


export default class AuthService {
    static async login(username, password) {
        return api.post("/admin/auth", {password, username}, { 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

    static async logout() {
        await api.get("/admin/logout")
        localStorage.removeItem('whoAuth');
        localStorage.removeItem('token');
    }

    // static async refresh() {
    //     const response = await api.get("/admin/refresh");
    //     console.log(response.data);
    //     access_token = response.data["access_token"];
    //     console.log(access_token);

    //     localStorage.removeItem("token");
    //     localStorage.setItem("token", access_token);
    // }
}
