import api from "../http";


export default class AuthService {
    static async login(username, password) {
        return api.post("/master/auth", {password, username}, { 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

    static async logout() {
        await api.get("/master/logout")
        localStorage.removeItem('whoAuth');
        localStorage.removeItem('token');
    }
}